const fs = require('fs');
const filePath = '/home/hiramekiya/clawd/collective-panda/mika-lp-2/index.html';
let html = fs.readFileSync(filePath, 'utf8');

// 1. ヒーローセクション（タイトル画像の差し替え＆背景動画を生かす）
const heroRegex = /<div class="bg-white\/90 backdrop-blur-sm p-6 md:p-12 rounded-3xl shadow-2xl max-w-4xl w-full border-4 border-pink-300 relative z-10 mt-10">[\s\S]*?<\/div>/;
const newHero = `
        <div class="relative z-10 w-full max-w-3xl mt-10 px-4 flex flex-col items-center">
            <!-- テキストではなく画像としてタイトルを表示 -->
            <img src="assets/new_hero_title.png" alt="AI×インスタで収益化" class="w-full h-auto drop-shadow-2xl mb-10 transform hover:scale-105 transition-transform duration-500">
            
            <a href="#products" class="bg-gradient-to-b from-rose-500 to-rose-700 text-white px-10 py-6 rounded-full text-2xl md:text-3xl font-black shadow-strong btn-pulse inline-block w-full md:w-3/4 border-b-4 border-rose-900 drop-shadow-xl tracking-widest text-center">
                今すぐお得な講座をチェック 👇
            </a>
        </div>
`;
html = html.replace(heroRegex, newHero);

// 2. 講師1の修正
html = html.replace(
    /<h4 class="text-2xl font-black text-gray-800 mb-4 border-b-2 border-pink-200 pb-2">美香<\/h4>\s*<p class="text-sm text-gray-600 font-bold leading-relaxed text-left">お金のアドバイスならお任せ！おウチにいながら収入を増やすためのマインドとノウハウを丁寧にお伝えします。<\/p>/,
    '<h4 class="text-2xl font-black text-gray-800 mb-4 border-b-2 border-pink-200 pb-2">美香</h4>\n                    <p class="text-sm text-gray-600 font-bold leading-relaxed text-left">スマホひとつで収益化が叶う未来を日々お伝えしています</p>'
);

// 3. 講師5の修正（写真と文章）
html = html.replace(
    /<img src="assets\/講師5.jpg" alt="リアン" class="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-md">\s*<h3 class="text-xl font-black text-rose-600 mb-1">マインド担当<\/h3>\s*<h4 class="text-2xl font-black text-gray-800 mb-4 border-b-2 border-pink-200 pb-2">リアン<\/h4>\s*<p class="text-sm text-gray-600 font-bold leading-relaxed text-left">お金に対するマインドブロックを外し、成果を出すための「マインドセット講座」を担当します。<\/p>/,
    '<img src="assets/講師5-2.jpg" alt="リアン" class="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-md">\n                    <h3 class="text-xl font-black text-rose-600 mb-1">マインド担当</h3>\n                    <h4 class="text-2xl font-black text-gray-800 mb-4 border-b-2 border-pink-200 pb-2">リアン</h4>\n                    <p class="text-sm text-gray-600 font-bold leading-relaxed text-left">ヒーリングコンサル歴200名以上。<br>お金に対するマインドブロックを外し、成果を出すための「マインド講座」を担当します。</p>'
);

// 4. 特典③の修正
html = html.replace(
    /<p class="text-2xl font-black text-red-600 mb-1">販売導線LP・お申し込みツール制作 <span class="text-4xl">80%OFF!<\/span><\/p>\s*<p class="font-bold text-gray-600">すぐに売上を立てるための「最強の武器（LP）」を破格で提供！<\/p>/,
    '<p class="text-2xl md:text-3xl font-black text-red-600 mb-2 leading-tight">すぐに売上げに繋げられる導線<br>「最強の武器」(ＬＰランディングページ)を<br>破格で御提供！</p>\n                            <p class="font-bold text-gray-600 text-lg">販売導線LP・お申し込みツール制作 <span class="text-red-600 font-black text-2xl">80%OFF!</span></p>'
);

// 5. プランAの画像が見切れないように修正 (object-cover -> object-contain)
html = html.replace(
    /<div class="my-6 w-full h-40 overflow-hidden rounded-xl">\s*<img src="assets\/plan_a.jpg" alt="Aコース" class="w-full h-full object-cover">\s*<\/div>/,
    '<div class="my-6 w-full h-auto overflow-hidden rounded-xl">\n                        <img src="assets/plan_a.jpg" alt="Aコース" class="w-full h-auto object-contain">\n                    </div>'
);

fs.writeFileSync(filePath, html);
console.log("HTML successfully updated.");
