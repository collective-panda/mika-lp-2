const fs = require('fs');
const indexPath = '/home/hiramekiya/clawd/collective-panda/mika-lp-2/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

// 1. ボタンを削除
html = html.replace(/<a href="#products" class="btn-elegant px-12 py-5 rounded-sm text-lg md:text-xl font-serif tracking-widest inline-block w-full md:w-auto">\s*講座の詳細を見る\s*<\/a>/, '');

// 2. テキストが見やすくなるように、白いグロー効果（text-shadow）とふんわりした背景（radial-gradient）を追加
const oldHeroContent = `
        <div class="relative z-10 w-full max-w-4xl mt-12 px-6 flex flex-col items-center">
            <p class="font-serif text-navy text-lg md:text-xl mb-4 tracking-widest">手厚く丁寧に</p>
            <h1 class="font-serif text-3xl md:text-5xl lg:text-6xl text-navy mb-8 leading-[1.4] font-medium">
                AI×インスタで収益化<br>
                商品づくりから販売まで<br>
                徹底サポート講座
            </h1>
            <p class="text-sm md:text-base text-gray-600 mb-12 tracking-widest elegant-underline inline-block">
                初心者でも「わからない」をそのままにしない
            </p>
            
        </div>
`;

const newHeroContent = `
        <div class="relative z-10 w-full max-w-4xl mt-12 px-6 py-12 flex flex-col items-center" style="background: radial-gradient(circle at center, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.5) 40%, rgba(255,255,255,0) 70%);">
            <p class="font-serif text-navy text-lg md:text-xl mb-4 tracking-widest" style="text-shadow: 0 0 10px #fff, 0 0 20px #fff;">手厚く丁寧に</p>
            <h1 class="font-serif text-3xl md:text-5xl lg:text-6xl text-navy mb-8 leading-[1.4] font-medium" style="text-shadow: 0 0 15px #fff, 0 0 30px #fff, 0 0 45px #fff;">
                AI×インスタで収益化<br>
                商品づくりから販売まで<br>
                徹底サポート講座
            </h1>
            <p class="text-base md:text-lg font-bold text-gray-800 mb-6 tracking-widest elegant-underline inline-block" style="text-shadow: 0 0 10px #fff, 0 0 20px #fff;">
                〜初心者でも「わからない」をそのままにしない〜
            </p>
        </div>
`;

// 正規表現で安全に置換
html = html.replace(/<div class="relative z-10 w-full max-w-4xl mt-12 px-6 flex flex-col items-center">[\s\S]*?<\/div>/, newHeroContent);

// 古いパターン（ボタンがまだある場合）の置換
html = html.replace(/<a href="#products" class="btn-elegant px-12 py-5 rounded-sm text-lg md:text-xl font-serif tracking-widest inline-block w-full md:w-auto">\s*講座の詳細を見る\s*<\/a>/, '');

fs.writeFileSync(indexPath, html);
console.log('Hero section updated with text-shadow (glow), radial white background, and button removed.');
