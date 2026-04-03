const fs = require('fs');
const indexPath = '/home/hiramekiya/clawd/collective-panda/mika-lp-2/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

// 1. 早期お申込み特典（品の良いゴールド）
const replaceStr = `
                <div class="text-center mb-6 fade-up">
                    <span class="inline-block bg-gradient-to-r from-[#C5A059] via-[#EAE0C8] to-[#C5A059] text-[#3E2A23] px-8 py-2 rounded-sm font-serif text-sm tracking-widest shadow-md border border-[#D4AF37]">
                        ✧ 早期お申込み特典 ✧
                    </span>
                </div>
                <h3 class="font-serif text-2xl text-navy mb-12 text-center">５つの特別なプレゼントをご案内</h3>
`;
if (html.includes('<h3 class="font-serif text-2xl text-navy mb-12 text-center">５つの特別なプレゼントをご案内</h3>')) {
    html = html.replace('<h3 class="font-serif text-2xl text-navy mb-12 text-center">５つの特別なプレゼントをご案内</h3>', replaceStr);
} else {
    // Fallback
    html = html.replace(/<h3[^>]*>５つの特別なプレゼントをご案内<\/h3>/, replaceStr);
}

// 2. Instagramロゴ
const oldIgRegex = /<a href="https:\/\/instagram\.com\/mama\.mika\.mama"[^>]*>\s*@mama\.mika\.mama\s*<\/a>/;
const newIgLink = `<a href="https://instagram.com/mama.mika.mama" target="_blank" class="btn-ghost px-8 py-4 tracking-widest text-sm inline-flex items-center justify-center transition-all hover:-translate-y-1">
            <img src="assets/ig_logo.png" alt="Instagram" class="w-7 h-7 mr-3 object-contain" style="mix-blend-mode: multiply;">
            <span class="mt-1">@mama.mika.mama</span>
        </a>`;
html = html.replace(oldIgRegex, newIgLink);

fs.writeFileSync(indexPath, html);
console.log('Gold bonus tag and IG logo added.');
