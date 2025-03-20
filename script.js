document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('vbucksForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        await checkAccount();
    });

    async function checkAccount() {
        const username = document.getElementById('username').value;
        const platform = document.getElementById('platform').value;
        
        // APIキーを読み込む
        const apiKey = await fetchApiKey();

        if (!username) {
            alert('ディスプレイネームを入力してください');
            return;
        }

        const url = `https://api.fortnitetracker.com/v1/profile/${platform}/${username}`;

        try {
            const response = await fetch(url, {
                headers: {
                    'TRN-Api-Key': apiKey
                }
            });

            if (!response.ok) {
                throw new Error('アカウントが見つかりません');
            }

            if (Math.random() < 1/3) {
                const code = generateRandomCode();
                displayResult(`成功しました！\n生成コード: ${code}`);
            } else {
                displayResult('生成に失敗しました。');
            }
        } catch (error) {
            displayResult(`エラー: ${error.message}`);
        }
    }

    // APIキーを取得する関数
    async function fetchApiKey() {
        const response = await fetch('api/api.txt'); // APIキーを格納したファイルを読み込む
        if (!response.ok) {
            throw new Error('APIキーの読み込みに失敗しました');
        }
        return await response.text(); // APIキーを返す
    }

    function generateRandomCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 16; i++) {
            if (i > 0 && i % 4 === 0) code += '-';
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }

    function displayResult(message) {
        const result = document.getElementById('result');
        result.innerText = message;
        result.style.opacity = 0;
        setTimeout(() => {
            result.style.opacity = 1;
        }, 100);
    }
});
