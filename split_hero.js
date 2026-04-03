const fs = require('fs');
const indexPath = '/home/hiramekiya/clawd/collective-panda/mika-lp-2/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

// 既存のヒーローセクションを新しい構造に置換
const oldHeroRegex = /<header class="relative min-h-\[90vh\] flex flex-col items-center justify-center text-center px-4 overflow-hidden">[\s\S]*?<\/header>/;

const newHero = `
    <!-- ヒーローセクション（タイトルと動画を分離） -->
    <header class="w-full bg-[#F9F8F6]">
        <!-- タイトルエリア -->
        <div class="w-full pt-20 pb-12 px-6 flex flex-col items-center text-center relative z-10">
            <p class="font-serif text-navy text-lg md:text-xl mb-4 tracking-widest">手厚く丁寧に</p>
            <h1 class="font-serif text-3xl md:text-5xl lg:text-6xl text-navy mb-8 leading-[1.4] font-medium">
                <span class="inline-block">AI×インスタで収益化</span><br>
                <span class="inline-block">商品づくりから販売まで</span><br>
                <span class="inline-block">徹底サポート講座</span>
            </h1>
            <p class="text-base md:text-lg font-bold text-gray-800 tracking-widest elegant-underline inline-block">
                〜初心者でも「わからない」をそのままにしない〜
            </p>
        </div>

        <!-- 動画エリア -->
        <div class="w-full relative overflow-hidden bg-black" style="height: 60vh; max-height: 800px;">
            <video id="bg-video" autoplay loop muted playsinline webkit-playsinline class="w-full h-full object-cover opacity-90">
                <source src="assets/hero_bg.mp4" type="video/mp4">
            </video>
        </div>
    </header>
`;

html = html.replace(oldHeroRegex, newHero);

fs.writeFileSync(indexPath, html);
console.log('Hero section successfully split into title and video.');
