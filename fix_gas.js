const fs = require('fs');
const filePath = '/home/hiramekiya/clawd/collective-panda/mika-lp-2/form.html';
let html = fs.readFileSync(filePath, 'utf8');

// 1. GAS URL の差し替え
html = html.replace(/const GAS_URL = 'YOUR_GAS_URL_HERE';/g, "const GAS_URL = 'https://script.google.com/macros/s/AKfycbz_f70YjzPPT9yxPwMFE_vIagMcNrHNOkyXmGE97hrn92fzjHPGhuHs0hi5WgZReXHc/exec';");

// 2. テスト用アラートの削除
html = html.replace(/if\s*\(GAS_URL === 'YOUR_GAS_URL_HERE'\)[\s\S]*?return;\s*\}/, '');

// 3. name属性の補完（送信する値が空にならないように）
html = html.replace(/<input type="text" required class="w-full p-4 border border-gray-200/g, '<input type="text" name="name" required class="w-full p-4 border border-gray-200');
html = html.replace(/<input type="email" required class="w-full p-4 border border-gray-200/g, '<input type="email" name="email" required class="w-full p-4 border border-gray-200');

// 4. CORSエラー対策（fetchの記述書き換え）
const oldFetch = `            fetch(GAS_URL, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if(data.result === 'success'){
                    alert('【送信完了】\\\\nお申し込みありがとうございます！\\\\n担当者より折り返しご連絡いたします。');
                    window.location.href = 'index.html'; // トップに戻る
                } else {
                    alert('エラーが発生しました。');
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            })
            .catch(error => {
                alert('通信エラーが発生しました。');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });`;

const newFetch = `            fetch(GAS_URL, {
                method: 'POST',
                body: formData,
                mode: 'no-cors' // GoogleのCORS制約を回避
            })
            .then(() => {
                alert('【お申し込み完了】\\nありがとうございます！\\nご入力いただいたメールアドレス宛に、担当者より折り返しご連絡いたします。');
                window.location.href = 'index.html'; 
            })
            .catch(error => {
                console.error(error);
                alert('通信エラーが発生しました。時間を置いて再度お試しください。');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });`;

html = html.replace(oldFetch, newFetch);

fs.writeFileSync(filePath, html);
console.log('form.html successfully connected to GAS');
