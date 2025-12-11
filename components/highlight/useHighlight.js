import {ref} from 'vue'

export function useHighlight() {
    const expandData = {
        num: {
            type: 'num',
            match: /(\.e?|\b)\d(e-|[\d.oxa-fA-F_])*(\.|\b)/g
        },
        str: {
            type: 'str',
            match: /(["'])(\\[^]|(?!\1)[^\r\n\\])*\1?/g
        },
        strDouble: {
            type: 'str',
            match: /"((?!")[^\r\n\\]|\\[^])*"?/g
        }
    }

    const languages = ref({})

    const initLanguages = () => {
        languages.value.asm = {
            default: [
                {
                    type: 'cmnt',
                    match: /(;|#).*/gm
                },
                {
                    expand: 'str'
                },
                {
                    expand: 'num'
                },
                {
                    type: 'num',
                    match: /\$[\da-fA-F]*\b/g
                },
                {
                    type: 'kwd',
                    match: /^[a-z]+\s+[a-z.]+\b/gm,
                    sub: [
                        {
                            type: 'func',
                            match: /^[a-z]+/g
                        }
                    ]
                },
                {
                    type: 'kwd',
                    match: /^\t*[a-z][a-z\d]*\b/gm
                },
                {
                    match: /%|\$/g,
                    type: 'oper'
                }
            ]
        }
        languages.value.bash = {
            default: [
                {
                    sub: 'todo',
                    match: /#.*/g
                },
                {
                    type: 'str',
                    match: /(["'])((?!\1)[^\r\n\\]|\\[^])*\1?/g,
                    sub: [{
                        type: 'var',
                        match: /\$\w+|\${[^}]*}|\$\([^)]*\)/g
                    }]
                },
                {
                    type: 'oper',
                    match: /(?<=\s|^)\.*\/[a-z/_.-]+/gi
                },
                {
                    type: 'kwd',
                    match: /\s-[a-zA-Z]+|$<|[&|;]+|\b(unset|readonly|shift|export|if|fi|else|elif|while|do|done|for|until|case|esac|break|continue|exit|return|trap|wait|eval|exec|then|declare|enable|local|select|typeset|time|add|remove|install|update|delete)(?=\s|$)/g
                },
                {
                    expand: 'num'
                },
                {
                    type: 'func',
                    match: /(?<=(^|\||\&\&|\;)\s*)[a-z_.-]+(?=\s|$)/gmi
                },
                {
                    type: 'bool',
                    match: /(?<=\s|^)(true|false)(?=\s|$)/g
                },
                {
                    type: 'oper',
                    match: /[=(){}<>!]+/g
                },
                {
                    type: 'var',
                    match: /(?<=\s|^)[\w_]+(?=\s*=)/g
                },
                {
                    type: 'var',
                    match: /\$\w+|\${[^}]*}|\$\([^)]*\)/g
                }
            ]
        }
        languages.value.bf = {
            default: [
                {
                    match: /[^\[\->+.<\]\s].*/g,
                    sub: 'todo'
                },
                {
                    type: 'func',
                    match: /\.+/g
                },
                {
                    type: 'kwd',
                    match: /[<>]+/g
                },
                {
                    type: 'oper',
                    match: /[+-]+/g
                }
            ]
        }
        languages.value.c = {
            default: [
                {
                    match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g,
                    sub: 'todo'
                },
                {
                    expand: 'str'
                },
                {
                    expand: 'num'
                },
                {
                    type: 'kwd',
                    match: /#\s*include (<.*>|".*")/g,
                    sub: [
                        {
                            type: 'str',
                            match: /(<|").*/g
                        }
                    ]
                },
                {
                    match: /asm\s*{[^}]*}/g,
                    sub: [
                        {
                            type: 'kwd',
                            match: /^asm/g
                        },
                        {
                            match: /[^{}]*(?=}$)/g,
                            sub: 'asm'
                        }
                    ]
                },
                {
                    type: 'kwd',
                    match: /\*|&|#[a-z]+\b|\b(asm|auto|double|int|struct|break|else|long|switch|case|enum|register|typedef|char|extern|return|union|const|float|short|unsigned|continue|for|signed|void|default|goto|sizeof|volatile|do|if|static|while)\b/g
                },
                {
                    type: 'oper',
                    match: /[/*+:?&|%^~=!,<>.^-]+/g
                },
                {
                    type: 'func',
                    match: /[a-zA-Z_][\w_]*(?=\s*\()/g
                },
                {
                    type: 'class',
                    match: /\b[A-Z][\w_]*\b/g
                }
            ]
        }
        languages.value.css = {
            default: [
                {
                    match: /\/\*((?!\*\/)[^])*(\*\/)?/g,
                    sub: 'todo'
                },
                {
                    expand: 'str'
                },
                {
                    type: 'kwd',
                    match: /@\w+\b|\b(and|not|only|or)\b|\b[a-z-]+(?=[^{}]*{)/g
                },
                {
                    type: 'var',
                    match: /\b[\w-]+(?=\s*:)|(::?|\.)[\w-]+(?=[^{}]*{)/g
                },
                {
                    type: 'func',
                    match: /#[\w-]+(?=[^{}]*{)/g
                },
                {
                    type: 'num',
                    match: /#[\da-f]{3,8}/g
                },
                {
                    type: 'num',
                    match: /\d+(\.\d+)?(cm|mm|in|px|pt|pc|em|ex|ch|rem|vm|vh|vmin|vmax|%)?/g,
                    sub: [
                        {
                            type: 'var',
                            match: /[a-z]+|%/g
                        }
                    ]
                },
                {
                    match: /url\([^)]*\)/g,
                    sub: [
                        {
                            type: 'func',
                            match: /url(?=\()/g
                        },
                        {
                            type: 'str',
                            match: /[^()]+/g
                        }
                    ]
                },
                {
                    type: 'func',
                    match: /\b[a-zA-Z]\w*(?=\s*\()/g
                },
                {
                    type: 'num',
                    match: /\b[a-z-]+\b/g
                }
            ]
        }
        languages.value.csv = {
            default: [
                {
                    expand: 'strDouble'
                },
                {
                    type: 'oper',
                    match: /,/g
                }
            ]
        }
        languages.value.diff = {
            default: [
                {
                    type: 'deleted',
                    match: /^[-<].*/gm
                },
                {
                    type: 'insert',
                    match: /^[+>].*/gm
                },
                {
                    type: 'kwd',
                    match: /!.*/gm
                },
                {
                    type: 'section',
                    match: /^@@.*@@$|^\d.*|^([*-+])\1\1.*/gm
                }
            ]
        }
        languages.value.docker = {
            default: [
                {
                    type: 'kwd',
                    match: /^(FROM|RUN|CMD|LABEL|MAINTAINER|EXPOSE|ENV|ADD|COPY|ENTRYPOINT|VOLUME|USER|WORKDIR|ARG|ONBUILD|STOPSIGNAL|HEALTHCHECK|SHELL)\b/gmi
                },
                ...languages.value.bash.default
            ]
        }
        languages.value.git = {
            default: [
                {
                    match: /^#.*/gm,
                    sub: 'todo'
                },
                {
                    expand: 'str'
                },
                ...languages.value.diff.default,
                {
                    type: 'func',
                    match: /^(\$ )?git(\s.*)?$/gm
                },
                {
                    type: 'kwd',
                    match: /^commit \w+$/gm
                }
            ]
        }
        languages.value.go = {
            default: [
                {
                    match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g,
                    sub: 'todo'
                },
                {
                    expand: 'str'
                },
                {
                    expand: 'num'
                },
                {
                    type: 'kwd',
                    match: /\*|&|\b(break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go|goto|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/g
                },
                {
                    type: 'func',
                    match: /[a-zA-Z_][\w_]*(?=\s*\()/g
                },
                {
                    type: 'class',
                    match: /\b[A-Z][\w_]*\b/g
                },
                {
                    type: 'oper',
                    match: /[+\-*\/%&|^~=!<>.^-]+/g
                }
            ]
        }

        const name = `[:A-Z_a-z@#\u{C0}-\u{D6}\u{D8}-\u{F6}\u{F8}-\u{2FF}\u{370}-\u{37D}\u{37F}-\u{1FFF}\u{200C}-\u{200D}\u{2070}-\u{218F}\u{2C00}-\u{2FEF}\u{3001}-\u{D7FF}\u{F900}-\u{FDCF}\u{FDF0}-\u{FFFD}][:A-Z_a-z@#\u{C0}-\u{D6}\u{D8}-\u{F6}\u{F8}-\u{2FF}\u{370}-\u{37D}\u{37F}-\u{1FFF}\u{200C}-\u{200D}\u{2070}-\u{218F}\u{2C00}-\u{2FEF}\u{3001}-\u{D7FF}\u{F900}-\u{FDCF}\u{FDF0}-\u{FFFD}\\-\\.0-9\u{B7}\u{0300}-\u{036F}\u{203F}-\u{2040}]*`
        const properties = `\\s*(\\s+${name}\\s*(=\\s*([^"']\\S*|("|')(\\\\[^]|(?!\\4)[^])*\\4?)?)?\\s*)*`
        const xmlElement = {
            match: RegExp(`<[\/!?]?${name}${properties}[\/!?]?>`, 'g'),
            sub: [
                {
                    type: 'var',
                    match: RegExp(`^<[\/!?]?${name}`, 'g'),
                    sub: [
                        {
                            type: 'oper',
                            match: /^<[\/!?]?/g
                        }
                    ]
                },
                {
                    type: 'str',
                    match: /=\s*([^"']\S*|("|')(\\[^]|(?!\2)[^])*\2?)/g,
                    sub: [
                        {
                            type: 'oper',
                            match: /^=/g
                        }
                    ]
                },
                {
                    type: 'oper',
                    match: /[\/!?]?>/g
                },
                {
                    type: 'class',
                    match: RegExp(name, 'g')
                }
            ]
        }

        languages.value.xml = {
            default: [
                {
                    match: /<!--((?!-->)[^])*-->/g,
                    sub: 'todo'
                },
                {
                    type: 'class',
                    match: /<!\[CDATA\[[\s\S]*?\]\]>/gi
                },
                xmlElement,
                {
                    type: 'str',
                    match: RegExp(`<\\?${name}([^?]|\\?[^?>])*\\?+>`, 'g'),
                    sub: [
                        {
                            type: 'var',
                            match: RegExp(`^<\\?${name}`, 'g'),
                            sub: [
                                {
                                    type: 'oper',
                                    match: /^<\?/g
                                }
                            ]
                        },
                        {
                            type: 'oper',
                            match: /\?+>$/g
                        }
                    ]
                },
                {
                    type: 'var',
                    match: /&(#x?)?[\da-z]{1,8};/gi
                }
            ]
        }
        languages.value.html = {
            default: [
                {
                    type: 'class',
                    match: /<!DOCTYPE("[^"]*"|'[^']*'|[^"'>])*>/gi,
                    sub: [
                        {
                            type: 'str',
                            match: /"[^"]*"|'[^']*'/g
                        },
                        {
                            type: 'oper',
                            match: /^<!|>$/g
                        },
                        {
                            type: 'var',
                            match: /DOCTYPE/gi
                        }
                    ]
                },
                {
                    match: RegExp(`<style${properties}>((?!</style>)[^])*</style\\s*>`, 'g'),
                    sub: [
                        {
                            match: RegExp(`^<style${properties}>`, 'g'),
                            sub: xmlElement.sub
                        },
                        {
                            match: RegExp(`${xmlElement.match}|[^]*(?=</style\\s*>$)`, 'g'),
                            sub: 'css'
                        },
                        xmlElement
                    ]
                },
                {
                    match: RegExp(`<script${properties}>((?!</script>)[^])*</script\\s*>`, 'g'),
                    sub: [
                        {
                            match: RegExp(`^<script${properties}>`, 'g'),
                            sub: xmlElement.sub
                        },
                        {
                            match: RegExp(`${xmlElement.match}|[^]*(?=</script\\s*>$)`, 'g'),
                            sub: 'js'
                        },
                        xmlElement
                    ]
                },
                ...languages.value.xml.default
            ]
        }
        languages.value.ini = {
            default: [
                {
                    match: /(^[ \f\t\v]*)[#;].*/gm,
                    sub: 'todo'
                },
                {
                    type: 'str',
                    match: /.*/g
                },
                {
                    type: 'var',
                    match: /.*(?==)/g
                },
                {
                    type: 'section',
                    match: /^\s*\[.+\]\s*$/gm
                },
                {
                    type: 'oper',
                    match: /=/g
                }
            ]
        }
        languages.value.todo = {
            type: 'cmnt', default: [
                {
                    type: 'err',
                    match: /\b(TODO|FIXME|DEBUG|OPTIMIZE|WARNING|XXX|BUG)\b/g
                },
                {
                    type: 'class',
                    match: /\bIDEA\b/g
                },
                {
                    type: 'insert',
                    match: /\b(CHANGED|FIX|CHANGE)\b/g
                },
                {
                    type: 'oper',
                    match: /\bQUESTION\b/g
                }
            ]
        }
        languages.value.java = {
            default: [
                {
                    match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g,
                    sub: 'todo'
                },
                {
                    expand: 'str'
                },
                {
                    expand: 'num'
                },
                {
                    type: 'kwd',
                    match: /\b(abstract|assert|boolean|break|byte|case|catch|char|class|continue|const|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|package|private|protected|public|requires|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|transient|try|var|void|volatile|while)\b/g
                },
                {
                    type: 'oper',
                    match: /[/*+:?&|%^~=!,<>.^-]+/g
                },
                {
                    type: 'func',
                    match: /[a-zA-Z_][\w_]*(?=\s*\()/g
                },
                {
                    type: 'class',
                    match: /\b[A-Z][\w_]*\b/g
                }
            ]
        }

        languages.value.js_template_literals = {
            type: 'str', default: [
                {
                    match: new class {
                        exec(str) {
                            let i = this.lastIndex,
                                j,
                                f = _ => {
                                    while (++i < str.length - 2)
                                        if (str[i] == '{') f()
                                        else if (str[i] == '}') return
                                }
                            for (; i < str.length; ++i)
                                if (str[i - 1] != '\\' && str[i] == '$' && str[i + 1] == '{') {
                                    j = i++
                                    f(i)
                                    this.lastIndex = i + 1
                                    return {index: j, 0: str.slice(j, i + 1)}
                                }
                            return null
                        }
                    }(),
                    sub: [
                        {
                            type: 'kwd',
                            match: /^\${|}$/g
                        },
                        {
                            match: /(?!^\$|{)[^]+(?=}$)/g,
                            sub: 'js'
                        }
                    ]
                }
            ]
        }

        languages.value.js = {
            default: [
                {
                    match: /\/\*\*((?!\*\/)[^])*(\*\/)?/g,
                    sub: 'jsdoc'
                },
                {
                    match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g,
                    sub: 'todo'
                },
                {
                    expand: 'str'
                },
                {
                    match: /`((?!`)[^]|\\[^])*`?/g,
                    sub: 'js_template_literals'
                },
                {
                    type: 'kwd',
                    match: /=>|\b(this|set|get|as|async|await|break|case|catch|class|const|constructor|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|if|implements|import|in|instanceof|interface|let|var|of|new|package|private|protected|public|return|static|super|switch|throw|throws|try|typeof|void|while|with|yield)\b/g
                },
                {
                    match: /\/((?!\/)[^\r\n\\]|\\.)+\/[dgimsuy]*/g,
                    sub: 'regex'
                },
                {
                    expand: 'num'
                },
                {
                    type: 'num',
                    match: /\b(NaN|null|undefined|[A-Z][A-Z_]*)\b/g
                },
                {
                    type: 'bool',
                    match: /\b(true|false)\b/g
                },
                {
                    type: 'oper',
                    match: /[/*+:?&|%^~=!,<>.^-]+/g
                },
                {
                    type: 'class',
                    match: /\b[A-Z][\w_]*\b/g
                },
                {
                    type: 'func',
                    match: /[a-zA-Z$_][\w$_]*(?=\s*((\?\.)?\s*\(|=\s*(\(?[\w,{}\[\])]+\)? =>|function\b)))/g
                }
            ]
        }

        languages.value.jsdoc = {
            type: 'cmnt', default: [
                {
                    type: 'kwd',
                    match: /@\w+/g
                },
                {
                    type: 'class',
                    match: /{[\w\s|<>,.@\[\]]+}/g
                },
                {
                    type: 'var',
                    match: /\[[\w\s="']+\]/g
                },
                ...languages.value.todo.default
            ]
        }

        languages.value.json = {
            default: [
                {
                    type: 'var',
                    match: /("|')?[a-zA-Z]\w*\1(?=\s*:)/g
                },
                {
                    expand: 'str'
                },
                {
                    expand: 'num'
                },
                {
                    type: 'num',
                    match: /\bnull\b/g
                },
                {
                    type: 'bool',
                    match: /\b(true|false)\b/g
                }
            ]
        }

        languages.value.log = {
            default: [
                {
                    type: 'cmnt',
                    match: /^#.*/gm
                },
                {
                    expand: 'strDouble'
                },
                {
                    expand: 'num'
                },
                {
                    type: 'err',
                    match: /\b(err(or)?|[a-z_-]*exception|warn|warning|failed|ko|invalid|not ?found|alert|fatal)\b/gi
                },
                {
                    type: 'num',
                    match: /\b(null|undefined)\b/gi
                },
                {
                    type: 'bool',
                    match: /\b(false|true|yes|no)\b/gi
                },
                {
                    type: 'oper',
                    match: /\.|,/g
                }
            ]
        }

        languages.value.lua = {
            default: [
                {
                    match: /^#!.*|--(\[(=*)\[((?!--\]\2\])[^])*--\]\2\]|.*)/g,
                    sub: 'todo'
                },
                {
                    expand: 'str'
                },
                {
                    type: 'kwd',
                    match: /\b(and|break|do|else|elseif|end|for|function|if|in|local|not|or|repeat|return|then|until|while)\b/g
                },
                {
                    type: 'bool',
                    match: /\b(true|false|nil)\b/g
                },
                {
                    type: 'oper',
                    match: /[+*/%^#=~<>:,.-]+/g
                },
                {
                    expand: 'num'
                },
                {
                    type: 'func',
                    match: /[a-z_]+(?=\s*[({])/g
                }
            ]
        }

        languages.value.make = {
            default: [
                {
                    match: /^\s*#.*/gm,
                    sub: 'todo'
                },
                {
                    expand: 'str'
                },
                {
                    type: 'oper',
                    match: /[${}()]+/g
                },
                {
                    type: 'class',
                    match: /.PHONY:/gm
                },
                {
                    type: 'section',
                    match: /^[\w.]+:/gm
                },
                {
                    type: 'kwd',
                    match: /\b(ifneq|endif)\b/g
                },
                {
                    expand: 'num'
                },
                {
                    type: 'var',
                    match: /[A-Z_]+(?=\s*=)/g
                },
                {
                    match: /^.*$/gm,
                    sub: 'bash'
                }
            ]
        }

        languages.value.pl = {
            default: [
                {
                    match: /#.*/g,
                    sub: 'todo'
                },
                {
                    type: 'str',
                    match: /(["'])(\\[^]|(?!\1)[^])*\1?/g
                },
                {
                    expand: 'num'
                },
                {
                    type: 'kwd',
                    match: /\b(any|break|continue|default|delete|die|do|else|elsif|eval|for|foreach|given|goto|if|last|local|my|next|our|package|print|redo|require|return|say|state|sub|switch|undef|unless|until|use|when|while|not|and|or|xor)\b/g
                },
                {
                    type: 'oper',
                    match: /[-+*/%~!&<>|=?,]+/g
                },
                {
                    type: 'func',
                    match: /[a-z_]+(?=\s*\()/g
                }
            ]
        }

        languages.value.plain = {
            default: [
                {
                    expand: 'strDouble'
                }
            ]
        }

        languages.value.py = {
            default: [
                {
                    match: /#.*/g,
                    sub: 'todo'
                },
                {
                    match: /("""|''')(\\[^]|(?!\1)[^])*\1?/g,
                    sub: 'todo'
                },
                {
                    type: 'str',
                    match: /f("|')(\\[^]|(?!\1).)*\1?|f((["'])\4\4)(\\[^]|(?!\3)[^])*\3?/gi,
                    sub: [
                        {
                            type: 'var',
                            match: /{[^{}]*}/g,
                            sub: [
                                {
                                    match: /(?!^{)[^]*(?=}$)/g,
                                    sub: 'py'
                                }
                            ]
                        }
                    ]
                },
                {
                    expand: 'str'
                },
                {
                    type: 'kwd',
                    match: /\b(and|as|assert|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield|await)\b/g
                },
                {
                    type: 'bool',
                    match: /\b(False|True|None)\b/g
                },
                {
                    expand: 'num'
                },
                {
                    type: 'func',
                    match: /[a-z_]+(?=\s*\()/g
                },
                {
                    type: 'oper',
                    match: /[-/*+<>,=!&|^%]+/g
                },
                {
                    type: 'class',
                    match: /\b[A-Z][\w_]*\b/g
                }
            ]
        }

        languages.value.regex = {
            type: 'oper', default: [
                {
                    match: /^(?!\/).*/gm,
                    sub: 'todo'
                },
                {
                    type: 'num',
                    match: /\[((?!\])[^\\]|\\.)*\]/g
                },
                {
                    type: 'kwd',
                    match: /\||\^|\$|\\.|\w+($|\r|\n)/g
                },
                {
                    type: 'var',
                    match: /\*|\+|\{\d+,\d+\}/g
                }
            ]
        }

        languages.value.rs = {
            default: [
                {
                    match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g,
                    sub: 'todo'
                },
                {
                    expand: 'str'
                },
                {
                    expand: 'num'
                },
                {
                    type: 'kwd',
                    match: /\b(as|break|const|continue|crate|else|enum|extern|false|fn|for|if|impl|in|let|loop|match|mod|move|mut|pub|ref|return|self|Self|static|struct|super|trait|true|type|unsafe|use|where|while|async|await|dyn|abstract|become|box|do|final|macro|override|priv|typeof|unsized|virtual|yield|try)\b/g
                },
                {
                    type: 'oper',
                    match: /[/*+:?&|%^~=!,<>.^-]+/g
                },
                {
                    type: 'class',
                    match: /\b[A-Z][\w_]*\b/g
                },
                {
                    type: 'func',
                    match: /[a-zA-Z_][\w_]*(?=\s*!?\s*\()/g
                }
            ]
        }

        languages.value.sql = {
            default: [
                {
                    match: /--.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g,
                    sub: 'todo'
                },
                {
                    expand: 'str'
                },
                {
                    type: 'func',
                    match: /\b(AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/g
                },
                {
                    type: 'kwd',
                    match: /\b(ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|kwdS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:S|ING)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/g
                },
                {
                    type: 'num',
                    match: /\.?\d[\d.oxa-fA-F-]*|\bNULL\b/g
                },
                {
                    type: 'bool',
                    match: /\b(TRUE|FALSE)\b/g
                },
                {
                    type: 'oper',
                    match: /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|DIV|IN|ILIKE|IS|LIKE|NOT|OR|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/g
                },
                {
                    type: 'var',
                    match: /@\S+/g
                }
            ]
        }

        languages.value.toml = {
            default: [
                {
                    match: /#.*/g,
                    sub: 'todo'
                },
                {
                    type: 'str',
                    match: /("""|''')((?!\1)[^]|\\[^])*\1?/g
                },
                {
                    expand: 'str'
                },
                {
                    type: 'section',
                    match: /^\[.+\]\s*$/gm
                },
                {
                    type: 'num',
                    match: /\b(inf|nan)\b|\d[\d:ZT.-]*/g
                },
                {
                    expand: 'num'
                },
                {
                    type: 'bool',
                    match: /\b(true|false)\b/g
                },
                {
                    type: 'oper',
                    match: /[+,.=-]/g
                },
                {
                    type: 'var',
                    match: /\w+(?= \=)/g
                }
            ]
        }

        languages.value.ts = {
            default: [
                {
                    type: 'type',
                    match: /:\s*(any|void|number|boolean|string|object|never|enum)\b/g
                },
                {
                    type: 'kwd',
                    match: /\b(type|namespace|typedef|interface|public|private|protected|implements|declare|abstract|readonly)\b/g
                },
                ...languages.value.js.default
            ]
        }

        languages.value.uri = {
            default: [
                {
                    match: /^#.*/gm,
                    sub: 'todo'
                },
                {
                    type: 'class',
                    match: /^\w+(?=:?)/gm
                },
                {
                    type: 'num',
                    match: /:\d+/g
                },
                {
                    type: 'oper',
                    match: /[:/&?]|\w+=/g
                },
                {
                    type: 'func',
                    match: /[.\w]+@|#[\w]+$/gm
                },
                {
                    type: 'var',
                    match: /\w+\.\w+(\.\w+)*/g
                }
            ]
        }

        languages.value.yaml = {
            default: [
                {
                    match: /#.*/g,
                    sub: 'todo'
                },
                {
                    expand: 'str'
                },
                {
                    type: 'str',
                    match: /(>|\|)\r?\n((\s[^\n]*)?(\r?\n|$))*/g
                },
                {
                    type: 'type',
                    match: /!![a-z]+/g
                },
                {
                    type: 'bool',
                    match: /\b(Yes|No)\b/g
                },
                {
                    type: 'oper',
                    match: /[+:-]/g
                },
                {
                    expand: 'num'
                },
                {
                    type: 'var',
                    match: /[a-zA-Z]\w*(?=:)/g
                }
            ]
        }

        languages.value.http = {
            default: [
                {
                    type: 'kwd',
                    match: /^(GET|HEAD|POST|PUT|DELETE|CONNECT|OPTIONS|TRACE|PATCH|PRI|SEARCH)\b/gm
                },
                {
                    expand: 'str'
                },
                {
                    type: 'section',
                    match: /\bHTTP\/[\d.]+\b/g
                },
                {
                    expand: 'num'
                },
                {
                    type: 'oper',
                    match: /[,;:=]/g
                },
                {
                    type: 'var',
                    match: /[a-zA-Z][\w-]*(?=:)/g
                }
            ]
        }
    }

    const highlight = async (code, lang, hideLineNumbers) => {
        let tmp = ''
        await tokenize(code, lang, (str, type) => tmp += toSpan(sanitize(str), type))

        return `<div><div class="highlight-numbers">${'<div></div>'.repeat(!hideLineNumbers && code.split('\n').length)}</div><div>${tmp}</div></div>`
    }

    const tokenize = async (src, lang, token) => {
        try {
            let m,
                part,
                first = {},
                match,
                cache = [],
                i = 0,
                data = typeof lang === 'string' ? languages.value[lang] : lang,
                arr = [...typeof lang === 'string' ? data.default : lang.sub]

            while (i < src.length) {
                first.index = null
                for (m = arr.length; m-- > 0;) {
                    part = arr[m].expand ? expandData[arr[m].expand] : arr[m]
                    if (cache[m] === undefined || cache[m].match.index < i) {
                        part.match.lastIndex = i
                        match = part.match.exec(src)
                        if (match === null) {
                            arr.splice(m, 1)
                            cache.splice(m, 1)
                            continue
                        }
                        cache[m] = {match, lastIndex: part.match.lastIndex}
                    }
                    if (cache[m].match[0] && (cache[m].match.index <= first.index || first.index === null))
                        first = {
                            part: part,
                            index: cache[m].match.index,
                            match: cache[m].match[0],
                            end: cache[m].lastIndex
                        }
                }
                if (first.index === null)
                    break
                token(src.slice(i, first.index), data.type)
                i = first.end
                if (first.part.sub)
                    await tokenize(first.match, typeof first.part.sub === 'string' ? first.part.sub : (typeof first.part.sub === 'function' ? first.part.sub(first.match) : first.part), token)
                else
                    token(first.match, first.part.type)
            }
            token(src.slice(i, src.length), data.type)
        } catch {
            token(src)
        }
    }

    const toSpan = (str, token) => {
        return token ? `<span class="highlight-syn-${token}">${str}</span>` : str
    }

    const sanitize = (str = '') => {
        return str.replaceAll('&', '&#38;').replaceAll?.('<', '&lt;').replaceAll?.('>', '&gt;')
    }

    initLanguages()

    return {
        expandData,
        languages,
        highlight,
        tokenize,
        toSpan,
        sanitize,
        initLanguages
    }
}