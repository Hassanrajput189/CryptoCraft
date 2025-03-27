import React, { useState } from "react";

const Cryptography = () => {
    const [text, setText] = useState("");
    const [shift, setShift] = useState(3);
    const [method, setMethod] = useState("caesar");
    const [scytaleKey, setScytaleKey] = useState(3);
    const [output, setOutput] = useState("");

    // 🔹 Caesar Cipher
    function caesarCipher(str, shift, encrypt = true) {
        return str.split('').map(char => {
            if (char.match(/[a-z]/i)) {
                let start = char === char.toUpperCase() ? 65 : 97;
                let offset = encrypt ? shift : -shift;
                return String.fromCharCode(((char.charCodeAt(0) - start + offset + 26) % 26) + start);
            }
            return char;
        }).join('');
    }

    // 🔹 Atbash Cipher
    function atbashCipher(str) {
        return str.split('').map(char => {
            if (char.match(/[a-z]/i)) {
                let start = char === char.toUpperCase() ? 65 : 97;
                return String.fromCharCode(start + (25 - (char.charCodeAt(0) - start)));
            }
            return char;
        }).join('');
    }

    // 🔹 Polybius Square Cipher
    const polybiusSquare = {
        "A": "11", "B": "12", "C": "13", "D": "14", "E": "15",
        "F": "21", "G": "22", "H": "23", "I": "24", "J": "24", "K": "25",
        "L": "31", "M": "32", "N": "33", "O": "34", "P": "35",
        "Q": "41", "R": "42", "S": "43", "T": "44", "U": "45",
        "V": "51", "W": "52", "X": "53", "Y": "54", "Z": "55"
    };

    function polybiusEncrypt(str) {
        return str.toUpperCase().split('').map(char => polybiusSquare[char] || char).join(' ');
    }

    function polybiusDecrypt(code) {
        const reverseSquare = Object.fromEntries(Object.entries(polybiusSquare).map(([key, value]) => [value, key]));
        return code.split(' ').map(num => reverseSquare[num] || ' ').join('');
    }

    // 🔹 Scytale Cipher Encryption
    function scytaleEncrypt(str, key) {
        let paddedStr = str.padEnd(Math.ceil(str.length / key) * key, "X"); // Pad to fit the grid
        let columns = Math.ceil(paddedStr.length / key);
        let encryptedText = "";

        for (let i = 0; i < columns; i++) {
            for (let j = i; j < paddedStr.length; j += columns) {
                encryptedText += paddedStr[j];
            }
        }
        return encryptedText;
    }

    // 🔹 Scytale Cipher Decryption
    function scytaleDecrypt(str, key) {
        let rows = Math.ceil(str.length / key);
        let decryptedText = new Array(str.length);
        let index = 0;

        for (let i = 0; i < key; i++) {
            for (let j = i; j < str.length; j += key) {
                decryptedText[j] = str[index++];
            }
        }
        return decryptedText.join('');
    }

    // 🔹 Encrypt or Decrypt based on selection
    const handleEncrypt = () => {
        switch (method) {
            case "caesar":
                setOutput(caesarCipher(text, shift));
                break;
            case "atbash":
                setOutput(atbashCipher(text));
                break;
            case "polybius":
                setOutput(polybiusEncrypt(text));
                break;
            case "scytale":
                setOutput(scytaleEncrypt(text, scytaleKey));
                break;
            default:
                setOutput("Invalid Method");
        }
    };

    const handleDecrypt = () => {
        switch (method) {
            case "caesar":
                setOutput(caesarCipher(text, shift, false));
                break;
            case "polybius":
                setOutput(polybiusDecrypt(text));
                break;
            case "scytale":
                setOutput(scytaleDecrypt(text, scytaleKey));
                break;
            default:
                setOutput("Decryption not available for this method");
        }
    };

    return (
        <div>
            <select value={method} onChange={(e) => setMethod(e.target.value)}>
                <option value="caesar">Caesar Cipher</option>
                <option value="atbash">Atbash Cipher</option>
                <option value="polybius">Polybius Square</option>
                <option value="scytale">Scytale Cipher</option>
            </select>
            <br />
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text"
            />
            {method === "caesar" && (
                <input
                    type="number"
                    value={shift}
                    onChange={(e) => setShift(Number(e.target.value))}
                    placeholder="Shift"
                />
            )}
            {method === "scytale" && (
                <input
                    type="number"
                    value={scytaleKey}
                    onChange={(e) => setScytaleKey(Number(e.target.value))}
                    placeholder="Scytale Key (Columns)"
                />
            )}
            <br />
            <button onClick={handleEncrypt}>Encrypt</button>
            <button onClick={handleDecrypt}>Decrypt</button>
            <h3>Output: {output}</h3>
        </div>
    );
};

export default Cryptography;
