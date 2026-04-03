const fs = require('fs');

const indexPath = '/home/hiramekiya/clawd/collective-panda/mika-lp-2/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

// 1. ビデオタグに webkit-playsinline と ID を追加
html = html.replace('<video autoplay loop muted playsinline>', '<video id="bg-video" autoplay loop muted playsinline webkit-playsinline>');

// 2. iOSの自動再生ブロック（特に省電力モード時）の対策用JSを追加
const jsInsert = `
            // iOS自動再生（省電力モード時など）の対策
            const bgVideo = document.getElementById('bg-video');
            if (bgVideo) {
                bgVideo.muted = true;
                bgVideo.play().catch(err => {
                    console.log("Autoplay blocked (likely iOS Low Power Mode).");
                    // 画面のどこかをタップしたら再生を開始させる
                    document.body.addEventListener('touchstart', () => {
                        bgVideo.play();
                    }, { once: true });
                });
            }

            // Fade up animation`;
html = html.replace('// Fade up animation', jsInsert);

// 3. スマホでの変な改行（AI×インスタで収益 / 化）を防ぐため、単語の塊ごとに inline-block 化
html = html.replace('AI×インスタで収益化<br>', '<span class="inline-block">AI×インスタで収益化</span><br>');
html = html.replace('商品づくりから販売まで<br>', '<span class="inline-block">商品づくりから販売まで</span><br>');
html = html.replace('徹底サポート講座', '<span class="inline-block">徹底サポート講座</span>');

fs.writeFileSync(indexPath, html);
console.log('Video iOS fixes and text wrapping fixes applied.');
