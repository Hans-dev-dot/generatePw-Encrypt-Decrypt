// main.js

document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://rener-46hnfaq2i-hans-dev-dots-projects.vercel.app/'; // Ganti dengan URL serverless function Anda

    const passwordForm = document.getElementById('passwordForm');
    const passwordLengthInput = document.getElementById('passwordLength');
    const passwordResultDiv = document.getElementById('passwordResult');

    const cipherForm = document.getElementById('cipherForm');
    const textToEncryptInput = document.getElementById('textToEncrypt');
    const shiftInput = document.getElementById('shift');
    const encryptResultDiv = document.getElementById('encryptResult');

    const decryptForm = document.getElementById('decryptForm');
    const textToDecryptInput = document.getElementById('textToDecrypt');
    const shiftDecryptInput = document.getElementById('shiftDecrypt');
    const decryptResultDiv = document.getElementById('decryptResult');

    passwordForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const passwordLength = parseInt(passwordLengthInput.value, 10);
        console.log(`Submitting password form with length: ${passwordLength}`);

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ passwordLength })
            });

            console.log('Password generation request sent');

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Password generation response received:', data);

            const { password } = data;

            // Tampilkan hasil password di dalam div
            passwordResultDiv.innerHTML = `
                <p><strong>Generated Password:</strong> ${password}</p>
            `;
        } catch (error) {
            console.error('Error:', error);
            // Tangani error jika terjadi
            passwordResultDiv.textContent = 'Error fetching data';
        }
    });

    cipherForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const textToEncrypt = textToEncryptInput.value;
        const shift = parseInt(shiftInput.value, 10);
        console.log(`Submitting encryption form with text: ${textToEncrypt} and shift: ${shift}`);

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ textToEncrypt, shift })
            });

            console.log('Encryption request sent');

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Encryption response received:', data);

            const { encryptedText } = data;

            // Tampilkan hasil enkripsi di dalam div
            encryptResultDiv.innerHTML = `
                <p><strong>Encrypted Text:</strong> ${encryptedText}</p>
            `;
        } catch (error) {
            console.error('Error:', error);
            // Tangani error jika terjadi
            encryptResultDiv.textContent = 'Error fetching data';
        }
    });

    decryptForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const textToDecrypt = textToDecryptInput.value;
        const shiftDecrypt = parseInt(shiftDecryptInput.value, 10);
        console.log(`Submitting decryption form with text: ${textToDecrypt} and shift: ${shiftDecrypt}`);

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ textToDecrypt, shift: shiftDecrypt })
            });

            console.log('Decryption request sent');

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Decryption response received:', data);

            const { decryptedText } = data;

            // Tampilkan hasil dekripsi di dalam div
            decryptResultDiv.innerHTML = `
                <p><strong>Decrypted Text:</strong> ${decryptedText}</p>
            `;
        } catch (error) {
            console.error('Error:', error);
            // Tangani error jika terjadi
            decryptResultDiv.textContent = 'Error fetching data';
        }
    });
});
