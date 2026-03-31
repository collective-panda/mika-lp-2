const fs = require('fs');

const indexPath = '/home/hiramekiya/clawd/collective-panda/mika-lp-2/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

// もし中途半端な特商法セクションがあれば削除
html = html.replace(/<!-- 特商法画像貼り付け -->[\s\S]*?<\/section>/g, '');

const tokuSection = `
    <!-- 特商法画像貼り付け -->
    <section class="py-16 px-4 bg-[#FCF9F2] text-center border-t border-[#EADCCB]">
        <div class="max-w-2xl mx-auto">
            <img src="assets/tokushoho_inline.png" alt="特定商取引法に基づく表記" class="w-full h-auto shadow-md rounded-lg">
        </div>
    </section>
`;

// 正確なコメントをターゲットにする
html = html.replace(/<!-- フッター・特商法 -->/, tokuSection + '\n    <!-- フッター・特商法 -->');

fs.writeFileSync(indexPath, html);
console.log('Tokushoho image absolutely injected.');
