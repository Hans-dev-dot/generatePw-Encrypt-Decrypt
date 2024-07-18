document.addEventListener('DOMContentLoaded', async () => {
    const apiUrl = 'https://generators-rix6txmew-andres-projects-13420832.vercel.app/';

    const passwordForm = document.getElementById('passwordForm');
    const passwordLengthInput = document.getElementById('passwordLength');
    const passwordResultDiv = document.getElementById('passwordResult');

    const decryptForm = document.getElementById('decryptForm');
    const textToDecryptInput = document.getElementById('textToDecrypt');
    const shiftDecryptInput = document.getElementById('shiftDecrypt');
    const decryptResultDiv = document.getElementById('decryptResult');

    const encryptForm = document.getElementById('encryptForm'); // Tambahkan ini
    const textToEncryptInput = document.getElementById('textToEncrypt'); // Tambahkan ini
    const shiftEncryptInput = document.getElementById('shiftEncrypt'); // Tambahkan ini
    const encryptResultDiv = document.getElementById('encryptResult'); // Tambahkan ini

    if (passwordForm) {
        passwordForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const passwordLength = parseInt(passwordLengthInput.value, 10);
            console.log(`Submitting password form with length: ${passwordLength}`);

            if (isNaN(passwordLength) || passwordLength <= 0) {
                console.error('Invalid password length:', passwordLength);
                passwordResultDiv.textContent = 'Invalid password length';
                return;
            }

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        action: 'generate',
                        length: passwordLength
                    })
                });

                console.log('Password generation request sent');

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Error response from server:', errorData);
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log('Password generation response received:', data);

                const { password } = data;

                passwordResultDiv.innerHTML = `
                    <p><strong>Generated Password:</strong> ${password}</p>
                `;

            } catch (error) {
                console.error('Error:', error);
                passwordResultDiv.textContent = 'Error fetching data';
            }
        });
    }

    if (decryptForm) {
        decryptForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const textToDecrypt = textToDecryptInput.value;
            const shiftDecrypt = parseInt(shiftDecryptInput.value, 10);
            console.log(`Submitting decrypt form with text: ${textToDecrypt} and shift: ${shiftDecrypt}`);

            if (textToDecrypt.trim() === '') {
                console.error('Text to decrypt is empty');
                decryptResultDiv.textContent = 'Text to decrypt is empty';
                return;
            }

            if (isNaN(shiftDecrypt) || shiftDecrypt < 1 || shiftDecrypt > 25) {
                console.error('Invalid shift value for decryption:', shiftDecrypt);
                decryptResultDiv.textContent = 'Shift for decryption must be between 1 and 25';
                return;
            }

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        action: 'decrypt',
                        ciphertext: textToDecrypt,
                        shift: shiftDecrypt
                    })
                });

                console.log('Decryption request sent');

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Error response from server:', errorData);
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log('Decryption response received:', data);

                const { plaintext } = data;

                decryptResultDiv.innerHTML = `
                    <p><strong>Decrypted Text:</strong> ${plaintext}</p>
                `;

            } catch (error) {
                console.error('Error:', error);
                decryptResultDiv.textContent = 'Error fetching data';
            }
        });
    }

    if (encryptForm) { // Tambahkan ini
        encryptForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const textToEncrypt = textToEncryptInput.value;
            const shiftEncrypt = parseInt(shiftEncryptInput.value, 10);
            console.log(`Submitting encrypt form with text: ${textToEncrypt} and shift: ${shiftEncrypt}`);

            if (textToEncrypt.trim() === '') {
                console.error('Text to encrypt is empty');
                encryptResultDiv.textContent = 'Text to encrypt is empty';
                return;
            }

            if (isNaN(shiftEncrypt) || shiftEncrypt < 1 || shiftEncrypt > 25) {
                console.error('Invalid shift value for encryption:', shiftEncrypt);
                encryptResultDiv.textContent = 'Shift for encryption must be between 1 and 25';
                return;
            }

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        action: 'encrypt',
                        plaintext: textToEncrypt,
                        shift: shiftEncrypt
                    })
                });

                console.log('Encryption request sent');

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Error response from server:', errorData);
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log('Encryption response received:', data);

                const { ciphertext } = data;

                encryptResultDiv.innerHTML = `
                    <p><strong>Encrypted Text:</strong> ${ciphertext}</p>
                `;

            } catch (error) {
                console.error('Error:', error);
                encryptResultDiv.textContent = 'Error fetching data';
            }
        });
    }
});
