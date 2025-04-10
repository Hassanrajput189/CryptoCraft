import React, { useState } from "react";

const Cryptography = () => {
  const [text, setText] = useState("");
  const [shift, setShift] = useState(3);
  const [tech, setTech] = useState("encryption");
  const [method, setMethod] = useState("caesar");
  const [scytaleKey, setScytaleKey] = useState(3);
  const [output, setOutput] = useState("");

  // 🔹 Caesar Cipher
  
  const caesarCipher =(str, shift, encrypt = true)=> {
    return str
      .split("")
      .map((char) => {
        if (char.match(/[a-z]/i)) {
          let start = char === char.toUpperCase() ? 65 : 97;
          let offset = encrypt ? shift : -shift;
          return String.fromCharCode(
            ((char.charCodeAt(0) - start + offset + 26) % 26) + start
          );
        }
        return char;
      })
      .join("");
  }

  // 🔹 Atbash Cipher
  const atbashCipher = (str)=> {
    return str
      .split("")
      .map((char) => {
        if (char.match(/[a-z]/i)) {
          let start = char === char.toUpperCase() ? 65 : 97;
          return String.fromCharCode(
            start + (25 - (char.charCodeAt(0) - start))
          );
        }
        return char;
      })
      .join("");
  }

  // 🔹 Polybius Square Cipher
  const polybiusSquare = {
    A: "11", B: "12", C: "13", D: "14", E: "15",
    F: "21", G: "22", H: "23", I: "24", J: "24",
    K: "25", L: "31", M: "32", N: "33", O: "34",
    P: "35", Q: "41", R: "42", S: "43", T: "44",
    U: "45", V: "51", W: "52", X: "53", Y: "54",
    Z: "55",
  };

  const polybiusEncrypt=(str)=> {
    return str
      .toUpperCase()
      .split("")
      .map((char) => polybiusSquare[char] || char)
      .join(" ");
  }

  const polybiusDecrypt=(code)=> {
    const reverseSquare = Object.fromEntries(
      Object.entries(polybiusSquare).map(([key, value]) => [value, key])
    );
    return code
      .split(" ")
      .map((num) => reverseSquare[num] || " ")
      .join("");
  }

  // 🔹 Scytale Cipher Encryption
  const scytaleEncrypt=(str, key)=> {
    let paddedStr = str.padEnd(Math.ceil(str.length / key) * key, "X");
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
  const scytaleDecrypt=(str, key) => {
    let rows = Math.ceil(str.length / key);
    let decryptedText = new Array(str.length);
    let index = 0;

    for (let i = 0; i < key; i++) {
      for (let j = i; j < str.length; j += key) {
        decryptedText[j] = str[index++];
      }
    }
    return decryptedText.join("");
  }

  const refresh = () => {
    setText("");
    setOutput("");
  };

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
      case "atbash":
        setOutput(atbashCipher(text));
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Encryption Methods</h2>
            <div className="space-y-3">
              <button
                onClick={() => setMethod("caesar")}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                  method === "caesar"
                    ? "bg-blue-600 text-white shadow-lg transform scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Caesar Cipher
              </button>
              <button
                onClick={() => setMethod("atbash")}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                  method === "atbash"
                    ? "bg-blue-600 text-white shadow-lg transform scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Atbash Cipher
              </button>
              <button
                onClick={() => setMethod("polybius")}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                  method === "polybius"
                    ? "bg-blue-600 text-white shadow-lg transform scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Polybius Square
              </button>
              <button
                onClick={() => setMethod("scytale")}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                  method === "scytale"
                    ? "bg-blue-600 text-white shadow-lg transform scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Scytale Cipher
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Input</h2>
              <textarea
                className="w-full h-40 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your text here..."
              />
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
              <select
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={tech}
                onChange={(e) => setTech(e.target.value)}
              >
                <option value="encryption">Encryption</option>
                <option value="decryption">Decryption</option>
              </select>

              {method === "caesar" && (
                <input
                  type="number"
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={shift}
                  onChange={(e) => setShift(Number(e.target.value))}
                  placeholder="Shift Value"
                />
              )}

              {method === "scytale" && (
                <input
                  type="number"
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={scytaleKey}
                  onChange={(e) => setScytaleKey(Number(e.target.value))}
                  placeholder="Scytale Key"
                />
              )}
            </div>

            <div className="flex gap-4 mb-6">
              {tech === "encryption" ? (
                <button
                  onClick={handleEncrypt}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
                >
                  Encrypt
                </button>
              ) : (
                <button
                  onClick={handleDecrypt}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
                >
                  Decrypt
                </button>
              )}
              <button
                onClick={refresh}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-300"
              >
                Clear
              </button>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4 text-gray-800">Output</h2>
              <textarea
                className="w-full h-40 p-4 bg-gray-50 border border-gray-200 rounded-lg resize-none"
                value={output}
                readOnly
                placeholder="Output will appear here..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cryptography;
