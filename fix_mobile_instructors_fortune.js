const fs = require('fs');
const indexPath = '/home/hiramekiya/clawd/collective-panda/mika-lp-2/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

// 1. 講師紹介のスマホ2列化
// グリッドを grid-cols-2 に変更
html = html.replace(
    /<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">/,
    '<div class="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-10">'
);

// 講師カードの余白をスマホ用に調整（p-8 -> p-4 md:p-8）
html = html.replace(/bg-white p-8 text-center border border-\[#E5E0D8\] rounded-sm/g, 'bg-white p-4 md:p-8 text-center border border-[#E5E0D8] rounded-sm');

// 講師の画像をスマホ用に少し小さく（w-28 h-28 -> w-16 h-16 md:w-28 md:h-28）
html = html.replace(/w-28 h-28/g, 'w-16 h-16 md:w-28 md:h-28');

// スマホで文字が大きすぎないように調整
html = html.replace(/<h4 class="text-xl font-serif/g, '<h4 class="text-lg md:text-xl font-serif');
html = html.replace(/<h3 class="text-sm font-sans/g, '<h3 class="text-xs md:text-sm font-sans');


// 2. マネー占いをエレガントな形にして復活
const oldFortuneRegex = /<!-- メッセージ \(占い代替\) -->[\s\S]*?<\/section>/;
const newFortune = `<!-- マネー占い (Elegant) -->
    <section class="py-24 px-4 bg-[#F7F5F0] text-center border-t border-[#E5E0D8]">
        <h2 class="section-title font-serif text-navy">今日のマネー占い</h2>
        <p class="text-sm md:text-base text-gray-700 font-light mb-10">アフィリエイトを始める前の運試し。<br>下のカードをタップして、本日の金運とメッセージをお受け取りください。</p>
        
        <!-- エレガントなタロットカード風ボタン -->
        <button onclick="playFortune()" class="w-24 h-36 md:w-32 md:h-48 mx-auto bg-white border border-[#E5E0D8] rounded shadow-sm hover:shadow-md hover:-translate-y-2 transition-all flex items-center justify-center relative group">
            <div class="absolute inset-1.5 md:inset-2 border border-[#E5E0D8] flex items-center justify-center">
                <span class="text-[#C49A9A] text-3xl md:text-4xl font-serif group-hover:scale-110 transition-transform">✧</span>
            </div>
        </button>
        
        <div id="fortuneResult" class="mt-10 text-base md:text-lg font-serif text-navy min-h-[60px] font-medium leading-loose transition-all duration-500 max-w-2xl mx-auto px-4"></div>
        
        <script>
            function playFortune() {
                const results = [
                    "【大吉】 素晴らしい金運の兆し。新しい学びが、大きな豊かさへと繋がる一日です。", 
                    "【中吉】 直感が冴え渡る時。思いついたアイデアが、将来の資産に変わるかもしれません。", 
                    "【小吉】 コツコツとした積み重ねが、やがて確かな成果を結びます。焦らず進みましょう。", 
                    "【大吉】 絶好のスタートダッシュ日和。本日の決断が、未来の自由への扉を開きます。",
                    "【吉】 周囲のサポートに恵まれる暗示。一人で悩まず、環境に頼ることで道が開けます。"
                ];
                const r = results[Math.floor(Math.random() * results.length)];
                const resultDiv = document.getElementById("fortuneResult");
                resultDiv.style.opacity = 0;
                resultDiv.innerText = "......";
                resultDiv.style.opacity = 1;
                setTimeout(() => {
                    resultDiv.innerText = r;
                }, 800);
            }
        </script>
    </section>`;

html = html.replace(oldFortuneRegex, newFortune);

fs.writeFileSync(indexPath, html);
console.log('Mobile instructors layout and elegant fortune section updated.');
