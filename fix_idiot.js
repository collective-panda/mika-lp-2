const fs = require('fs');

// --- 1. index.html の修正 ---
const indexPath = '/home/hiramekiya/clawd/collective-panda/mika-lp-2/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

const oldHero = /<img src="assets\/new_hero_title\.png"[\s\S]*?duration-500">/;
const newHeroText = `
            <div class="text-center mb-10 drop-shadow-2xl">
                <p class="text-3xl md:text-5xl font-black text-white mb-4 tracking-wider drop-shadow-lg">AI×インスタで収益化</p>
                <p class="text-2xl md:text-4xl font-bold text-yellow-400 mb-4 tracking-widest drop-shadow-md">“手厚く丁寧に”</p>
                <h1 class="text-4xl md:text-6xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
                    商品づくりから販売まで<br>
                    徹底サポート講座
                </h1>
                <p class="text-lg md:text-xl font-bold text-white bg-rose-600/80 inline-block px-6 py-2 rounded-full border border-rose-400">
                    〜初心者でも「わからない」をそのままにしない〜
                </p>
            </div>
`;
html = html.replace(oldHero, newHeroText);

// 特商法のリンクを tokushoho.html に戻す
html = html.replace(/href="https:\/\/mikamika\.my\.canva\.site\/dag-9zhzzv8"[^>]*>特定商取引法に基づく表記<\/a>/, 'href="tokushoho.html" class="hover:text-white transition underline">特定商取引法に基づく表記</a>');
html = html.replace(/href="https:\/\/mikamika\.my\.canva\.site\/dag-9zhzzv8"[^>]*>\s*👉 【特定商取引法に基づく表記】を見る（別画面で開きます）\s*<\/a>/, 'href="tokushoho.html" target="_blank" class="inline-flex items-center text-yellow-700 font-bold underline mb-6 hover:text-yellow-800 transition">\n                    👉 【特定商取引法に基づく表記】を見る（別画面で開きます）\n                </a>');

fs.writeFileSync(indexPath, html);


// --- 2. tokushoho.html の修正 ---
const tokuHtml = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>特定商取引法に基づく表記</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 py-10 px-4">
    <div class="max-w-3xl mx-auto bg-white p-4 md:p-8 rounded-xl shadow-lg text-center">
        <h1 class="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">特定商取引法に基づく表記</h1>
        <img src="assets/tokushoho.png" alt="特定商取引法に基づく表記" class="w-full h-auto rounded border border-gray-200">
        <div class="mt-8">
            <a href="index.html" class="text-rose-500 font-bold hover:underline">← LPに戻る</a>
        </div>
    </div>
</body>
</html>`;
fs.writeFileSync('/home/hiramekiya/clawd/collective-panda/mika-lp-2/tokushoho.html', tokuHtml);

