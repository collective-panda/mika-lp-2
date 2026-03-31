const fs = require('fs');

const indexPath = '/home/hiramekiya/clawd/collective-panda/mika-lp-2/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Google Fonts の読み込みを UDフォント（BIZ UDPGothic / BIZ UDPMincho）に変更
html = html.replace(
    /<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Noto\+Serif\+JP[\s\S]*?rel="stylesheet">/,
    '<link href="https://fonts.googleapis.com/css2?family=BIZ+UDPGothic:wght@400;700&family=BIZ+UDPMincho:wght@400;700&display=swap" rel="stylesheet">'
);

// 2. CSSの全面アップデート（文字色、フォントサイズ、行間、UDフォントの適用）
const oldStyleRegex = /<style>[\s\S]*?<\/style>/;
const newStyle = `<style>
        body { 
            font-family: 'BIZ UDPGothic', sans-serif; 
            background-color: #F9F8F6; 
            color: #333333 !important; /* 背景に溶け込まないチャコールグレー */
            overflow-x: hidden; 
            letter-spacing: 0.05em;
            line-height: 1.9 !important; /* 行間 1.9倍（ゆったり） */
            font-size: 110%; /* 全体的に1.1〜1.2倍大きく */
        }
        h1, h2, h3, h4, h5, .font-serif { 
            font-family: 'BIZ UDPMincho', serif !important; 
            color: #3E2A23 !important; /* 深みのあるダークブラウン */
            letter-spacing: 0.1em;
            line-height: 1.5;
        }
        
        .hero-video-wrapper { position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; z-index: -2; }
        .hero-video-wrapper video { min-w-full; min-h-full; object-fit: cover; width: 100vw; height: 100vh; filter: saturate(0.8) contrast(0.9); }
        .hero-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(249, 248, 246, 0.85); backdrop-filter: blur(4px); z-index: -1; }

        .border-greige { border-color: #E5E0D8; }
        .bg-greige { background-color: #E5E0D8; }
        .text-navy { color: #3E2A23 !important; } /* ネイビー指定だったものをダークブラウンに書き換え */
        .bg-navy { background-color: #3E2A23 !important; border-color: #3E2A23 !important; }
        .text-dusty { color: #C49A9A; }
        
        /* Tailwindのグレー系テキストをチャコールグレーに強制上書き（視認性向上） */
        .text-gray-400, .text-gray-500, .text-gray-600, .text-gray-700, .text-gray-800, .text-gray-900 {
            color: #333333 !important;
        }
        .text-white { color: #ffffff !important; }
        
        /* 読みやすさ重視のため、Tailwindの基本サイズクラスを強制引き上げ */
        .text-xs { font-size: 0.95rem !important; }
        .text-sm { font-size: 1.05rem !important; }
        .text-base { font-size: 1.15rem !important; }
        
        .btn-elegant { 
            background-color: #3E2A23; 
            color: #ffffff !important; 
            transition: all 0.4s ease; 
            border: 1px solid #3E2A23;
        }
        .btn-elegant:hover { 
            background-color: #F9F8F6; 
            color: #3E2A23 !important; 
        }

        .btn-ghost {
            background-color: transparent;
            border: 1px solid #3E2A23;
            color: #3E2A23 !important;
            transition: all 0.4s ease;
        }
        .btn-ghost:hover {
            background-color: #3E2A23;
            color: #ffffff !important;
        }

        .section-title { 
            font-size: 1.85rem; 
            font-weight: 700; 
            text-align: center; 
            margin-bottom: 3rem;
            position: relative;
            color: #3E2A23 !important;
        }
        .section-title::after {
            content: '';
            display: block;
            width: 40px;
            height: 1px;
            background-color: #C49A9A;
            margin: 1rem auto 0;
        }

        .fade-up { opacity: 0; transform: translateY(20px); transition: opacity 1s ease-out, transform 1s ease-out; }
        .fade-up.visible { opacity: 1; transform: translateY(0); }

        .elegant-underline {
            border-bottom: 1px solid #C49A9A;
            padding-bottom: 2px;
        }
        
        .input-elegant {
            background-color: #ffffff;
            border: 1px solid #E5E0D8;
            border-radius: 4px;
            padding: 1rem;
            width: 100%;
            transition: border-color 0.3s ease;
            font-family: 'BIZ UDPGothic', sans-serif;
            color: #333333;
        }
        .input-elegant:focus {
            outline: none;
            border-color: #3E2A23;
        }
    </style>`;
html = html.replace(oldStyleRegex, newStyle);

// 3. 講師1（美香）のプロフィール文言変更
const oldProf = 'スマホひとつで収益化が叶う未来を日々お伝えしています。';
const newProf = 'スマホひとつで収益化が叶う未来を日々ご提案しています。<br>おウチにいながら収入を増やしていくためのノウハウとマインドを丁寧にお伝えします。';
html = html.replace(oldProf, newProf);
// 句点なしパターンへのフォールバック
html = html.replace('スマホひとつで収益化が叶う未来を日々お伝えしています', newProf);

fs.writeFileSync(indexPath, html);
console.log('Applied BIZ UD Fonts, increased sizes, line heights, and charcoal/dark brown colors.');
