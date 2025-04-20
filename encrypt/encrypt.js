        const KEY = '';

        function encrypt(plaintext, passphrase) {
            const key = CryptoJS.SHA256(passphrase + KEY);
            const iv = CryptoJS.lib.WordArray.random(16);
            const encrypted = CryptoJS.AES.encrypt(plaintext, key, { iv });
            return CryptoJS.enc.Base64.stringify(iv.concat(encrypted.ciphertext));
        }

        function decrypt(ciphertext, passphrase) {
            try {
                const decoded = CryptoJS.enc.Base64.parse(ciphertext);
                const iv = CryptoJS.lib.WordArray.create(decoded.words.slice(0, 4));
                const encryptedText = CryptoJS.lib.WordArray.create(decoded.words.slice(4));
                const key = CryptoJS.SHA256(passphrase + KEY);
                const decrypted = CryptoJS.AES.decrypt({ ciphertext: encryptedText }, key, { iv });
                return decrypted.toString(CryptoJS.enc.Utf8);
            } catch (error) {
                return null;
            }
        }

        function processText() {
            const inputText = document.getElementById('inputText').value.trim();
            const outputDiv = document.getElementById('output');

            if (inputText.startsWith('&&')) {
                const decryptedText = decrypt(inputText.slice(2), passphrase);
                if (decryptedText) {
                    outputDiv.textContent = 'Decrypted text: ' + decryptedText;
                } else {
                    outputDiv.textContent = 'Decryption failed. Incorrect passphrase.';
                }
            } else {
                const encryptedText = '&&' + encrypt(inputText, passphrase);
                outputDiv.textContent = encryptedText;
            }
        }
        document.getElementById('inputText').addEventListener('keydown', function (event) {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                processText();
            }
        });

        document.getElementById('passphrase').addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                processText();
            }
        });
