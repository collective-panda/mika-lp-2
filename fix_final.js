const fs = require('fs');

// index.html の読み込み
let html = fs.readFileSync('/home/hiramekiya/clawd/collective-panda/mika-lp-2/index.html', 'utf8');

// 1. スマホ改行問題の修正
html = html.replace(/<li class="flex items-center">/g, '<li class="flex items-start">');
html = html.replace(/<span class="text-rose-500 text-3xl mr-4">☑️<\/span>/g, '<div class="bg-[#8E7CC3] text-white rounded w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1 md:mt-1.5 mr-3 text-sm">✓</div>');
html = html.replace(/ 一人じゃ不安/g, '<span class="flex-1 leading-snug">一人じゃ不安');
html = html.replace(/ 自己流で結果/g, '<span class="flex-1 leading-snug">自己流で結果');
html = html.replace(/ これで合ってるか/g, '<span class="flex-1 leading-snug">これで合ってるか');
html = html.replace(/ 難しいのは/g, '<span class="flex-1 leading-snug">難しいのは');
html = html.replace(/ 相談しながら/g, '<span class="flex-1 leading-snug">相談しながら');
html = html.replace(/ Instagram収益化の/g, '<span class="flex-1 leading-snug">Instagram収益化の');
html = html.replace(/ もう<span class="emphasis-red mx-1">「わからない」<\/span>で止まりたくない！/g, '<span class="flex-1 leading-snug">もう<span class="text-rose-600 mx-1">「わからない」</span>で止まりたくない！</span>');
// <span class="flex-1">の閉じ忘れを補填
html = html.replace(/頼りたい<\/li>/g, '頼りたい</span></li>');
html = html.replace(/出なかった<\/li>/g, '出なかった</span></li>');
html = html.replace(/不安<\/li>/g, '不安</span></li>');
html = html.replace(/稼ぎたい！<\/span><\/li>/g, '稼ぎたい！</span></span></li>');
html = html.replace(/進めたい<\/li>/g, '進めたい</span></li>');
html = html.replace(/わからない<\/li>/g, 'わからない</span></li>');

// 2. 学べる内容の変更
const oldContentList = /<ul class="space-y-4 text-gray-800 font-bold text-lg">[\s\S]*?<\/ul>/;
const newContentList = `
                    <ul class="space-y-4 text-gray-800 font-bold text-base md:text-lg">
                        <li class="flex items-start"><span class="text-orange-400 text-xl mr-2">✔</span> <span class="flex-1 leading-snug">アフィリエイトの仕組みと稼ぎ方</span></li>
                        <li class="flex items-start"><span class="text-orange-400 text-xl mr-2">✔</span> <span class="flex-1 leading-snug">収益につながるアフィリエイトの案件の取得方法</span></li>
                        <li class="flex items-start"><span class="text-orange-400 text-xl mr-2">✔</span> <span class="flex-1 leading-snug">AIを使った「売れる商品づくり」のステップ</span></li>
                        <li class="flex items-start"><span class="text-orange-400 text-xl mr-2">✔</span> <span class="flex-1 leading-snug">おウチでできる商品づくりとコンセプト設計</span></li>
                        <li class="flex items-start"><span class="text-orange-400 text-xl mr-2">✔</span> <span class="flex-1 leading-snug">インスタで売れるための導線づくり（投稿〜販売まで）</span></li>
                        <li class="flex items-start"><span class="text-orange-400 text-xl mr-2">✔</span> <span class="flex-1 leading-snug">Instagram×AIの基本操作と実践的な活用方法</span></li>
                        <li class="flex items-start"><span class="text-orange-400 text-xl mr-2">✔</span> <span class="flex-1 leading-snug">初心者でも理解できるやさしいステップと学び</span></li>
                        <li class="flex items-start"><span class="text-orange-400 text-xl mr-2">✔</span> <span class="flex-1 leading-snug">仲間と一緒に進める作業会＆手厚いサポート環境</span></li>
                        <li class="flex items-start"><span class="text-orange-400 text-xl mr-2">✔</span> <span class="flex-1 leading-snug">わからないをそのままにしない個別サポート</span></li>
                        <li class="flex items-start"><span class="text-orange-400 text-xl mr-2">✔</span> <span class="flex-1 leading-snug">実際に販売まで進める実践サポート<br><span class="text-sm font-medium text-gray-500">（オンラインマルシェ出店サポート付き）</span></span></li>
                        <li class="flex items-start"><span class="text-orange-400 text-xl mr-2">✔</span> <span class="flex-1 leading-snug">充実の５大特典</span></li>
                    </ul>
                    <div class="mt-8 bg-orange-50 p-6 rounded-xl text-center border-2 border-orange-200">
                        <p class="text-xl font-black text-orange-600 mb-2">👉「学ぶだけで終わらない<br>“実際に売るところまで”サポート」</p>
                        <p class="text-lg font-bold text-gray-700">📱スマホだけでも出来る内容ばかり</p>
                    </div>
`;
html = html.replace(oldContentList, newContentList);

// 3. 全体の色味を明るめベージュ＆薄いオレンジに変更
// 背景と境界線
html = html.replace(/bg-white\/90/g, 'bg-[#FCF9F2]/95');
html = html.replace(/bg-pink-50/g, 'bg-[#FAF0E6]');
html = html.replace(/bg-rose-50/g, 'bg-[#FAF0E6]');
html = html.replace(/bg-gray-900/g, 'bg-[#FAEDE5]');
html = html.replace(/border-pink-100/g, 'border-orange-100');
html = html.replace(/border-pink-200/g, 'border-[#EADCCB]');
html = html.replace(/border-rose-200/g, 'border-[#EADCCB]');
html = html.replace(/border-rose-400/g, 'border-[#EADCCB]');
html = html.replace(/border-rose-500/g, 'border-[#D98A59]');
// ボタンとグラデーション（薄いオレンジ）
html = html.replace(/from-rose-500 to-rose-700/g, 'from-[#F3B38A] to-[#E39363]');
html = html.replace(/from-rose-400 to-rose-600/g, 'from-[#F3B38A] to-[#E39363]');
html = html.replace(/from-rose-500 to-red-600/g, 'from-[#F3B38A] to-[#E39363]');
html = html.replace(/from-purple-500 via-pink-500 to-orange-400/g, 'from-[#E39363] via-[#F3B38A] to-[#EADCCB]');
// テキストカラー
html = html.replace(/text-rose-600/g, 'text-[#C07049]');
html = html.replace(/text-rose-500/g, 'text-[#D98A59]');
html = html.replace(/text-pink-600/g, 'text-[#D98A59]');

// 4. 特商法のインライン画像化
const tokushohoSection = `
    <!-- 特商法画像貼り付け -->
    <section class="py-16 px-4 bg-[#FCF9F2] text-center border-t border-[#EADCCB]">
        <div class="max-w-2xl mx-auto">
            <img src="assets/tokushoho_inline.png" alt="特定商取引法に基づく表記" class="w-full h-auto shadow-md rounded-lg">
        </div>
    </section>
`;
// フッター直前に挿入（占いセクションの後ろ）
html = html.replace(/<!-- フッター -->/, tokushohoSection + '\n    <!-- フッター -->');
// フッター内の特商法リンクを削除
html = html.replace(/<a href="tokushoho.html" class="hover:text-white transition underline">特定商取引法に基づく表記<\/a>/, '');

fs.writeFileSync('/home/hiramekiya/clawd/collective-panda/mika-lp-2/index.html', html);
console.log("Revisions applied successfully to LP.");

// form.html も色味だけ合わせる
let formHtml = fs.readFileSync('/home/hiramekiya/clawd/collective-panda/mika-lp-2/form.html', 'utf8');
formHtml = formHtml.replace(/bg-pink-50/g, 'bg-[#FAF0E6]');
formHtml = formHtml.replace(/text-pink-600/g, 'text-[#C07049]');
formHtml = formHtml.replace(/text-pink-700/g, 'text-[#C07049]');
formHtml = formHtml.replace(/text-pink-500/g, 'text-[#D98A59]');
formHtml = formHtml.replace(/from-pink-400 to-\[#d9777f\]/g, 'from-[#F3B38A] to-[#E39363]');
fs.writeFileSync('/home/hiramekiya/clawd/collective-panda/mika-lp-2/form.html', formHtml);

