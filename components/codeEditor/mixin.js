export default {
    methods: {
        pretty_html(text) {
            if (!text) {
                return ''
            }
            text = text.trim()
            text = text.replace(/ +(?= )/g, '');
            text = text.replace(/[\r|\n|\t]/g, '');
            let r = ''
            text = text.split('<')
            let numopen = 0
            text.forEach((line) => {
                if (line) {
                    const end = line.startsWith('/')
                    if (end) {
                        numopen -= 1
                    }
                    r += '\t'.repeat(numopen) + '<' + line + '\n'
                    if (!end) {
                        numopen += 1
                    }
                }
            })
            r = r.replace(/<([^/].*)>+[\r|\n|\t]+<\//g, '<$1></');
            return r
        },
        pretty_js(text) {
            if (!text) {
                return ''
            }
            text = text.trim()
            text = text.replace(/ +(?= )/g, '');
            text = text.replace(/[\r|\n|\t]/g, '');
            text = text.replace(/([,|;|{|(|\[])+[\s]/g, '$1');
            let r = ''
            text = text.split('')
            let numopen = 0
            const textLength = text.length
            let inBracket = 0
            let inprantez = 0
            for (let i = 0; i < textLength; i++) {
                const c = text[i]
                const last = i > 0 ? text[i - 1] : ''
                const next = i < textLength - 1 ? text[i + 1] : ''

                if (c === '(') {
                    inprantez += 1
                }
                if (c === ')') {
                    inprantez -= 1
                }
                if (c === '[') {
                    inBracket += 1
                }
                if (c === ']') {
                    inBracket -= 1
                }
                if (c === '}') {
                    numopen -= 1
                }
                if (numopen < 0) {
                    numopen = 0
                }
                r += c
                if (c === '}' && next !== ',' && next !== ';' && next !== '}' && next !== ')') {
                    r += '\n' + '\t'.repeat(numopen)
                }
                if (c === ',' && (!inprantez && !inBracket) && next !== '}') {
                    r += '\n' + '\t'.repeat(numopen)
                }
                if (c === ';' && next !== '}') {
                    r += '\n' + '\t'.repeat(numopen)
                }
                if (next === '}' && c !== '{' && numopen > 0) {

                    r += '\n' + '\t'.repeat(numopen - 1)
                }

                if (c === '{') {
                    numopen += 1
                    if (next !== '}') {
                        r += '\n' + '\t'.repeat(numopen)
                    }
                }
            }
            r = r.replace(/\t /g, '\t');
            r = r.replace(/^\s*\n/gm, '');
            return r
        },
        setTab(event) {
            if (event.key === "'" || event.key === '"' || event.key === '`') {
                const end = event.target.selectionEnd;
                event.preventDefault()
                document.execCommand('insertText', false, event.key.repeat(2));
                event.target.selectionEnd = end + 1;
                return false;
            }
            if (event.key === "{") {
                const end = event.target.selectionEnd;
                event.preventDefault()
                document.execCommand('insertText', false, '{}');
                event.target.selectionEnd = end + 1;
                return false;
            }
            if (event.key === "(") {
                const end = event.target.selectionEnd;
                event.preventDefault()
                document.execCommand('insertText', false, '()');
                event.target.selectionEnd = end + 1;
                return false;
            }
            if (event.key === "[") {
                const end = event.target.selectionEnd;
                event.preventDefault()
                document.execCommand('insertText', false, '[]');
                event.target.selectionEnd = end + 1;
                return false;
            }
            if (event.keyCode === 9) {
                event.preventDefault()
                document.execCommand('insertText', false, '\t');
                return false;
            }
            if (event.keyCode === 13) {
                event.preventDefault()
                let n = event.target.value.substr(0, event.target.selectionStart).split('\n')
                n = n[n.length - 1].split('\t')

                let w = ''
                for (let i = 0; i < n.length; i++) {
                    if (n[i] === '') {
                        w += '\t'
                    } else {
                        break
                    }
                }

                document.execCommand('insertText', false, '\n' + w);
                return false;
            }
            return true
        },
        re_quote(res) {
            let regex = /"([^"]*)"/g;
            res = res.replace(regex, '<span class="color-green code-editor-span">"$1"</span>');
            regex = /'([^']*)'/g;
            return res.replace(regex, "<span class=\"color-green code-editor-span\">'$1'</span>");
        },
        re_special(res, regex = /([{}\[\]])/g, color = "color-orange") {
            return res.replace(regex, '<span class="' + color + ' code-editor-span">$1</span>')
        },
        re_number(res) {
            return res.replace(/\b([0-9.]+)\b/g, '<span class="color-blue code-editor-span">$1</span>')
        },
        re_words(res, words) {
            words.forEach((word) => {
                res = res.replace(new RegExp("\\b(" + word + ")\\b", 'g'), '<span class="color-orange code-editor-span">$1</span>')
            })

            return res;
        },
        re_comment(res) {
            //eslint-disable-next-line
            let regex = /(\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*)$/gm;
            return res.replace(regex, '<span class="color-comment code-editor-span">$1</span>')
        },
        re_func(res) {
            //function like Date()
            let regex = /([$a-zA-Z-0-9_\s]+)(?=\()/g;
            res = res.replace(regex, '<span class="color-func2 code-editor-span">$1</span>')

            // Object keys
            regex = /([a-zA-Z-0-9_]+)(?=:)/g;
            res = res.replace(regex, '<span class="color-purple code-editor-span">$1</span>')


            //function like $r $d()
            regex = /(\$([a-zA-z0-9]*)[.|(])/g;
            res = res.replace(regex, '<span class="color-func code-editor-span">$1</span>')


            return res;
        },
    }
}
