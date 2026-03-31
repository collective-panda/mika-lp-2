const fs = require('fs');
const filePath = '/home/hiramekiya/clawd/collective-panda/mika-lp-2/index.html';
let html = fs.readFileSync(filePath, 'utf8');

const newH1 = `            <h1 class="font-black mt-8 mb-10 text-gray-900 tracking-tight leading-snug">
                <span class="block text-2xl md:text-4xl lg:text-5xl mb-3 drop-shadow-sm">おウチにいながら</span>
                <span class="block text-3xl md:text-5xl lg:text-6xl mb-4 drop-shadow-sm"><span class="emphasis-yellow px-1 md:px-2">アフィリエイト</span>で</span>
                <span class="block text-4xl md:text-6xl lg:text-7xl text-rose-600 drop-shadow-lg mb-6 leading-tight">収入と自由<span class="text-2xl md:text-4xl lg:text-5xl text-gray-900 drop-shadow-sm ml-1">を</span></span>
                <span class="block text-2xl md:text-4xl lg:text-5xl drop-shadow-sm">手にしてみませんか？</span>
            </h1>`;

html = html.replace(/<h1 class="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mt-6 mb-6 text-gray-800 drop-shadow-sm">[\s\S]*?<\/h1>/, newH1);

fs.writeFileSync(filePath, html);
console.log("Replaced H1 successfully.");
