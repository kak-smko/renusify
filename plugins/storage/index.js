class Storage {
  constructor(encryptionKey) {
    this._key = encryptionKey || this._loadKeyFromEnv();
    this._available = this._checkAvailability();
    if (!this._key) {
      console.warn('[Storage] ⚠️ No encryption key provided. Safe methods will throw.');
    }
  }

  _loadKeyFromEnv() {
    if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_STORAGE_KEY)
      return import.meta.env.VITE_STORAGE_KEY;
    if (typeof process !== 'undefined' && process.env?.STORAGE_KEY)
      return process.env.STORAGE_KEY;
    return null;
  }

  _checkAvailability() {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, '1');
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  _arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  }

  _base64ToArrayBuffer(base64) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes.buffer;
  }

  async _deriveKey(password, salt) {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
        'raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']
    );
    return crypto.subtle.deriveKey(
        {name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256'},
        keyMaterial,
        {name: 'AES-GCM', length: 256},
        false,
        ['encrypt', 'decrypt']
    );
  }

  async _encrypt(plaintext) {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await this._deriveKey(this._key, salt);
    const cipher = await crypto.subtle.encrypt(
        {name: 'AES-GCM', iv}, key, new TextEncoder().encode(plaintext)
    );
    return JSON.stringify({
      salt: this._arrayBufferToBase64(salt),
      iv: this._arrayBufferToBase64(iv),
      data: this._arrayBufferToBase64(cipher)
    });
  }

  async _decrypt(payloadString) {
    const {salt, iv, data} = JSON.parse(payloadString);
    const key = await this._deriveKey(this._key, this._base64ToArrayBuffer(salt));
    const decrypted = await crypto.subtle.decrypt(
        {name: 'AES-GCM', iv: this._base64ToArrayBuffer(iv)},
        key,
        this._base64ToArrayBuffer(data)
    );
    return new TextDecoder().decode(decrypted);
  }

  stringify(value) {
    return JSON.stringify(value);
  }

  parse(value) {
    return JSON.parse(value);
  }

  set(key, value) {
    if (!this._available) return false;
    try {
      localStorage.setItem(String(key), this.stringify(value));
      return true;
    } catch (err) {
      console.error(`[Storage] set failed:`, err);
      return false;
    }
  }

  has(key) {
    if (!this._available) return false;
    return localStorage.getItem(String(key)) !== null;
  }

  get(key, def = null) {
    if (!this._available) return def;
    const raw = localStorage.getItem(String(key));
    if (raw === null) return def;
    try {
      return this.parse(raw);
    } catch {
      return def;
    }
  }

  remove(key) {
    if (!this._available) return false;
    localStorage.removeItem(String(key));
    return true;
  }

  pull(key, def = null) {
    const data = this.get(key, def);
    this.remove(key);
    return data;
  }

  async setSafe(key, value) {
    if (!this._key) throw new Error('[Storage] Encryption key not configured.');
    if (!this._available) return false;
    try {
      const plaintext = this.stringify(value);
      const encrypted = await this._encrypt(plaintext);
      localStorage.setItem(String(key), encrypted);
      return true;
    } catch (err) {
      console.error(`[Storage] setSafe failed:`, err);
      return false;
    }
  }

  async getSafe(key, def = null) {
    if (!this._key) throw new Error('[Storage] Encryption key not configured.');
    if (!this._available) return def;
    const raw = localStorage.getItem(String(key));
    if (raw === null) return def;
    try {
      const decrypted = await this._decrypt(raw);
      return this.parse(decrypted);
    } catch (err) {
      console.warn(`[Storage] getSafe failed (tampered/invalid):`, err);
      return def;
    }
  }

  async pullSafe(key, def = null) {
    const data = await this.getSafe(key, def);
    this.remove(key);
    return data;
  }
}

export default new Storage();