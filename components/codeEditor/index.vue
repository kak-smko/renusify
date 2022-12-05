<template>
    <div :class="`${$r.prefix}code-editor`">
        <div class="code-action text-right">
            <r-btn text @click.prevent="$helper.copy($refs.codeView.innerText)" class="image-copy" icon>
                <r-icon v-html="$r.icons.copy"></r-icon>
            </r-btn>
            <r-btn v-if="show==='code'&&runnable" text @click="show='run'">
                run
                <r-icon v-html="$r.icons.play" exact></r-icon>
            </r-btn>
            <r-btn v-if="show==='run'" text @click="show='code'">
                <r-icon v-html="$r.icons.code_tags" exact></r-icon>
            </r-btn>
        </div>
        <div v-show="false" ref="codeSlot">
            <slot></slot>
        </div>
        <div v-if="show==='run'&&runnable" class="code-compile">
            <r-code-editor-run :template="template" :script="script" :style="style"></r-code-editor-run>
        </div>
        <div v-show="show!=='run'" ref="codeView" class="code-wrapper">
            <div v-show="template">
                <span class="color-green" v-if="runnable">&lt;template&gt;</span>
                <div ref="codeViewTemplate" :contenteditable="runnable" @input="rebuild" class="code-template"></div>
                <span class="color-green" v-if="runnable">&lt;/template&gt;</span>
                <br>
            </div>
            <div v-show="script">
                <span class="color-orange" v-if="runnable">&lt;script&gt;
            <br>
            export default {</span>
                <div ref="codeViewScript" :contenteditable="runnable" @input="rebuild" class="code-script"></div>
                <span class="color-orange" v-if="runnable">}<br>&lt;script&gt;</span>
            </div>
            <div v-show="style">
                <span class="color-orange" v-if="runnable">&lt;style&gt;</span>
                <div ref="codeViewStyle"  :contenteditable="runnable" @input="rebuild" class="code-style"></div>
                <span class="color-orange" v-if="runnable">&lt;/style&gt;</span>
            </div>
        </div>
    </div>
</template>
<script>
    import RCodeEditorRun from "./run";

    export default {
        name: 'r-code-editor',
        components: {RCodeEditorRun},
        props: {
            runnable: Boolean
        },
        data() {
            return {
                show: 'code',
                code: '',
                edited: false,
                template: null,
                script: null,
                style: null,
            }
        },
        created(){
          if(!this.$r.icons.play){
              this.$r.icons.play = '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M8 5.14v14l11-7l-11-7Z"/></svg>'
          }
          if(!this.$r.icons.code_tags){
            this.$r.icons.code_tags = '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="m14.6 16.6l4.6-4.6l-4.6-4.6L16 6l6 6l-6 6l-1.4-1.4m-5.2 0L4.8 12l4.6-4.6L8 6l-6 6l6 6l1.4-1.4Z"/></svg>'
          }
        },
        mounted() {
            this.get_code('codeSlot', this.runnable)
        },
        beforeUpdate() {
            if (this.show === 'code' && !this.edited) {
                this.get_code('codeSlot', this.runnable)
            }
        },
        methods: {
            node_walk(node, func) {
                let result = func(node);
                for (node = node.firstChild; result !== false && node; node = node.nextSibling)
                    result = this.node_walk(node, func);
                return result;
            },
            getCaretPosition(elem) {
                var sel = window.getSelection();
                var cum_length = [0, 0];

                if (sel.anchorNode == elem)
                    cum_length = [sel.anchorOffset, sel.extentOffset];
                else {
                    var nodes_to_find = [sel.anchorNode, sel.extentNode];
                    if (!elem.contains(sel.anchorNode) || !elem.contains(sel.extentNode))
                        return undefined;
                    else {
                        var found = [0, 0];
                        var i;
                        this.node_walk(elem, function (node) {
                            for (i = 0; i < 2; i++) {
                                if (node == nodes_to_find[i]) {
                                    found[i] = true;
                                    if (found[i == 0 ? 1 : 0])
                                        return false; // all done
                                }
                            }

                            if (node.textContent && !node.firstChild) {
                                for (i = 0; i < 2; i++) {
                                    if (!found[i])
                                        cum_length[i] += node.textContent.length;
                                }
                            }
                        });
                        cum_length[0] += sel.anchorOffset;
                        cum_length[1] += sel.extentOffset;
                    }
                }
                if (cum_length[0] <= cum_length[1])
                    return cum_length;
                return [cum_length[1], cum_length[0]];
            },
            createRange(node, chars, range) {
                if (!range) {
                    range = document.createRange()
                    range.selectNode(node);
                    range.setStart(node, 0);
                }

                if (chars.count === 0) {
                    range.setEnd(node, chars.count);
                } else if (node && chars.count > 0) {
                    if (node.nodeType === Node.TEXT_NODE) {
                        if (node.textContent.length < chars.count) {
                            chars.count -= node.textContent.length;
                        } else {
                            range.setEnd(node, chars.count);
                            chars.count = 0;
                        }
                    } else {
                        const lng=node.childNodes.length
                        for (var lp = 0; lp < lng; lp++) {
                            range = this.createRange(node.childNodes[lp], chars, range);

                            if (chars.count === 0) {
                                break;
                            }
                        }
                    }
                }

                return range;
            },
            rebuild(e) {
                this.edited = true
                const pos = this.getCaretPosition(this.$refs.codeView)
                let spans = this.$refs.codeView.querySelectorAll('.code-editor-span')
                if (spans) {
                    const lng=spans.length
                    for (let i = lng - 1; i >= 0; i--) {
                        let b = document.createDocumentFragment();
                        let res = this.$helper.replacer(spans[i].innerHTML, '&lt;', '<')
                        res = this.$helper.replacer(res, '&gt;', '>')
                        b.append(res)
                        spans[i].parentNode.replaceChild(b, spans[i]);
                    }
                }
                this.get_code('codeView')
                var selection = window.getSelection();
                let range = this.createRange(this.$refs.codeView, {count: pos[0] + (e.inputType === 'insertParagraph' ? 1 : 0)});
                if (range) {
                    range.collapse(false);
                    selection.removeAllRanges();
                    selection.addRange(range);
                }

            },
            toHTML(htmlString) {
                var div = document.createElement('div');
                div.innerHTML = htmlString.trim();
                return div
            },
            get_code(slot = 'codeSlot') {
                if (!this.$refs[slot]) {
                    setTimeout(() => {
                        this.get_code(slot)
                    }, 100)
                    return
                }

                this.code = this.toHTML(this.$refs[slot].innerHTML)
                this.template = this.code.querySelector('.code-template')
                if (this.template) {
                    this.template = this.template.innerHTML
                }
                this.script = this.code.querySelector('.code-script')
                if (this.script) {
                    this.script = this.script.innerText.trim()
                }

                this.style = this.code.querySelector('.code-style')
                if (this.style) {
                    this.style = this.style.innerText
                }

                if (this.template || this.script || this.style) {
                    this.$refs.codeViewTemplate.innerHTML = this.buildHtml()
                    this.$refs.codeViewScript.innerHTML = this.buildScript()
                    this.$refs.codeViewStyle.innerHTML = this.buildStyle()
                } else {
                    this.$refs.codeView.innerHTML = this.$refs[slot].innerHTML
                }
            },
            strToObj(str) {
                str = this.$helper.replacer(str, ' ', '')
                str = this.$helper.replacer(str, "\n", '')
                str = this.$helper.replacer(str, "\r", '')
                let open = 0
                let pre = 0
                let to = 0
                let items = []
                const s = str
                s.split('').forEach((c, i) => {
                    to++
                    if (c === '{') {
                        open++
                    }
                    if (c === '}') {
                        open--
                    }
                    if (open === 0 && c === ',') {
                        let new_str = str.substr(pre, to - 1)
                        const o = new_str.indexOf(':')
                        const f = new_str.indexOf('(')
                        if ((f > 0 && f < o) || o < 0) {
                            new_str = new_str.substr(0, f)
                        } else {
                            new_str = new_str.substr(0, o)
                        }
                        items.push(new_str)
                        pre = i + 1
                        to = 0
                    }
                })
                let new_str = str.substr(pre, str.length)
                const o = new_str.indexOf(':')
                const f = new_str.indexOf('(')
                if ((f > 0 && f < o) || o < 0) {
                    new_str = new_str.substr(0, f)
                } else {
                    new_str = new_str.substr(0, o)
                }
                items.push(new_str)
                return items
            },
            buildStyle() {
                if (!this.style) {
                    return ''
                }
                let data = this.style.split('')
                let res = ''
                let in_quta = false
                data.forEach((c, i) => {
                    if (c === '=') {
                        res += '<span class="color-blue code-editor-span">=</span>'
                    } else if ((c === '"' || c === "'") && !in_quta) {
                        in_quta = c
                        res += '<span class="color-green code-editor-span">' + c
                    } else if (c === in_quta) {
                        in_quta = false
                        res += c + '</span>'
                    } else {
                        res += c
                    }
                })
                let regex = /[\s]([.]|[#]|[:])[a-zA-Z0-9_-]+/g
                let matched = res.matchAll(regex)
                for (const match of matched) {
                    res = this.$helper.replacer(res, match[0], '<span class="color-orange code-editor-span">' + match[0] + '</span>')
                }

                regex = /:(.*?)+;/g
                matched = res.matchAll(regex)
                for (const match of matched) {
                    res = this.$helper.replacer(res, match[0], '<span class="color-blue code-editor-span">' + match[0] + '</span>')
                }
                 res = this.$helper.replacer(res, '!important', '<span class="color-orange code-editor-span">!important</span>')
                res = this.re_comment(res)
                res = this.re_func(res)

                return res
            },
            buildHtml() {
                if (!this.template) {
                    return ''
                }
                let data = this.template.split('')
                let res = ''
                let in_quta = false
                data.forEach((c, i) => {
                    if (c === '=') {
                        res += '<span class="color-blue code-editor-span">=</span>'
                    } else if ((c === '"' || c === "'") && !in_quta) {
                        in_quta = c
                        res += '<span class="color-green code-editor-span">' + c
                    } else if (c === in_quta) {
                        in_quta = false
                        res += c + '</span>'
                    } else {
                        res += c
                    }
                })

                res = this.$helper.replacer(res, '(!', '<span class="color-orange code-editor-span">&lt;')
                res = this.$helper.replacer(res, '!)', '&gt;</span>')
                res = this.$helper.replacer(res, '[!', '<span class="color-blue code-editor-span">{{')
                res = this.$helper.replacer(res, '!]', '}}</span>')
                let regex = /\+(.*?)\+/g
                let matched = res.matchAll(regex)
                for (const match of matched) {
                    res = this.$helper.replacer(res, match[0], '<span class="color-blue code-editor-span">' + match[0] + '</span>')
                }

                res = this.re_words(res)
                res = this.re_comment(res)
                res = this.re_func(res)

                return res
            },
            buildScript() {
                if (!this.script) {
                    return ''
                }
                let data = this.script.split('')
                let str = this.script.trim()
                if (str.substr(0, 1) === '{') {
                    str = str.substr(1, str.length - 2)
                }
                let res = ''

                let in_quta = false
                data.forEach((c, i) => {
                    if (['=', '&', '{', '}', '<', '>'].includes(c)) {
                        res += '<span class="color-blue code-editor-span">' + c + '</span>'
                    } else if ([',', ';', ':'].includes(c)) {
                        res += '<span class="color-orange code-editor-span">' + c + '</span>'
                    } else if (parseInt(c) > -1) {
                        res += '<span class="color-number code-editor-span">' + c + '</span>'
                    } else if ((c === '"' || c === "'" || c === "`") && !in_quta) {
                        in_quta = c
                        res += '<span class="color-green code-editor-span">' + c
                    } else if (c === in_quta) {
                        in_quta = false
                        res += c + '</span>'
                    } else {
                        res += c
                    }
                })

                res = this.re_words(res)
                res = this.re_comment(res)
                res = this.re_func(res)

                // main function vuejs methods created ,...
                this.strToObj(str).forEach((item) => {
                    res = this.$helper.replacer(res, item, ' <span class="color-func code-editor-span">' + item + '</span>')
                })

                return res
            },
            re_words(res) {
                res = this.$helper.replacer(res, 'import ', '<span class="color-orange code-editor-span">import</span> ')
                res = this.$helper.replacer(res, ' from ', ' <span class="color-orange code-editor-span">from</span> ')
                res = this.$helper.replacer(res, ' window.', ' <span class="color-orange code-editor-span">window</span>.')
                res = this.$helper.replacer(res, ' new ', ' <span class="color-orange code-editor-span">new</span> ')
                res = this.$helper.replacer(res, ' var ', ' <span class="color-orange code-editor-span">var</span> ')
                res = this.$helper.replacer(res, ' let ', ' <span class="color-orange code-editor-span">let</span> ')
                res = this.$helper.replacer(res, ' const ', ' <span class="color-orange code-editor-span">const</span> ')
                res = this.$helper.replacer(res, ' return ', ' <span class="color-orange code-editor-span">return</span> ')
                res = this.$helper.replacer(res, ' this.', ' <span class="color-orange code-editor-span">this</span>.')

                return res
            },
            re_comment(res) {
                let regex = /(\/\*[\w\'\s\r\n\*]*\*\/)|(\/\/[\w\s\']*)|(\<![\-\-\s\w\>\/]*\>)/g
                let matched = res.matchAll(regex)
                for (const match of matched) {
                    res = this.$helper.replacer(res, match[0], '<span class="color-comment code-editor-span">' + match[0] + '</span>')
                }
                return res
            },
            re_func(res) {
                //function like Date()
                let regex = /([a-zA-Z_{1}][a-zA-Z0-9_]+)[ ]{0,1}(?=\()/g
                let matched = res.matchAll(regex)
                for (const match of matched) {
                    res = this.$helper.replacer(res, match[0], '<span class="color-func2 code-editor-span">' + match[0] + '</span>')
                }

                //function like $r $d()
                regex = /(\$([a-zA-z0-9]*)[.|(])/g
                matched = res.matchAll(regex)
                for (const match of matched) {
                    res = this.$helper.replacer(res, match[0].substr(0, match[0].length - 1), '<span class="color-func code-editor-span">' + match[0].substr(0, match[0].length - 1) + '</span>')
                }
                res = this.$helper.replacer(res, '(', '<span class="color-func2 code-editor-span">(</span>')
                res = this.$helper.replacer(res, ')', '<span class="color-func2 code-editor-span">)</span>')
                return res
            }
        }
    }
</script>
<style lang="scss">
    @import "../../style/include";

    .#{$prefix}code-editor {
        position: relative;
        white-space: break-spaces;
        caret-color: white !important;

        .code-action {
            color: #ffffff;
            background: #283739;
        }

        .code-wrapper {
            direction: ltr;
            text-align: left;
            background: #283739;
            color: #ffffff;
            padding: 10px;
        }

        .code-compile {
            border: 1px solid #444444;
            min-height: 300px;
        }

        .color-func {
            color: #db92e3;
        }

        .color-func2 {
            color: #deca10;
        }

        .color-orange {
            color: orange;
        }


        .color-green {
            color: #0cde27;
        }


        .color-blue {
            color: #3bb7ee;
        }

        .color-number {
            color: #7ad5ff;
        }

        .color-purple {
            color: #d2a8ee;
        }

        .color-comment {
            color: #898d8c;
        }
    }
</style>