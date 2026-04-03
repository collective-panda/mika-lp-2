const fs = require('fs');
const indexPath = '/home/hiramekiya/clawd/collective-panda/mika-lp-2/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

// 1. 講師セクションのスマホ1列化とサイズ復元
html = html.replace(/<div class="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-10">/, '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">');
html = html.replace(/p-4 md:p-8/g, 'p-8');
html = html.replace(/w-16 h-16 md:w-28 md:h-28/g, 'w-28 h-28');
html = html.replace(/text-lg md:text-xl font-serif text-navy/g, 'text-xl font-serif text-navy');
html = html.replace(/text-xs md:text-sm font-sans/g, 'text-sm font-sans');

// 2. プランBの価格の色を修正 (text-gray-400 が !important で #333333 になっているため見えない問題)
html = html.replace(/<p class="text-xs text-gray-400 mt-1">39,800円相当<\/p>/g, '<p class="text-sm text-[#E5E0D8] mt-1 opacity-90">39,800円相当</p>');
html = html.replace(/<p class="text-xs text-gray-400 mt-1">6,000円相当<\/p>/g, '<p class="text-sm text-[#E5E0D8] mt-1 opacity-90">6,000円相当</p>');

fs.writeFileSync(indexPath, html);
console.log('Instructor layout reverted to 1 col on mobile, and Plan B price colors fixed.');
