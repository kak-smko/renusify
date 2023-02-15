export function clearProxy(obj) {
    return JSON.parse(JSON.stringify(typeof obj === 'object' ? obj : {}))
}

export function copy(text, msg = null) {
    function copyTextToClipboard(text) {
        var textArea = document.createElement('textarea')
        textArea.value = text

        // Avoid scrolling to bottom
        textArea.style.top = '0'
        textArea.style.left = '0'
        textArea.style.position = 'fixed'

        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()

        try {
            var successful = document.execCommand('copy')
            var msg = successful ? 'successful' : 'unsuccessful'
            console.log('helper copy: Copying text command was ' + msg)
        } catch (err) {
            console.error('helper copy: unable to copy', err)
        }

        document.body.removeChild(textArea)
    }

    if (!navigator.clipboard) {
        copyTextToClipboard(JSON.stringify(text))
        return
    }

    navigator.clipboard.writeText(text).then(function () {
        window.app.$toast(msg || window.app.$t('copy_text_to_clipboard', 'renusify'), {type: 'success'})
    }, function () {
        window.app.$toast(window.app.$t('text_not_copied!', 'renusify'), {type: 'error'})
    })
}

export function cleanXss(text) {
    text = htmlDecode(text)
    const el = document.createElement('div')
    el.innerHTML = text
    return cleanDom(el).innerHTML
}

export function cleanText(text) {
    text = htmlDecode(text)
    const el = document.createElement('div')
    el.innerHTML = text
    return el.innerText
}

export function cleanDom(html, blockTag = ['script'], allowAttrs = ['class', 'id', 'href', 'src', 'target', 'width', 'height', 'controls']) {
    if (blockTag.includes(html.tagName)) {
        return document.createElement('div')
    }
    const el = document.createElement(html.tagName)
    el.innerHTML = html.innerHTML
    for (let i in allowAttrs) {
        if (html.getAttribute(allowAttrs[i])) {
            el.setAttribute(allowAttrs[i], html.getAttribute(allowAttrs[i]))
        }
    }
    for (let i in el.children) {
        if (hasKey(el.children, i)) {
            let dom = cleanDom(el.children[i], blockTag, allowAttrs)
            el.replaceChild(dom, el.children[i])
        }
    }
    return el
}

export function hasKey(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}

export function uniqArray(a) {
    var prims = {boolean: {}, number: {}, string: {}};
    var objs = [];

    return a.filter(function (item) {
        var type = typeof item;
        if (type in prims) {
            return hasKey(prims[type], item) ? false : (prims[type][item] = true);
        } else {
            const k = Object.keys(item)[0]
            if (searchArray(objs, k, item[k]) !== false) {
                return false
            } else {
                return objs.push(item)
            }
        }
    });
}

export const isMobile = (() => {
    const userAgentInfo = navigator.userAgent.toLowerCase();
    const agents = ['Android', 'iPhone',
        'SymbianOS', 'Windows Phone',
        'iPad', 'iPod'];
    let flag = false;
    const lng = agents.length
    for (let v = 0; v < lng; v++) {
        if (userAgentInfo.indexOf(agents[v].toLowerCase()) > 0) {
            flag = true;
            break;
        }
    }
    return flag;
})();

export function isArray(input) {
    if (Array.prototype.isArray) {
        return Array.isArray(input);
    }
    return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
}

export function keys(o) {
    return Object.keys(o);
}

export function searchArray(arr, key, value) {
    if (!arr) {
        return false
    }
    const lng = arr.length
    for (let i = 0; i < lng; i++) {
        if (arr[i][key] === value) {
            return i;
        }
    }
    return false;
}

export function replacer(string = null, find = ' ', replace = '-') {
    if (!string) {
        return string;
    }

    return string.toString().split(find).join(replace);
}

export function ifHas(object = null, rtrn = false, ...childs) {
    let o;
    if (!object) {
        return rtrn;
    }
    o = object;
    const lng = childs.length
    for (let i = 0; i < lng; i++) {
        if (o[childs[i]] === undefined || o[childs[i]] === null) {
            return rtrn;
        }
        o = o[childs[i]];
    }
    return o;
}

export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function limiter(string, length) {
    if (!string) {
        return '';
    }
    return string.length > length
        ? string.substring(0, length - 3) + '...'
        : string;
}

export function url() {
    return process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_production_URL : process.env.VUE_APP_API_URL;
}

export function cleanArray(actual) {
    const newArray = [];
    const lng = actual.length
    for (let i = 0; i < lng; i++) {
        if (actual[i]) {
            newArray.push(actual[i]);
        }
    }
    return newArray;
}

export function highlightSetup(text, highlight) {
    if (typeof text !== 'string' || typeof highlight !== 'string') {
        return text;
    }
    highlight = highlight.trim();
    if (highlight.length === 0) {
        return text;
    }
    let keywords = cleanArray(highlight.split(' '));
    keywords = keywords.join('|');
    return text.replace(new RegExp(keywords, 'gi'), '<span class="color-warning-text">$&</span>');
}

export function htmlEncode(str) {
    return str.replace(/[\u00A0-\u9999<>]/gim, function (i) {
        return '&#' + i.charCodeAt(0) + ';';
    });
}

export function decodeSingle(str) {
    if (typeof str !== 'string') {
        return null;
    }
    str = htmlEncode(str);
    const element = document.createElement('div');
    element.innerHTML = str;
    str = element.textContent;
    element.textContent = '';

    return str;
}

export function htmlDecode(text) {
    if (text === undefined || text === null) {
        return null;
    }
    if (typeof text === 'string') {
        return decodeSingle(text);
    } else if (isArray(text)) {
        const a = [];
        text.forEach((t) => {
            if (typeof t === 'string') {
                a.push(decodeSingle(t));
            } else {
                a.push(htmlDecode(t))
            }

        });
        return a;
    } else if (typeof text === 'object') {
        const a = {};
        for (let k in text) {
            if (hasKey(text, k)) {
                if (typeof text[k] === 'string') {
                    a[decodeSingle(k)] = decodeSingle(text[k])
                } else {
                    a[decodeSingle(k)] = htmlDecode(text[k])
                }

            }
        }
        return a;
    } else {
        return text;
    }
}

export function base64encode(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}

export function base64decode(str) {
    return decodeURIComponent(escape(window.atob(str)));
}

export function size(obj) {
    let size = 0;
    let key;
    for (key in obj) {
        if (hasKey(obj, key)) size++;
    }
    return size;
}

export function log(txt, type = 'log', on = 'development') {
    if (process.env.NODE_ENV === on) {
        if (type === 'log') {
            console.log(txt);
        } else if (type === 'warn') {
            console.warn(txt);
        } else if (type === 'error') {
            console.error(txt);
        }
    }
}

export function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    a.sort()
    b.sort()

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

export function hash(str, seed = 0) {
    str = str.toString()
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    const lng = str.length
    for (let i = 0, ch; i < lng; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

export function randomString(len, an) {
    an = an && an.toLowerCase();
    let str = "",
        i = 0,
        min = an === "a" ? 10 : 0,
        max = an === "n" ? 10 : 62;
    for (; i++ < len;) {
        const r = Math.random() * (max - min) + min << 0;
        str += String.fromCharCode(r += r > 9 ? r < 36 ? 55 : 61 : 48);
    }
    return str;
}

export function uniqueId(len = 24) {
    if (len < 10) {
        len = 10
    }
    let idStr = (Math.floor((Math.random() * 25)) + 10).toString(36);
    idStr += (new Date()).getTime().toString(36);
    for (let i = 0; idStr.length < len; i++) {
        idStr += (Math.floor((Math.random() * 35))).toString(36);
    }

    return (idStr);
}

export function trim(s, c) {
    if (c === "]") c = "\\]";
    if (c === "^") c = "\\^";
    if (c === "\\") c = "\\\\";
    return s.replace(new RegExp("^[" + c + "]+|[" + c + "]+$", "g"), "");
}

export function download(url, fileName = 'download', headers = null, percent = null) {
    const f = url.split(".");
    if (f[1]) {
        fileName += '.' + f[1]
    }

    function updateProgress(evt) {
        if (evt.lengthComputable) {
            percent((evt.loaded / evt.total) * 100);
        }
    }

    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onprogress = updateProgress;
    xhr.responseType = "blob";
    if (headers) {
        Object.keys(headers).forEach(function (key) {
            xhr.setRequestHeader(key, headers[key]);
        });
    }

    xhr.onload = function () {
        const urlCreator = window.URL || window.webkitURL;
        const imageUrl = urlCreator.createObjectURL(this.response);
        const tag = document.createElement("a");
        tag.href = imageUrl;
        tag.download = fileName;
        tag.click();
        tag.remove()
    };
    xhr.send();
}

export function setCookie(cname, cvalue, exsec) {
    const d = new Date();
    d.setTime(d.getTime() + (exsec * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}