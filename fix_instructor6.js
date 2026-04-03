const fs = require('fs');
const indexPath = '/home/hiramekiya/clawd/collective-panda/mika-lp-2/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

const oldText = '講座中のお悩みやお話をお伺いするバックアップ担当。スマートフォンの基本操作についても優しくサポートいたします。';
const newText = '講座中のお悩みやお話をお伺いするバックアップ担当。優しくサポートいたします。';

html = html.replace(oldText, newText);

fs.writeFileSync(indexPath, html);
console.log('Instructor 6 profile updated.');
