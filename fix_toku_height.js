const fs = require('fs');

const indexPath = '/home/hiramekiya/clawd/collective-panda/mika-lp-2/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

// 1. 特商法の表示不具合の修正
// 現在、<!-- フッター --> の直前に挿入する処理が二重化・不発になっている可能性があるため、強制的にフッター前に挿入し直す。
// 一旦既存の特商法セクションを削除
html = html.replace(/<!-- 特商法画像貼り付け -->[\s\S]*?<\/section>/g, '');

const tokuSection = `
    <!-- 特商法画像貼り付け -->
    <section class="py-16 px-4 bg-[#FCF9F2] text-center border-t border-[#EADCCB]">
        <div class="max-w-2xl mx-auto">
            <img src="assets/tokushoho_inline.png" alt="特定商取引法に基づく表記" class="w-full h-auto shadow-md rounded-lg">
        </div>
    </section>
`;

html = html.replace(/<!-- フッター -->/, tokuSection + '\n    <!-- フッター -->');


// 2. PC時の商品プランカードの高さを揃える（h-full を追加）
// プランA
html = html.replace(
    /<div class="bg-white rounded-3xl p-8 shadow-xl flex flex-col items-center text-center border-t-8 border-gray-300 transform md:scale-95">/g,
    '<div class="bg-white rounded-3xl p-8 shadow-xl flex flex-col items-center text-center border-t-8 border-gray-300 transform md:scale-95 h-full">'
);

// プランB
html = html.replace(
    /<div class="bg-white rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center border-4 border-orange-400 relative z-10">/g,
    '<div class="bg-white rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center border-4 border-orange-400 relative z-10 h-full">'
);

// プランC
html = html.replace(
    /<div class="bg-gradient-to-b from-gray-800 to-black rounded-3xl p-8 shadow-xl flex flex-col items-center text-center border-t-8 border-yellow-400 text-white transform md:scale-95 relative">/g,
    '<div class="bg-gradient-to-b from-gray-800 to-black rounded-3xl p-8 shadow-xl flex flex-col items-center text-center border-t-8 border-yellow-400 text-white transform md:scale-95 relative h-full">'
);


fs.writeFileSync(indexPath, html);
console.log('Fixed tokushoho missing and plan card height.');
