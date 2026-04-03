const fs = require('fs');
const indexPath = '/home/hiramekiya/clawd/collective-panda/mika-lp-2/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

// Plan Aの価格表示部分の書き換え
const oldPlanA = /<div class="py-4 flex-grow">\s*<p class="font-serif text-2xl text-navy">39,800<span class="text-sm ml-1">円<\/span><\/p>\s*<\/div>/;
const newPlanA = `
                    <div class="py-4 flex-grow w-full text-center">
                        <p class="text-sm font-bold text-[#C49A9A] mb-1">計８時間のzoom講義で</p>
                        <p class="font-serif text-3xl text-navy font-bold">39,800<span class="text-sm ml-1">円</span></p>
                    </div>
`;

html = html.replace(oldPlanA, newPlanA);
fs.writeFileSync(indexPath, html);
console.log('Plan A details added.');
