const fs = require('fs');

const indexPath = '/home/hiramekiya/clawd/collective-panda/mika-lp-2/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

// 特商法のセクションをマネー占いの下に移動し、表示を修正
const tokuSection = `
    <!-- 特商法画像貼り付け -->
    <section class="py-16 px-4 bg-[#FCF9F2] text-center border-t border-[#EADCCB]">
        <div class="max-w-2xl mx-auto">
            <img src="assets/tokushoho_inline.png" alt="特定商取引法に基づく表記" class="w-full h-auto shadow-md rounded-lg">
        </div>
    </section>
`;

// もし既存の特商法セクションがあれば削除
html = html.replace(/<!-- 特商法画像貼り付け -->[\s\S]*?<\/section>/, '');

// マネー占いセクションの直後に挿入
const moneyGameEnd = '<!-- フッター -->';
html = html.replace(moneyGameEnd, tokuSection + '\n    ' + moneyGameEnd);

// まめさん（講師3）の画像を object-contain 等で調整
html = html.replace(
    /<img src="assets\/講師3\.jpg" alt="まめ" class="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-md">/,
    '<img src="assets/講師3.jpg" alt="まめ" class="w-32 h-32 rounded-full mx-auto mb-4 object-cover object-[center_top] border-4 border-white shadow-md">'
);

// リアンさん（講師5）の画像を object-contain 等で調整
html = html.replace(
    /<img src="assets\/講師5-2\.jpg" alt="リアン" class="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-md">/,
    '<img src="assets/講師5-2.jpg" alt="リアン" class="w-32 h-32 rounded-full mx-auto mb-4 object-cover object-[center_top] border-4 border-white shadow-md">'
);

fs.writeFileSync(indexPath, html);
console.log('Fixed missing tokushoho section and adjusted instructor photos.');
