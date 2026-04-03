const fs = require('fs');
const indexPath = '/home/hiramekiya/clawd/collective-panda/mika-lp-2/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

// 勝手に大きく・太く・色を変えたものを完全に元に戻し、ただ1行上にテキストを置くだけにする
const oldPlanA = /<div class="py-4 flex-grow w-full text-center">\s*<p class="text-sm font-bold text-\[#C49A9A\] mb-1">計８時間のzoom講義で<\/p>\s*<p class="font-serif text-3xl text-navy font-bold">39,800<span class="text-sm ml-1">円<\/span><\/p>\s*<\/div>/;

const revertedPlanA = `
                    <div class="py-4 flex-grow text-center w-full">
                        <p class="text-sm text-gray-500 font-bold mb-1">計８時間のzoom講義で</p>
                        <p class="font-serif text-2xl text-navy">39,800<span class="text-sm ml-1">円</span></p>
                    </div>
`;

html = html.replace(oldPlanA, revertedPlanA);

fs.writeFileSync(indexPath, html);
console.log('Plan A font format reverted to original.');
