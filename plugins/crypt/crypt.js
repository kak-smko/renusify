import SimpleRng from "./random";

export default class Cryptor {
    constructor() {
        this.matrix = 32;
    }

    packUint32BE(value) {
        const bytes = new Uint8Array(4);
        bytes[0] = (value >> 24) & 0xFF;
        bytes[1] = (value >> 16) & 0xFF;
        bytes[2] = (value >> 8) & 0xFF;
        bytes[3] = value & 0xFF;
        return bytes;
    }

    unpackUint32BE(bytes, offset = 0) {
        return ((bytes[offset] << 24) |
            (bytes[offset + 1] << 16) |
            (bytes[offset + 2] << 8) |
            bytes[offset + 3]) >>> 0;
    }

    encrypt(data, key) {
        const matrixSize = this.matrix;
        const pad = (matrixSize - ((10 + data.length) % matrixSize)) % matrixSize;
        const keyBytes = this.generatePassword(matrixSize, this.stringToBytes(key));

        const dataSize = this.packUint32BE(data.length);

        const randomPrefix = this.getRandomBytes(6);
        const seedRandom = randomPrefix.reduce((sum, b) => sum + b, 0);

        const paddedText = new Uint8Array(10 + data.length + pad);
        paddedText.set(dataSize, 0);
        paddedText.set(randomPrefix, 4);
        paddedText.set(data, 10);

        if (pad > 0) {
            paddedText.fill(1, 10 + data.length, 10 + data.length + pad);
        }

        const seedSum = keyBytes.reduce((sum, b) => sum + b, 0);
        this.shuffle(paddedText, seedSum + seedRandom, 5);

        for (let i = 0; i < paddedText.length; i += matrixSize) {
            const end = Math.min(i + matrixSize, paddedText.length);
            const seed = (i + matrixSize < paddedText.length) ? paddedText[i + matrixSize] : keyBytes[0];
            const chunkCopy = new Uint8Array(paddedText.slice(i, end));
            this.shuffle(chunkCopy, seed + seedRandom, 2);
            paddedText.set(chunkCopy, i);
        }

        this.mix(matrixSize, paddedText, keyBytes);

        const result = new Uint8Array(paddedText.length + 2);
        result.set(paddedText, 0);
        result[paddedText.length] = (seedRandom >> 8) & 0xFF;
        result[paddedText.length + 1] = seedRandom & 0xFF;

        return result;
    }

    encryptText(text, key) {
        const data = this.stringToBytes(text);
        const encrypted = this.encrypt(data, key);
        return this.base64UrlEncode(encrypted);
    }

    decrypt(encoded, key) {
        if (encoded.length < 8) {
            throw new Error('Invalid Token Matrix Length.');
        }

        const seedRandom = (encoded[encoded.length - 2] << 8) | encoded[encoded.length - 1];
        const decoded = new Uint8Array(encoded.slice(0, -2));
        const matrixSize = this.matrix;

        const keyBytes = this.generatePassword(matrixSize, this.stringToBytes(key));
        this.unmix(matrixSize, decoded, keyBytes);

        for (let i = Math.floor(decoded.length / matrixSize) * matrixSize; i >= 0; i -= matrixSize) {
            const end = Math.min(i + matrixSize, decoded.length);
            const seed = (i + matrixSize < decoded.length) ? decoded[i + matrixSize] : keyBytes[0];
            const chunkCopy = new Uint8Array(decoded.slice(i, end));
            this.unshuffle(chunkCopy, seed + seedRandom, 2);
            decoded.set(chunkCopy, i);
        }

        const seedSum = keyBytes.reduce((sum, b) => sum + b, 0);
        this.unshuffle(decoded, seedSum + seedRandom, 5);

        const dataSize = this.unpackUint32BE(decoded, 0);

        if (decoded.length < dataSize + 10) {
            throw new Error('Invalid Token Matrix Length');
        }

        return decoded.slice(10, 10 + dataSize);
    }

    decryptText(encoded, key) {
        const padding = encoded.length % 4;
        const paddedInput = padding === 0 ? encoded : encoded + '='.repeat(4 - padding);

        const data = this.base64UrlDecode(paddedInput);
        const decrypted = this.decrypt(data, key);
        return this.bytesToString(decrypted);
    }

    setMatrix(size) {
        if (size > 0) {
            this.matrix = size;
        }
    }

    generatePassword(matrix, password) {
        const result = new Uint8Array(matrix);
        const passwordLen = password.length;

        if (passwordLen === 0) {
            return result;
        }

        const repeats = Math.floor(matrix / passwordLen);
        const remainder = matrix % passwordLen;

        for (let i = 0; i < repeats; i++) {
            const start = i * passwordLen;
            result.set(password, start);
        }

        if (remainder > 0) {
            const start = repeats * passwordLen;
            result.set(password.slice(0, remainder), start);
        }

        return result;
    }

    shuffle(data, seed, step) {
        const rng = new SimpleRng(seed);
        const length = data.length;

        for (let i = length - 1; i > 0; i -= step) {
            const j = Math.floor(rng.genRange(0, i));
            [data[i], data[j]] = [data[j], data[i]];
        }
    }

    unshuffle(data, seed, step) {
        const rng = new SimpleRng(seed);
        const length = data.length;
        const swaps = [];

        for (let i = length - 1; i > 0; i -= step) {
            const j = Math.floor(rng.genRange(0, i));
            swaps.push([i, j]);
        }

        for (let k = swaps.length - 1; k >= 0; k--) {
            const [i, j] = swaps[k];
            [data[i], data[j]] = [data[j], data[i]];
        }
    }

    mix(blockSize, buf, key) {
        let prevBlock = new Uint8Array(key);

        for (let i = 0; i < buf.length; i += blockSize) {
            const blockEnd = Math.min(i + blockSize, buf.length);
            for (let j = 0; j < blockEnd - i && j < prevBlock.length; j++) {
                buf[i + j] ^= prevBlock[j];
            }
            prevBlock = new Uint8Array(buf.slice(i, blockEnd));
        }
    }

    unmix(blockSize, buf, key) {
        const blocks = [];
        for (let i = 0; i < buf.length; i += blockSize) {
            const end = Math.min(i + blockSize, buf.length);
            blocks.push(new Uint8Array(buf.slice(i, end)));
        }

        for (let i = blocks.length - 1; i >= 0; i--) {
            if (i === 0) {
                for (let j = 0; j < blocks[i].length && j < key.length; j++) {
                    blocks[i][j] ^= key[j];
                }
            } else {
                for (let j = 0; j < blocks[i].length && j < blocks[i - 1].length; j++) {
                    blocks[i][j] ^= blocks[i - 1][j];
                }
            }
        }

        let offset = 0;
        for (const block of blocks) {
            buf.set(block, offset);
            offset += block.length;
        }
    }

    getRandomBytes(length) {
        const rng = new SimpleRng(Date.now());
        return rng.getRandomBytes(length);
    }

    base64UrlEncode(data) {
        if (typeof Buffer !== 'undefined') {
            // Node.js
            return Buffer.from(data)
                .toString('base64')
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=+$/, '');
        } else {
            // Browser
            let binary = '';
            for (let i = 0; i < data.length; i++) {
                binary += String.fromCharCode(data[i]);
            }
            return btoa(binary)
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=+$/, '');
        }
    }

    base64UrlDecode(encoded) {
        let padded = encoded;
        const padding = encoded.length % 4;
        if (padding !== 0) {
            padded += '='.repeat(4 - padding);
        }
        const base64 = padded.replace(/-/g, '+').replace(/_/g, '/');

        if (typeof Buffer !== 'undefined') {
            // Node.js
            return new Uint8Array(Buffer.from(base64, 'base64'));
        } else {
            // Browser
            const binary = atob(base64);
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) {
                bytes[i] = binary.charCodeAt(i);
            }
            return bytes;
        }
    }

    stringToBytes(str) {
        if (typeof TextEncoder !== 'undefined') {
            return new TextEncoder().encode(str);
        }
        if (typeof Buffer !== 'undefined') {
            return new Uint8Array(Buffer.from(str, 'utf-8'));
        }
        const bytes = new Uint8Array(str.length);
        for (let i = 0; i < str.length; i++) {
            bytes[i] = str.charCodeAt(i) & 0xFF;
        }
        return bytes;
    }

    bytesToString(bytes) {
        if (typeof TextDecoder !== 'undefined') {
            return new TextDecoder('utf-8').decode(bytes);
        }
        if (typeof Buffer !== 'undefined') {
            return Buffer.from(bytes).toString('utf-8');
        }

        let str = '';
        for (let i = 0; i < bytes.length; i++) {
            str += String.fromCharCode(bytes[i]);
        }
        return str;
    }
}
