export default class SimpleRng {
    constructor(seed) {
        this.state = BigInt(seed) & 0xFFFFFFFFFFFFFFFFn;
    }

    static newWithTimeSeed() {
        return new SimpleRng(Date.now());
    }

    nextU32() {
        this.state = (this.state * 6364136223846793005n + 1442695040888963407n) & 0xFFFFFFFFFFFFFFFFn;
        return Number((this.state >> 32n) & 0xFFFFFFFFn);
    }

    nextU64() {
        const high = this.nextU32();
        const low = this.nextU32();
        return (high << 32) | low;
    }

    nextF64() {
        const val = this.nextU32();
        return val / 4294967295.0;
    }

    genRange(low, high) {
        return low + (high - low) * this.nextF64();
    }

    getRandomBytes(length) {
        const byteArray = new Uint8Array(length);
        const chunks = Math.floor(length / 4);
        const remainder = length % 4;

        for (let i = 0; i < chunks; i++) {
            const random = this.nextU32();
            byteArray[i * 4] = random & 0xFF;
            byteArray[i * 4 + 1] = (random >> 8) & 0xFF;
            byteArray[i * 4 + 2] = (random >> 16) & 0xFF;
            byteArray[i * 4 + 3] = (random >> 24) & 0xFF;
        }

        if (remainder > 0) {
            const random = this.nextU32();
            for (let i = 0; i < remainder; i++) {
                byteArray[chunks * 4 + i] = (random >> (i * 8)) & 0xFF;
            }
        }

        return byteArray;
    }
}