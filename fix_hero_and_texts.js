const fs = require('fs');
const indexPath = '/home/hiramekiya/clawd/collective-panda/mika-lp-2/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

// 1. ヒーロー背景動画のフィルター・白もや（オーバーレイ）を外す
// videoのfilterを削除
html = html.replace(/filter: saturate\(0\.8\) contrast\(0\.9\);/g, '');
// hero-overlayの不透明度を大幅に下げ、ぼかし(blur)を消す
html = html.replace(/background: rgba\(249, 248, 246, 0\.85\); backdrop-filter: blur\(4px\);/g, 'background: rgba(0, 0, 0, 0.15);');

// 2. 講師（ちままラボ）のテキスト変更
html = html.replace(/<span>納品実績1000枚以上<\/span>/g, '<span>広告納品実績1000枚以上</span>');

// 3. 特典見出しの変更
html = html.replace(/受講生限定 5つの特別なご案内/g, '５つの特別なプレゼントをご案内');

// 4. プランAのテキスト変更
html = html.replace(/8つのAIアプリ<br>入門講座/g, '８つのAI アプリ<br>入門講座(単品)');

fs.writeFileSync(indexPath, html);
console.log('Hero video made clear, and all requested texts updated.');
