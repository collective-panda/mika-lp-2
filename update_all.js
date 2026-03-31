const fs = require('fs');

// --- 1. POCHI_ISSUE_TRACKER.md へのログ追記 ---
const trackerPath = '/home/hiramekiya/clawd/POCHI_ISSUE_TRACKER.md';
const logEntry = `
### 事例4：特商法リンク・タイトル画像の「文脈無視・深読みしすぎ」事故（2026-03-31）
*   **村上さんの指示:** 
    *   「タイトル⇒添付写真の文章に変更」
    *   「特商法の中身は添付画像にして」
*   **Pochiの行動:** 
    *   タイトル部分について、添付された画像の「文章をテキストとして打ち直す」のではなく、**「画像をそのまま \`<img>\` タグで貼り付ける」**という暴挙に出た。
    *   特商法について、元のHTMLページ内で画像を貼るのではなく、**「Canvaの別サイトへのリンクURLに変更する」**という指示されていない謎の改変を行った。
*   **技術的原因・思考の欠陥:**
    *   **「添付画像＝そのまま貼るもの」という固定観念:** 「文章に変更」と明記されているのに、処理をショートカット（手抜き）して画像をそのまま貼り付けた。文脈（コンテキスト）の完全な無視。
    *   **過去のチャットの過剰な引き継ぎ:** 過去のやり取りで出てきた「Canvaの特商法リンク」をAIが勝手に記憶・結びつけてしまい、「特商法ならこのリンクに変えればいいんだな」と勝手な気を利かせた（余計なお世話）。
*   **改善策（システム的縛り）:**
    *   【厳守ルール】**「画像内の文章に」と指示された場合は、必ずOCRまたは目視でテキスト化し、HTMLのテキストノードとして記述すること。絶対に画像を \`<img>\` で代用しない。**
    *   【厳守ルール】**リンク先や仕様の変更は「明示的に指示された場合のみ」行うこと。「気を利かせた仕様変更」は全てエラーの元になるため禁止する。**

### 事例5：スマホの改行・レイアウトの考慮漏れ（2026-03-31）
*   **村上さんの指示:** 「スマホで見るとチェックリストの改行が変になっている」
*   **Pochiの行動:** \`<li class="flex items-center">\` を多用し、テキストが2行になった場合のアイコン（チェックマーク）との位置関係（回り込み）を考慮せずにコーディングしていた。
*   **改善策:** リスト要素でアイコンを横に並べる際は、必ず \`align-items: flex-start;\` を使用し、テキスト側を \`flex-1\` で囲むなど、**「スマホで折り返した時にどう見えるか」をCSSの構造レベルで常に担保する**こと。

`;
fs.appendFileSync(trackerPath, logEntry);
console.log('POCHI_ISSUE_TRACKER.md updated.');

// --- 2. index.html の全面書き換え（色味・内容・スマホレイアウト対応） ---
const indexPath = '/home/hiramekiya/clawd/collective-panda/mika-lp-2/index.html';
const indexHtml = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>おウチにいながらアフィリエイトで収入と自由を手にしてみませんか</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Noto Sans JP', sans-serif; background-color: #FDF9F1; color: #5C4A3D; overflow-x: hidden; }
        
        .hero-video-wrapper { position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; z-index: -2; }
        .hero-video-wrapper video { min-w-full; min-h-full; object-fit: cover; width: 100vw; height: 100vh; }
        .hero-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(253, 249, 241, 0.7); z-index: -1; }

        .emphasis-yellow { background: linear-gradient(transparent 60%, #FDE047 60%); }
        .btn-pulse { animation: pulse 2s infinite; }
        @keyframes pulse {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(245, 152, 78, 0.7); }
            70% { transform: scale(1.05); box-shadow: 0 0 0 15px rgba(245, 152, 78, 0); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(245, 152, 78, 0); }
        }
        .ribbon {
            position: absolute; top: -15px; left: 50%; transform: translateX(-50%);
            background: #E11D48; color: white; padding: 5px 20px; font-weight: bold;
            border-radius: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); white-space: nowrap; z-index: 10;
        }
        .section-title { position: relative; display: inline-block; padding: 0 40px; font-size: 2rem; font-weight: 900; color: #C27D5C; text-align: center; }
        .section-title::before, .section-title::after { content: '✨'; position: absolute; top: 50%; transform: translateY(-50%); }
        .section-title::before { left: 0; }
        .section-title::after { right: 0; }
    </style>
</head>
<body class="antialiased">

    <!-- ヒーローセクション -->
    <header class="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div class="hero-video-wrapper">
            <video autoplay loop muted playsinline>
                <source src="assets/hero_bg.mp4" type="video/mp4">
            </video>
        </div>
        <div class="hero-overlay"></div>
        
        <div class="bg-white/90 backdrop-blur-sm p-6 md:p-12 rounded-3xl shadow-2xl max-w-4xl w-full border-4 border-orange-200 relative z-10 mt-10">
            <div class="text-center mb-10 drop-shadow-2xl">
                <p class="text-2xl md:text-4xl font-black text-gray-800 mb-4 tracking-wider drop-shadow-sm">AI×インスタで収益化</p>
                <p class="text-xl md:text-3xl font-bold text-orange-500 mb-4 tracking-widest drop-shadow-sm">“手厚く丁寧に”</p>
                <h1 class="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight drop-shadow-sm">
                    商品づくりから販売まで<br>
                    徹底サポート講座
                </h1>
                <p class="text-sm md:text-lg font-bold text-orange-800 bg-orange-100 inline-block px-6 py-2 rounded-full border border-orange-300">
                    〜初心者でも「わからない」をそのままにしない〜
                </p>
            </div>
            <a href="#products" class="bg-gradient-to-b from-orange-300 to-orange-400 text-white px-8 md:px-10 py-5 md:py-6 rounded-full text-xl md:text-2xl font-black shadow-lg btn-pulse inline-block w-full md:w-3/4 border-b-4 border-orange-500 drop-shadow-md">
                今すぐお得な講座をチェック 👇
            </a>
        </div>
    </header>

    <!-- こんな方にオススメ -->
    <section class="py-20 px-4 bg-[#FAEDE5] border-b-4 border-orange-100">
        <div class="max-w-4xl mx-auto">
            <div class="text-center mb-10"><h2 class="section-title">こんなお悩みありませんか？</h2></div>
            <div class="bg-white p-8 md:p-10 rounded-3xl shadow-xl border-2 border-orange-100 relative">
                <div class="absolute -top-5 -left-5 text-6xl">💦</div>
                
                <!-- スマホ対応：items-start と flex-1 で改行崩れを防ぐ -->
                <ul class="space-y-5 text-lg md:text-2xl font-bold text-[#5C4A3D]">
                    <li class="flex items-start">
                        <div class="bg-[#8E7CC3] text-white rounded w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1 md:mt-1.5 mr-3 text-sm">✓</div>
                        <span class="flex-1 leading-snug">一人じゃ不安、誰かに頼りたい</span>
                    </li>
                    <li class="flex items-start">
                        <div class="bg-[#8E7CC3] text-white rounded w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1 md:mt-1.5 mr-3 text-sm">✓</div>
                        <span class="flex-1 leading-snug">自己流で結果が出なかった</span>
                    </li>
                    <li class="flex items-start">
                        <div class="bg-[#8E7CC3] text-white rounded w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1 md:mt-1.5 mr-3 text-sm">✓</div>
                        <span class="flex-1 leading-snug">これで合ってるか不安</span>
                    </li>
                    <li class="flex items-start">
                        <div class="bg-[#8E7CC3] text-white rounded w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1 md:mt-1.5 mr-3 text-sm">✓</div>
                        <span class="flex-1 leading-snug">難しいのは苦手だけど<span class="text-[#E11D48] mx-1">稼ぎたい！</span></span>
                    </li>
                    <li class="flex items-start">
                        <div class="bg-[#8E7CC3] text-white rounded w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1 md:mt-1.5 mr-3 text-sm">✓</div>
                        <span class="flex-1 leading-snug">相談しながら安心して進めたい</span>
                    </li>
                    <li class="flex items-start">
                        <div class="bg-[#8E7CC3] text-white rounded w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1 md:mt-1.5 mr-3 text-sm">✓</div>
                        <span class="flex-1 leading-snug">Instagram収益化の導線がわからない</span>
                    </li>
                    <li class="flex items-start">
                        <div class="bg-[#8E7CC3] text-white rounded w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1 md:mt-1.5 mr-3 text-sm">✓</div>
                        <span class="flex-1 leading-snug">もう<span class="text-[#E11D48] mx-1">「わからない」</span>で止まりたくない！</span>
                    </li>
                </ul>
                <div class="mt-10 text-center bg-orange-50 py-4 rounded-xl border border-orange-200">
                    <p class="text-xl md:text-2xl font-black text-orange-600">そのお悩み、この講座で<br class="md:hidden">すべて解決します！🚀</p>
                </div>
            </div>
        </div>
    </section>

    <!-- 講師紹介 -->
    <section class="py-24 px-4 bg-white relative">
        <div class="max-w-6xl mx-auto">
            <div class="text-center mb-16"><h2 class="section-title">超豪華！強力な講師陣が徹底サポート</h2></div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- 講師1 -->
                <div class="bg-[#FAEDE5] rounded-2xl p-6 shadow-lg border-2 border-orange-100 text-center transform hover:-translate-y-2 transition duration-300">
                    <img src="assets/講師1.jpg" alt="美香" class="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-md">
                    <h3 class="text-xl font-black text-orange-600 mb-1">マネーアドバイザー</h3>
                    <h4 class="text-2xl font-black text-gray-800 mb-4 border-b-2 border-orange-200 pb-2">美香</h4>
                    <p class="text-sm text-gray-700 font-bold leading-relaxed text-left">スマホひとつで収益化が叶う未来を日々お伝えしています</p>
                </div>
                <!-- 講師2 -->
                <div class="bg-[#FAEDE5] rounded-2xl p-6 shadow-lg border-2 border-orange-100 text-center transform hover:-translate-y-2 transition duration-300">
                    <img src="assets/講師2.jpg" alt="ちままラボ" class="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-md">
                    <h3 class="text-xl font-black text-orange-600 mb-1">でざいんラボ主宰</h3>
                    <h4 class="text-2xl font-black text-gray-800 mb-4 border-b-2 border-orange-200 pb-2">ちままラボ</h4>
                    <ul class="text-sm text-gray-700 font-bold leading-relaxed text-left list-disc pl-4">
                        <li>納品実績1000枚以上</li>
                        <li>Canvaを1から学べるオンラインサロン</li>
                        <li>4人のママでも在宅ワークを叶える</li>
                    </ul>
                </div>
                <!-- 講師3 -->
                <div class="bg-[#FAEDE5] rounded-2xl p-6 shadow-lg border-2 border-orange-100 text-center transform hover:-translate-y-2 transition duration-300">
                    <img src="assets/講師3.jpg" alt="まめ" class="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-md">
                    <h3 class="text-xl font-black text-orange-600 mb-1">アフィリエイト講師</h3>
                    <h4 class="text-2xl font-black text-gray-800 mb-4 border-b-2 border-orange-200 pb-2">まめ</h4>
                    <ul class="text-sm text-gray-700 font-bold leading-relaxed text-left list-disc pl-4">
                        <li>Instagram 8万フォロワー</li>
                        <li>ママでも我慢のしない生き方</li>
                        <li>現在：香川県にて民泊経営</li>
                    </ul>
                </div>
                <!-- 講師4 -->
                <div class="bg-[#FAEDE5] rounded-2xl p-6 shadow-lg border-2 border-orange-100 text-center transform hover:-translate-y-2 transition duration-300">
                    <img src="assets/講師4.jpg" alt="村上良之" class="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-md">
                    <h3 class="text-xl font-black text-orange-600 mb-1">AI✖️LPデザイナー</h3>
                    <h4 class="text-2xl font-black text-gray-800 mb-4 border-b-2 border-orange-200 pb-2">村上良之</h4>
                    <p class="text-sm text-gray-700 font-bold leading-relaxed text-left">古事記project（株）代表。AIインフラ開発、NFT流通世界4位、個人法人向けAIセミナー開催など多岐にわたり活躍。</p>
                </div>
                <!-- 講師5 -->
                <div class="bg-[#FAEDE5] rounded-2xl p-6 shadow-lg border-2 border-orange-100 text-center transform hover:-translate-y-2 transition duration-300">
                    <img src="assets/講師5-2.jpg" alt="リアン" class="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-md">
                    <h3 class="text-xl font-black text-orange-600 mb-1">マインド担当</h3>
                    <h4 class="text-2xl font-black text-gray-800 mb-4 border-b-2 border-orange-200 pb-2">リアン</h4>
                    <p class="text-sm text-gray-700 font-bold leading-relaxed text-left">ヒーリングコンサル歴200名以上。<br>お金に対するマインドブロックを外し、成果を出すための「マインド講座」を担当します。</p>
                </div>
                <!-- 講師6 -->
                <div class="bg-[#FAEDE5] rounded-2xl p-6 shadow-lg border-2 border-orange-100 text-center transform hover:-translate-y-2 transition duration-300">
                    <img src="assets/講師6.jpg" alt="ジュネット" class="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-md">
                    <h3 class="text-xl font-black text-orange-600 mb-1">寄り添いコーチ</h3>
                    <h4 class="text-2xl font-black text-gray-800 mb-4 border-b-2 border-orange-200 pb-2">ジュネット</h4>
                    <p class="text-sm text-gray-700 font-bold leading-relaxed text-left">講座中のお悩みやおはなしを聞いて欲しいことのバックアップ。わからないスマホ作業についても徹底サポート！</p>
                </div>
            </div>
        </div>
    </section>

    <!-- 講座の詳細 -->
    <section class="py-24 px-4 bg-[#FAEDE5] border-y-4 border-[#E5D4C0]">
        <div class="max-w-5xl mx-auto">
            <div class="text-center mb-16"><h2 class="section-title">講座の詳細スケジュール</h2></div>
            
            <div class="grid md:grid-cols-2 gap-10">
                <!-- 内容 -->
                <div class="bg-white p-8 rounded-3xl shadow-xl border-t-8 border-orange-400 relative">
                    <h3 class="text-2xl md:text-3xl font-black text-[#C27D5C] mb-8 text-center border-b-2 border-[#E5D4C0] pb-4">＜学べる内容＞</h3>
                    <ul class="space-y-4 text-gray-800 font-bold text-base md:text-lg">
                        <li class="flex items-start"><span class="text-[#FCAE7C] text-xl mr-2">✔</span> <span class="flex-1 leading-snug">アフィリエイトの仕組みと稼ぎ方</span></li>
                        <li class="flex items-start"><span class="text-[#FCAE7C] text-xl mr-2">✔</span> <span class="flex-1 leading-snug">収益につながるアフィリエイトの案件の取得方法</span></li>
                        <li class="flex items-start"><span class="text-[#FCAE7C] text-xl mr-2">✔</span> <span class="flex-1 leading-snug">AIを使った「売れる商品づくり」のステップ</span></li>
                        <li class="flex items-start"><span class="text-[#FCAE7C] text-xl mr-2">✔</span> <span class="flex-1 leading-snug">おウチでできる商品づくりとコンセプト設計</span></li>
                        <li class="flex items-start"><span class="text-[#FCAE7C] text-xl mr-2">✔</span> <span class="flex-1 leading-snug">インスタで売れるための導線づくり（投稿〜販売まで）</span></li>
                        <li class="flex items-start"><span class="text-[#FCAE7C] text-xl mr-2">✔</span> <span class="flex-1 leading-snug">Instagram×AIの基本操作と実践的な活用方法</span></li>
                        <li class="flex items-start"><span class="text-[#FCAE7C] text-xl mr-2">✔</span> <span class="flex-1 leading-snug">初心者でも理解できるやさしいステップと学び</span></li>
                        <li class="flex items-start"><span class="text-[#FCAE7C] text-xl mr-2">✔</span> <span class="flex-1 leading-snug">仲間と一緒に進める作業会＆手厚いサポート環境</span></li>
                        <li class="flex items-start"><span class="text-[#FCAE7C] text-xl mr-2">✔</span> <span class="flex-1 leading-snug">わからないをそのままにしない個別サポート</span></li>
                        <li class="flex items-start"><span class="text-[#FCAE7C] text-xl mr-2">✔</span> <span class="flex-1 leading-snug">実際に販売まで進める実践サポート<br><span class="text-sm font-medium text-gray-500">（オンラインマルシェ出店サポート付き）</span></span></li>
                        <li class="flex items-start"><span class="text-[#FCAE7C] text-xl mr-2">✔</span> <span class="flex-1 leading-snug">充実の５大特典</span></li>
                    </ul>
                    <div class="mt-8 bg-[#FDF9F1] p-6 rounded-xl text-center border-2 border-[#E5D4C0]">
                        <p class="text-xl font-black text-[#C27D5C] mb-2">👉「学ぶだけで終わらない<br>“実際に売るところまで”サポート」</p>
                        <p class="text-lg font-bold text-gray-700">📱スマホだけでも出来る内容ばかり</p>
                    </div>
                </div>

                <!-- 日程 -->
                <div class="bg-white p-8 rounded-3xl shadow-xl border-t-8 border-orange-400 relative">
                    <h3 class="text-2xl md:text-3xl font-black text-[#C27D5C] mb-8 text-center border-b-2 border-[#E5D4C0] pb-4">＜開催日程＞</h3>
                    <div class="grid grid-cols-2 gap-3 text-gray-800 font-black text-xl mb-8 text-center">
                        <div class="bg-gray-50 py-2 rounded border border-gray-100">4月17日</div><div class="bg-gray-50 py-2 rounded border border-gray-100">4月19日</div>
                        <div class="bg-gray-50 py-2 rounded border border-gray-100">4月25日</div><div class="bg-gray-50 py-2 rounded border border-gray-100">4月30日</div>
                        <div class="bg-gray-50 py-2 rounded border border-gray-100">5月 8日</div><div class="bg-gray-50 py-2 rounded border border-gray-100">5月12日</div>
                        <div class="bg-gray-50 py-2 rounded border border-gray-100">5月17日</div><div class="bg-gray-50 py-2 rounded border border-gray-100">5月22日</div>
                        <div class="bg-gray-50 py-2 rounded border border-gray-100">5月31日</div><div class="bg-gray-50 py-2 rounded border border-gray-100">6月 9日</div>
                        <div class="bg-gray-50 py-2 rounded border border-gray-100">6月15日</div><div class="bg-gray-50 py-2 rounded border border-gray-100">6月21日</div>
                    </div>
                    <div class="bg-[#FAEDE5] p-4 rounded-xl text-[#C27D5C] font-bold text-center space-y-2 border-2 border-[#E5D4C0]">
                        <p class="text-lg">📺 全日程 アーカイブ配信あり！</p>
                        <p>PM 9：00 スタート</p>
                        <p class="text-sm mt-2 text-gray-600">※個別作業会は日中でも対応可能！<br>※オンライン上でのマルシェ出店あり！</p>
                    </div>
                </div>
            </div>

            <!-- ガツンと売り込む！5つの特典 -->
            <div class="mt-16 bg-gradient-to-br from-orange-400 to-orange-500 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden text-white border-8 border-yellow-200">
                <div class="ribbon text-xl py-2 px-8 bg-yellow-300 text-red-600 shadow-xl border-2 border-yellow-100">絶対に見逃せない！！！</div>
                <h3 class="text-3xl md:text-5xl font-black text-yellow-200 mb-10 text-center drop-shadow-md">
                    🎁 圧倒的にお得な<br class="md:hidden">「手厚い５つの特典」 🎁
                </h3>
                <p class="text-center text-xl font-bold mb-8 bg-white/20 py-2 rounded-lg">これだけでも元が取れるレベルの超豪華サポート！</p>
                
                <div class="space-y-4 text-gray-900">
                    <div class="bg-white p-6 rounded-2xl flex flex-col md:flex-row items-center shadow-lg border-b-4 border-gray-200 transform hover:scale-105 transition">
                        <div class="text-5xl font-black text-orange-500 mr-0 md:mr-6 mb-4 md:mb-0 drop-shadow">①</div>
                        <div class="text-center md:text-left">
                            <p class="text-2xl font-black text-red-600 mb-1">CANVA ２ヶ月間 質問・指導受け放題！</p>
                            <p class="font-bold text-gray-600">デザインのプロ「ちままラボ」へ特別ご招待！プロの技を盗み放題！</p>
                        </div>
                    </div>
                    <div class="bg-white p-6 rounded-2xl flex flex-col md:flex-row items-center shadow-lg border-b-4 border-gray-200 transform hover:scale-105 transition">
                        <div class="text-5xl font-black text-orange-500 mr-0 md:mr-6 mb-4 md:mb-0 drop-shadow">②</div>
                        <div class="text-center md:text-left">
                            <p class="text-2xl font-black text-red-600 mb-1">売れる商品を一緒に作る！個別カウンセリング</p>
                            <p class="font-bold text-gray-600">一人で悩ませません！あなたが確実に売れる商品をプロと一緒に構築！</p>
                        </div>
                    </div>
                    <div class="bg-white p-6 rounded-2xl flex flex-col md:flex-row items-center shadow-lg border-b-4 border-gray-200 transform hover:scale-105 transition">
                        <div class="text-5xl font-black text-orange-500 mr-0 md:mr-6 mb-4 md:mb-0 drop-shadow">③</div>
                        <div class="text-center md:text-left">
                            <p class="text-xl md:text-2xl font-black text-red-600 mb-2 leading-tight">すぐに売上げに繋げられる導線<br>「最強の武器」(ＬＰランディングページ)を<br>破格で御提供！</p>
                            <p class="font-bold text-gray-600 text-lg">販売導線LP・お申し込みツール制作 <span class="text-red-600 font-black text-2xl">80%OFF!</span></p>
                        </div>
                    </div>
                    <div class="bg-white p-6 rounded-2xl flex flex-col md:flex-row items-center shadow-lg border-b-4 border-gray-200 transform hover:scale-105 transition">
                        <div class="text-5xl font-black text-orange-500 mr-0 md:mr-6 mb-4 md:mb-0 drop-shadow">④</div>
                        <div class="text-center md:text-left">
                            <p class="text-2xl font-black text-red-600 mb-1">インフルエンサー直伝！特別講義が無料！</p>
                            <p class="font-bold text-gray-600">写真の撮り方、伸びる投稿の秘訣を現役インフルエンサーからタダで聞ける！</p>
                        </div>
                    </div>
                    <div class="bg-white p-6 rounded-2xl flex flex-col md:flex-row items-center shadow-lg border-b-4 border-gray-200 transform hover:scale-105 transition">
                        <div class="text-5xl font-black text-orange-500 mr-0 md:mr-6 mb-4 md:mb-0 drop-shadow">⑤</div>
                        <div class="text-center md:text-left">
                            <p class="text-2xl font-black text-red-600 mb-1">講座期間中(3ヶ月間) 個別LINEで質問し放題！</p>
                            <p class="font-bold text-gray-600">つまづいた時はいつでも質問OK！「わからない」で絶対に止まらせません！</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- お客様の声 -->
    <section class="py-20 px-4 bg-white">
        <div class="max-w-5xl mx-auto text-center">
            <div class="text-center mb-16"><h2 class="section-title">喜びの声が続々届いています！</h2></div>
            <div class="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-6 mt-8">
                <script>
                    for(let i=1; i<=14; i++) {
                        let num = i.toString().padStart(3, '0');
                        document.write(`
                            <div class="rounded-xl overflow-hidden shadow-lg border-2 border-gray-100 hover:scale-105 transition-transform duration-300">
                                <img src="assets/${num}.jpg" alt="お客様の声 ${num}" class="w-full h-auto object-cover" loading="lazy">
                            </div>
                        `);
                    }
                </script>
            </div>
        </div>
    </section>

    <!-- 商品プラン（ガツンと売る！） -->
    <section id="products" class="py-24 px-4 bg-[#FDF9F1] relative border-t-8 border-orange-300">
        <div class="max-w-6xl mx-auto">
            <h2 class="text-4xl md:text-5xl font-black text-center mb-16 text-gray-800 w-full tracking-wide">
                <span class="text-orange-500">本気で人生を変える</span><br class="md:hidden">商品プラン
            </h2>
            
            <div class="grid md:grid-cols-3 gap-8 items-end">
                <!-- Aプラン -->
                <div class="bg-white rounded-3xl p-8 shadow-xl flex flex-col items-center text-center border-t-8 border-gray-300 transform md:scale-95">
                    <h3 class="text-3xl font-black text-gray-700 mb-2">＜プラン A＞</h3>
                    <p class="text-2xl font-black text-[#C27D5C] border-b-2 border-gray-100 w-full pb-4">８つのAIアプリ<br>入門講座</p>
                    <div class="my-6 w-full h-auto overflow-hidden rounded-xl">
                        <img src="assets/plan_a.jpg" alt="Aコース" class="w-full h-auto object-contain">
                    </div>
                    <div class="py-4 flex-grow">
                        <p class="text-gray-500 font-bold mb-1">単品価格</p>
                        <p class="text-4xl font-black text-gray-800">39,800<span class="text-xl">円</span></p>
                    </div>
                </div>

                <!-- Bプラン (一番人気強調) -->
                <div class="bg-white rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center border-4 border-orange-400 relative z-10">
                    <div class="absolute -top-6 bg-red-600 text-white px-8 py-2 rounded-full font-black text-lg tracking-widest shadow-lg animate-bounce">👑 圧倒的一番人気！ 👑</div>
                    <h3 class="text-4xl font-black text-orange-500 mb-2 mt-4">＜プラン B＞</h3>
                    <p class="text-3xl font-black text-gray-800 border-b-4 border-orange-100 w-full pb-4">本講座<br><span class="text-lg text-orange-600">（すべて込み）</span></p>
                    
                    <div class="py-6 flex-grow text-base font-black text-gray-700 space-y-3 w-full">
                        <div class="bg-orange-50 border border-orange-200 p-3 rounded-lg flex items-center justify-center">
                            <span class="text-red-500 mr-2 text-xl">🎁</span> AのAIアプリ講座<br>(39,800円相当) 込み！
                        </div>
                        <div class="bg-orange-50 border border-orange-200 p-3 rounded-lg flex items-center justify-center">
                            <span class="text-red-500 mr-2 text-xl">🎁</span> ２ヶ月CANVAラボ<br>(6,000円相当) 込み！
                        </div>
                        <p class="text-orange-600 text-xl pt-2">超豪華なコミコミセット！</p>
                    </div>
                    
                    <div class="pb-6 w-full bg-yellow-50 rounded-xl p-4 border-2 border-yellow-200 mb-6">
                        <p class="text-red-600 font-bold mb-1 line-through">本来ならもっと高額ですが…</p>
                        <p class="text-gray-600 font-bold mb-1">特別価格</p>
                        <p class="text-6xl font-black text-red-600">80,000<span class="text-2xl">円</span></p>
                    </div>
                </div>

                <!-- Cプラン (アップセル) -->
                <div class="bg-gradient-to-b from-gray-800 to-black rounded-3xl p-8 shadow-xl flex flex-col items-center text-center border-t-8 border-yellow-400 text-white transform md:scale-95 relative">
                    <div class="absolute -top-5 bg-yellow-500 text-black px-6 py-1 rounded-full font-bold text-sm shadow-md">本気で売るならコレ！</div>
                    <h3 class="text-3xl font-black text-yellow-400 mb-2 mt-2">＜プラン C＞</h3>
                    <div class="w-full border-b border-gray-600 pb-4">
                        <p class="text-sm font-bold text-yellow-400 inline-block px-2">＼もう“作れない”で止まらない／</p>
                        <p class="text-xl font-black text-white mt-2">販売導線まるごと<br>プロにお任せプラン</p>
                    </div>
                    
                    <div class="py-6 flex-grow text-left w-full space-y-3 text-base font-bold text-gray-200 bg-white/5 p-4 rounded-xl mt-4">
                        <p class="flex items-center"><span class="text-yellow-400 mr-2">✔</span> 専用LP制作</p>
                        <p class="flex items-center"><span class="text-yellow-400 mr-2">✔</span> お申し込みフォーム作成</p>
                        <p class="flex items-center"><span class="text-yellow-400 mr-2">✔</span> 販売導線づくり</p>
                    </div>
                    
                    <div class="pb-6 w-full relative mt-4">
                        <p class="text-gray-400 text-sm font-bold">👉 通常 <span class="line-through">300,000円</span>のところ</p>
                        <p class="text-lg text-yellow-400 font-black mt-2 bg-red-600/30 py-1 rounded">👇 講座受講者限定 80％オフ✨</p>
                        <p class="text-5xl font-black text-yellow-400 mt-2">60,000<span class="text-2xl">円</span></p>
                    </div>
                </div>
            </div>

            <!-- お申し込みボタン -->
            <div class="mt-16 text-center">
                <a href="form.html" class="bg-gradient-to-b from-orange-300 to-orange-500 text-white px-12 py-6 rounded-full text-2xl md:text-3xl font-black shadow-lg btn-pulse border-b-4 border-orange-600 inline-block">
                    プランを選択して申し込む！ ＞
                </a>
            </div>
        </div>
    </section>

    <!-- 巨大Instagramリンク -->
    <section class="py-16 px-4 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 text-center">
        <h2 class="text-3xl md:text-5xl font-black text-white mb-6 drop-shadow-md">最新情報はInstagramで発信中！</h2>
        <a href="https://instagram.com/mama.mika.mama" target="_blank" class="inline-block bg-white text-orange-500 px-12 py-6 rounded-full text-3xl md:text-5xl font-black shadow-2xl hover:scale-110 transition-transform">
            📷 @mama.mika.mama
        </a>
    </section>

    <!-- 特商法画像貼り付け -->
    <section class="py-16 px-4 bg-[#FDF9F1] text-center border-t border-orange-100">
        <div class="max-w-2xl mx-auto">
            <img src="assets/tokushoho_inline.png" alt="特定商取引法に基づく表記" class="w-full h-auto shadow-md rounded-lg">
        </div>
    </section>

    <!-- フッター -->
    <footer class="bg-gray-800 py-12 text-center text-gray-400 text-sm">
        <p class="text-gray-500">&copy; 2026 アフィリエイト講座 All Rights Reserved.</p>
    </footer>

</body>
</html>
`;
fs.writeFileSync(indexPath, indexHtml);
console.log('index.html fully updated for layout, colors, and content.');

// --- 3. form.html の全面書き換え（色味の統一） ---
const formPath = '/home/hiramekiya/clawd/collective-panda/mika-lp-2/form.html';
const formHtml = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>お申し込み | アフィリエイト講座</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Noto Sans JP', sans-serif; background-color: #FDF9F1; color: #5C4A3D; }
        .card-shadow { box-shadow: 0 4px 20px rgba(194, 125, 92, 0.1); }
    </style>
</head>
<body class="antialiased min-h-screen flex flex-col items-center justify-center p-4 py-10">

    <div class="w-full max-w-lg bg-white p-8 md:p-12 rounded-2xl card-shadow border border-orange-100 relative overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-300 via-orange-400 to-orange-300"></div>
        
        <h1 class="text-2xl md:text-3xl font-black text-orange-600 mb-2 text-center tracking-wide">お申し込みフォーム</h1>
        <p class="text-sm text-gray-500 text-center mb-8 border-b pb-4">必要事項をご入力のうえ、「確認画面へ」ボタンを押してください。</p>
        
        <form id="applyForm" class="space-y-6">
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">お名前 <span class="text-xs bg-red-100 text-red-500 px-2 py-0.5 rounded-sm ml-1">必須</span></label>
                <input type="text" required class="w-full p-4 border border-gray-200 rounded-xl focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition bg-gray-50 focus:bg-white" placeholder="山田 花子">
            </div>

            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">メールアドレス <span class="text-xs bg-red-100 text-red-500 px-2 py-0.5 rounded-sm ml-1">必須</span></label>
                <input type="email" required class="w-full p-4 border border-gray-200 rounded-xl focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition bg-gray-50 focus:bg-white" placeholder="example@email.com">
            </div>

            <div>
                <label class="block text-sm font-bold text-gray-700 mb-3">性別 <span class="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-sm ml-1">任意</span></label>
                <div class="flex space-x-6">
                    <label class="flex items-center cursor-pointer">
                        <input type="radio" name="gender" value="female" class="w-5 h-5 text-orange-500 border-gray-300 focus:ring-orange-400">
                        <span class="ml-2 text-gray-700 font-medium">女性</span>
                    </label>
                    <label class="flex items-center cursor-pointer">
                        <input type="radio" name="gender" value="male" class="w-5 h-5 text-blue-500 border-gray-300 focus:ring-blue-400">
                        <span class="ml-2 text-gray-700 font-medium">男性</span>
                    </label>
                    <label class="flex items-center cursor-pointer">
                        <input type="radio" name="gender" value="other" class="w-5 h-5 text-gray-500 border-gray-300 focus:ring-gray-400">
                        <span class="ml-2 text-gray-700 font-medium">その他</span>
                    </label>
                </div>
            </div>

            <div class="mt-8 border-t border-gray-200 pt-6">
                <label class="block text-sm font-bold text-gray-700 mb-3">お申し込みコース <span class="text-xs bg-red-100 text-red-500 px-2 py-0.5 rounded-sm ml-1">必須</span></label>
                <div class="space-y-3">
                    <label class="flex items-center p-4 bg-gray-50 border border-gray-200 rounded-xl cursor-pointer hover:bg-white focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100 transition">
                        <input type="radio" name="course" value="A" required class="w-5 h-5 text-orange-500 border-gray-300">
                        <span class="ml-3 text-gray-700 font-bold text-lg">プラン A <span class="text-sm text-gray-500 font-normal">（AIアプリ入門講座 39,800円）</span></span>
                    </label>
                    <label class="flex items-center p-4 bg-orange-50 border-2 border-orange-400 rounded-xl cursor-pointer hover:bg-orange-100 shadow-sm transition relative overflow-hidden">
                        <div class="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-bl-lg font-bold">一番人気</div>
                        <input type="radio" name="course" value="B" class="w-5 h-5 text-orange-500 border-gray-300">
                        <span class="ml-3 text-orange-700 font-bold text-lg">プラン B <span class="text-sm text-orange-600 font-normal">（本講座 80,000円）</span></span>
                    </label>
                </div>
            </div>

            <div class="mt-6">
                <label class="block text-sm font-bold text-gray-700 mb-3">追加オプション</label>
                <label class="flex items-center p-4 bg-yellow-50 border-2 border-yellow-400 rounded-xl cursor-pointer hover:bg-yellow-100 shadow-sm transition relative overflow-hidden">
                    <div class="absolute top-0 right-0 bg-red-600 text-white text-xs px-2 py-1 rounded-bl-lg font-bold">本気で売るならコレ！</div>
                    <input type="checkbox" name="option_c" value="C" class="w-6 h-6 text-yellow-600 border-gray-300 rounded">
                    <div class="ml-3">
                        <span class="text-gray-800 font-black text-lg block">＋ プラン C 追加</span>
                        <span class="text-sm text-gray-600 font-bold block mt-1">（販売導線お任せプラン 60,000円）</span>
                    </div>
                </label>
            </div>
            
            <div class="pt-8">
                <button type="submit" class="w-full bg-gradient-to-r from-orange-400 to-[#e89552] text-white py-5 rounded-full font-bold text-xl shadow-lg hover:scale-105 transition-transform">
                    確認画面へ進む
                </button>
            </div>
            
            <div class="text-center mt-8">
                <a href="index.html" class="text-sm text-orange-500 hover:text-orange-700 transition border-b border-orange-200 pb-1">← LPページに戻る</a>
            </div>
        </form>
    </div>

    <script>
        document.getElementById('applyForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('【テスト送信】\\n\\nご入力ありがとうございます。\\n※これはサンプル画面のため実際の送信は行われません。\\n「OK」を押すとトップページに戻ります。');
            window.location.href = 'index.html';
        });
    </script>
</body>
</html>`;
fs.writeFileSync(formPath, formHtml);
console.log('form.html colors updated.');
