const fs = require('fs');

const indexPath = '/home/hiramekiya/clawd/collective-panda/mika-lp-2/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

// 1. formのactionとmethodを削除・変更し、idを追加
html = html.replace(/<form action="form.html" method="GET" class="space-y-6">/, '<form id="applyFormInLP" class="space-y-6">');

// 2. inputタグ等にname属性が漏れていたら付与
html = html.replace(/<input type="text" required class="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-rose-400 outline-none text-lg bg-white" placeholder="山田 花子">/g, '<input type="text" name="name" required class="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-rose-400 outline-none text-lg bg-white" placeholder="山田 花子">');
html = html.replace(/<input type="email" required class="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-rose-400 outline-none text-lg bg-white" placeholder="example@email.com">/g, '<input type="email" name="email" required class="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-rose-400 outline-none text-lg bg-white" placeholder="example@email.com">');

// 表示用の選択プラン部分のIDや変数を整理し、hidden要素で実際に送信する箱を作る
const hiddenInputs = `
                <!-- JSで動的に値を入れる隠しフィールド -->
                <input type="hidden" name="course" id="hidden-course" value="B">
                <input type="hidden" name="option_c" id="hidden-option-c" value="">
`;
html = html.replace(/<div class="bg-white p-4 rounded-xl border-2 border-rose-100 mb-8">/, hiddenInputs + '\n                <div class="bg-white p-4 rounded-xl border-2 border-rose-100 mb-8">');

// 3. スクリプトの書き換え（GASへの直接送信）
const oldScriptRegex = /<script>[\s\S]*?<\/body>/;
const newScript = `
    <!-- JS連携 -->
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            // スクロールアニメーション
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.fade-up').forEach(el => {
                observer.observe(el);
            });

            // ヒーロースライドショー
            const slides = document.querySelectorAll('.hero-slide');
            if(slides.length > 0) {
                let current = 0;
                setInterval(() => {
                    slides[current].classList.remove('active');
                    current = (current + 1) % slides.length;
                    slides[current].classList.add('active');
                }, 5000);
            }

            // プラン選択と表示の連動
            const radios = document.querySelectorAll('.course-radio');
            const optionC = document.getElementById('option_c');
            const display = document.getElementById('selected-plan-display');
            const hiddenCourse = document.getElementById('hidden-course');
            const hiddenOptionC = document.getElementById('hidden-option-c');

            function updateDisplay() {
                let selectedRadio = document.querySelector('.course-radio:checked');
                if(!selectedRadio) return;
                
                let val = selectedRadio.value;
                let text = val === 'A' ? 'プラン A（AIアプリ講座）' : 'プラン B（本講座）';
                
                hiddenCourse.value = val;
                
                if(optionC && optionC.checked) {
                    text += ' ＋ プラン C（販売導線お任せ）';
                    hiddenOptionC.value = 'C';
                } else {
                    if(hiddenOptionC) hiddenOptionC.value = '';
                }
                if(display) display.innerText = text;
            }

            if(radios) radios.forEach(r => r.addEventListener('change', updateDisplay));
            if(optionC) optionC.addEventListener('change', updateDisplay);
            updateDisplay();

            // LP内のフォーム送信処理 (GAS連携)
            const form = document.getElementById('applyFormInLP');
            if(form) {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const submitBtn = e.target.querySelector('button[type="submit"]');
                    const originalText = submitBtn.innerHTML;
                    submitBtn.innerHTML = '送信中...';
                    submitBtn.disabled = true;

                    const formData = new FormData(e.target);
                    const GAS_URL = 'https://script.google.com/macros/s/AKfycbz_f70YjzPPT9yxPwMFE_vIagMcNrHNOkyXmGE97hrn92fzjHPGhuHs0hi5WgZReXHc/exec';

                    fetch(GAS_URL, {
                        method: 'POST',
                        body: formData,
                        mode: 'no-cors'
                    })
                    .then(() => {
                        alert('【お申し込み完了】\\nありがとうございます！\\nご入力いただいたメールアドレス宛に、担当者より折り返しご連絡いたします。');
                        e.target.reset();
                        updateDisplay();
                    })
                    .catch(error => {
                        console.error(error);
                        alert('通信エラーが発生しました。時間を置いて再度お試しください。');
                    })
                    .finally(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    });
                });
            }
        });
    </script>
</body>
`;

html = html.replace(oldScriptRegex, newScript);
fs.writeFileSync(indexPath, html);
console.log('LP index.html form successfully upgraded to submit to GAS directly.');
