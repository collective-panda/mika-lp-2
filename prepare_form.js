const fs = require('fs');
const filePath = '/home/hiramekiya/clawd/collective-panda/mika-lp-2/form.html';
let formHtml = fs.readFileSync(filePath, 'utf8');

// name属性の追加
formHtml = formHtml.replace('placeholder="山田 花子"', 'name="name" placeholder="山田 花子"');
formHtml = formHtml.replace('placeholder="example@email.com"', 'name="email" placeholder="example@email.com"');

// JSの入れ替え
const oldJsRegex = /<script>[\s\S]*?<\/script>/;
const newJs = `
    <script>
        document.getElementById('applyForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = e.target.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '送信中...';
            submitBtn.disabled = true;

            const formData = new FormData(e.target);
            
            // ⚠️ここに後でGASのURLを入れます
            const GAS_URL = 'YOUR_GAS_URL_HERE'; 

            if (GAS_URL === 'YOUR_GAS_URL_HERE') {
                alert('【テスト送信】\\n※まだ裏側の設定が終わっていません！\\n設定が完了すると、美香ちゃんのメールアドレスに直接通知が飛びます🚀');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                return;
            }

            fetch(GAS_URL, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if(data.result === 'success'){
                    alert('【送信完了】\\nお申し込みありがとうございます！\\n担当者より折り返しご連絡いたします。');
                    window.location.href = 'index.html'; // トップに戻る
                } else {
                    alert('エラーが発生しました。');
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            })
            .catch(error => {
                alert('通信エラーが発生しました。');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
    </script>
`;
formHtml = formHtml.replace(oldJsRegex, newJs);

fs.writeFileSync(filePath, formHtml);
console.log('form.html is ready for GAS integration.');
