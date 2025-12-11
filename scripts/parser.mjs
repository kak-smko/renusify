/**
 * @typedef {Object} ComponentProp
 * @property {string} name - Prop name
 * @property {string} [description] - Prop description from JSDoc
 * @property {string} [type] - Prop type
 * @property {string} [default] - Default value
 */

/**
 * @typedef {Object} ComponentEmit
 * @property {string} name - Emit name
 * @property {string} [description] - Emit description
 * @property {string} [params] - Formatted parameter documentation
 */

/**
 * @typedef {Object} ComponentSlot
 * @property {string} name - Slot name (defaults to 'default')
 * @property {string} [description] - Slot description from HTML comment
 * @property {string} [props] - Props passed to the slot
 */

/**
 * @typedef {Object} ComponentExpose
 * @property {string} name - Exposed property name
 * @property {string} [description] - Description from JSDoc
 */

/**
 * @typedef {Object} ComponentProvide
 * @property {string} name - Provide key name
 * @property {string} [description] - Description from JSDoc
 * @property {string} [value] - Provided value (simplified)
 */

/**
 * @typedef {Object} ComponentAPI
 * @property {ComponentProp[]} props - Component props
 * @property {ComponentEmit[]} emits - Component emits
 * @property {ComponentSlot[]} slots - Component slots
 * @property {ComponentExpose[]} expose - Exposed properties
 * @property {ComponentProvide[]} provide - Provided values
 */

/**
 * Vue Composition API Parser
 *
 * Parses Vue 3 script setup components and extracts their public API.
 */
export class VueComponentAPIParser {
    /**
     * Parse Vue component text and extract API information
     * @param {string} componentText - Full component text including template and script
     * @returns {ComponentAPI} Extracted component API
     */
    static parse(componentText) {
        const parser = new VueComponentAPIParser();
        return parser.parseComponent(componentText);
    }

    /**
     * Parse component text
     * @param {string} componentText - Full component text
     * @returns {ComponentAPI}
     */
    parseComponent(componentText) {
        const scriptContent = this.extractScriptContent(componentText);
        const templateContent = this.extractTemplateContent(componentText);

        return {
            example: this.parseExample(componentText),
            props: this.parseProps(scriptContent),
            emits: this.parseEmits(scriptContent),
            slots: this.parseSlots(templateContent),
            expose: this.parseExpose(scriptContent),
            provide: this.parseProvide(scriptContent)
        };
    }

    /**
     * Extract script setup content
     * @param {string} componentText - Full component text
     * @returns {string} Script content
     * @private
     */
    extractScriptContent(componentText) {
        const match = componentText.match(/<script[^>]*setup[^>]*>([\s\S]*?)<\/script>/);
        return match ? match[1] : '';
    }

    /**
     * Extract template content
     * @param {string} componentText - Full component text
     * @returns {string} Template content
     * @private
     */
    extractTemplateContent(componentText) {
        const match = componentText.match(/<template>([\s\S]*?)<\/template>/);
        return match ? match[1] : '';
    }

    /**
     * Parse example from the beginning of the file
     * @param {string} componentText - Full component text
     * @returns {Object} Object with example names as keys and {template, script, style} objects as values
     * @private
     */
    parseExample(componentText) {
        const examples = {};

        // Look for the first JSDoc comment in the file
        const firstJsdocMatch = componentText.match(/\/\*\*([\s\S]*?)\*\//);

        if (!firstJsdocMatch) return examples;

        const jsdocContent = firstJsdocMatch[1];

        // Find all @example sections
        const exampleRegex = /@example\s*\/\/\s*([^\n]+)([\s\S]*?)(?=@example|\*\/)/g;
        let match;

        while ((match = exampleRegex.exec(jsdocContent)) !== null) {
            const exampleName = match[1].trim();
            let exampleContent = match[2].trim();

            // Clean the content - remove leading * from each line
            exampleContent = this.cleanJsDocLines(exampleContent);

            const exampleObj = this.parseExampleContent(exampleContent);
            examples[exampleName] = exampleObj;
        }

        // Also handle the last example if it doesn't end with another @example
        const lastExampleRegex = /@example\s*\/\/\s*([^\n]+)([\s\S]*)/;
        const lastMatch = jsdocContent.match(lastExampleRegex);

        if (lastMatch && !examples[lastMatch[1].trim()]) {
            const exampleName = lastMatch[1].trim();
            let exampleContent = lastMatch[2].replace(/\*\//, '').trim();

            exampleContent = this.cleanJsDocLines(exampleContent);
            const exampleObj = this.parseExampleContent(exampleContent);
            examples[exampleName] = exampleObj;
        }

        return examples;
    }

    /**
     * Clean JSDoc lines by removing leading * and trimming
     * @param {string} content - Content with JSDoc markers
     * @returns {string} Cleaned content
     * @private
     */
    cleanJsDocLines(content) {
        return content
            .split('\n')
            .map(line => line.replace(/^\s*\*\s?/, '').trim())
            .filter(line => line !== '')
            .join('\n');
    }

    /**
     * Parse example content into template, script, and style parts
     * @param {string} content - Raw example content
     * @returns {Object} Object with template, script, and style properties
     * @private
     */
    parseExampleContent(content) {
        const result = {
            template: '',
            script: '',
            style: ''
        };

        // Fix malformed script tags
        content = content.replace(/<\/\/script>/g, '</script>');

        // First, check if the content has <template> tags
        const templateStart = content.indexOf('<template>');
        let templateContent = '';

        if (templateStart !== -1) {
            // Find the closing </template> tag
            const templateEnd = this.findTagEnd(content, templateStart, 'template');
            if (templateEnd !== -1) {
                // Get the content inside <template> tags
                const templateTagEnd = content.indexOf('>', templateStart) + 1;
                templateContent = content.substring(templateTagEnd, templateEnd).trim();
            }
        } else {
            // No <template> tags, extract everything before script or style
            let templateEnd = content.length;
            const scriptStart = content.indexOf('<script');
            const styleStart = content.indexOf('<style');

            if (scriptStart !== -1) templateEnd = Math.min(templateEnd, scriptStart);
            if (styleStart !== -1) templateEnd = Math.min(templateEnd, styleStart);

            // Also look for JavaScript keywords that might indicate script start without tags
            const jsKeywords = ['import ', 'export ', 'const ', 'let ', 'var ', 'function ', 'class '];
            for (const keyword of jsKeywords) {
                const idx = content.indexOf(keyword);
                if (idx !== -1 && idx < templateEnd) {
                    templateEnd = idx;
                    break;
                }
            }

            templateContent = content.substring(0, templateEnd).trim();
        }

        result.template = templateContent;

        // Extract script content
        const scriptStart = content.indexOf('<script');
        if (scriptStart !== -1) {
            // Find the end of the script tag
            let scriptEnd = this.findTagEnd(content, scriptStart, 'script');
            if (scriptEnd !== -1) {
                // Get content between <script> and </script>
                const scriptTagEnd = content.indexOf('>', scriptStart) + 1;
                result.script = content.substring(scriptTagEnd, scriptEnd).trim();
            }
        } else {
            // Look for script content without tags - after the template content
            const afterTemplate = content.substring(content.indexOf(templateContent) + templateContent.length).trim();
            if (afterTemplate && !afterTemplate.startsWith('<style')) {
                // Check if it looks like script
                let isScript = false;
                const jsKeywords = ['import ', 'export ', 'const ', 'let ', 'var ', 'function ', 'class '];
                for (const keyword of jsKeywords) {
                    if (afterTemplate.includes(keyword)) {
                        isScript = true;
                        break;
                    }
                }
                if (isScript) {
                    result.script = afterScriptTag.trim();
                }
            }
        }

        // Extract style content
        const styleStart = content.indexOf('<style');
        if (styleStart !== -1) {
            let styleEnd = this.findTagEnd(content, styleStart, 'style');
            if (styleEnd !== -1) {
                const styleTagEnd = content.indexOf('>', styleStart) + 1;
                result.style = content.substring(styleTagEnd, styleEnd).trim();
            }
        }

        // Clean indentation
        result.template = this.cleanIndentation(result.template);
        result.script = this.cleanIndentation(result.script);
        result.style = this.cleanIndentation(result.style);

        return result;
    }

    /**
     * Find the end position of a tag (closing tag)
     * @param {string} content - Full content
     * @param {number} startIndex - Start index of opening tag
     * @param {string} tagName - Tag name
     * @returns {number} End index or -1 if not found
     * @private
     */
    findTagEnd(content, startIndex, tagName) {
        const openingTag = `<${tagName}`;
        const closingTag = `</${tagName}>`;

        // Find the end of the opening tag
        let tagEnd = content.indexOf('>', startIndex);
        if (tagEnd === -1) return -1;

        // Now look for the closing tag
        let depth = 0;
        let pos = tagEnd + 1;

        while (pos < content.length) {
            // Check for nested opening tags
            const nextOpen = content.indexOf(openingTag, pos);
            const nextClose = content.indexOf(closingTag, pos);

            // If no closing tag found, return -1
            if (nextClose === -1) return -1;

            // If there's an opening tag before the closing tag, we have nesting
            if (nextOpen !== -1 && nextOpen < nextClose) {
                depth++;
                pos = content.indexOf('>', nextOpen) + 1;
            } else {
                if (depth === 0) {
                    return nextClose;
                }
                depth--;
                pos = nextClose + closingTag.length;
            }
        }

        return -1;
    }


    /**
     * Clean indentation from example content
     * @param {string} content - Content with possible indentation
     * @returns {string} Cleaned content
     * @private
     */
    cleanIndentation(content) {
        if (!content || content.trim() === '') return '';

        const lines = content.split('\n');

        // Find minimum indentation of non-empty lines
        let minIndent = Infinity;
        for (const line of lines) {
            if (line.trim().length === 0) continue;
            const leadingSpaces = line.match(/^(\s*)/)[0].length;
            minIndent = Math.min(minIndent, leadingSpaces);
        }

        if (minIndent === Infinity) minIndent = 0;

        // Remove minimum indentation from all lines
        const cleanedLines = lines.map(line => {
            if (line.trim().length === 0) return line;
            if (line.length >= minIndent) {
                return line.substring(minIndent);
            }
            return line;
        });

        // Remove leading and trailing empty lines
        let start = 0;
        let end = cleanedLines.length - 1;

        while (start < cleanedLines.length && cleanedLines[start].trim() === '') start++;
        while (end >= 0 && cleanedLines[end].trim() === '') end--;

        if (start > end) return '';

        return cleanedLines.slice(start, end + 1).join('\n').trim();
    }

    /**
     * Parse props from script content
     * @param {string} scriptContent - Script setup content
     * @returns {ComponentProp[]}
     * @private
     */
    parseProps(scriptContent) {
        const props = [];
        const propsMatch = scriptContent.match(/defineProps\s*\(\s*\{([\s\S]*?)\}\s*\)/);

        if (!propsMatch) return props;

        const propsContent = propsMatch[1];
        const lines = propsContent.split('\n');

        let currentJsdoc = null;
        let braceDepth = 0;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            // Track JSDoc comments
            if (line.startsWith('/**')) {
                currentJsdoc = this.collectJSDoc(lines, i);
                i = currentJsdoc.endLine;
                continue;
            }

            // Check for prop definition
            const propMatch = line.match(/^(\w+)\s*:/);
            if (propMatch && braceDepth === 0) {
                const propName = propMatch[1];

                // Parse prop value (could be simple type or object)
                const propValue = line.slice(propMatch[0].length).trim();
                const propInfo = this.parsePropDefinition(propValue, lines, i);

                props.push({
                    name: propName,
                    description: currentJsdoc ? this.cleanJSDocText(currentJsdoc.text) : undefined,
                    type: propInfo.type,
                    default: propInfo.default
                });

                currentJsdoc = null;
            }

            // Track brace depth for nested objects
            braceDepth += (line.match(/{/g) || []).length;
            braceDepth -= (line.match(/}/g) || []).length;
        }

        return props;
    }

    /**
     * Parse a single prop definition
     * @param {string} propValue - Prop value string
     * @param {string[]} lines - All lines
     * @param {number} startLine - Starting line index
     * @returns {{type: string, default: string}}
     * @private
     */
    parsePropDefinition(propValue, lines, startLine) {
        const result = {type: '', default: 'undefined'};

        // Helper function to clean and normalize type string
        const normalizeType = (typeStr) => {
            return typeStr.trim().replace(/,$/, '').replace(/\s+/g, ' ');
        };

        // If it's a simple type (Boolean, String, etc.)
        if (!propValue.startsWith('{')) {
            result.type = normalizeType(propValue);
            return result;
        }

        // Parse prop configuration object
        let configContent = propValue;
        let braceCount = (propValue.match(/{/g) || []).length - (propValue.match(/}/g) || []).length;
        let lineIndex = startLine;

        // Collect multi-line prop configuration
        while (braceCount > 0 && lineIndex + 1 < lines.length) {
            lineIndex++;
            const nextLine = lines[lineIndex];
            configContent += '\n' + nextLine;
            braceCount += (nextLine.match(/{/g) || []).length;
            braceCount -= (nextLine.match(/}/g) || []).length;
        }

        // Now parse the config object properties
        // Remove the outer braces
        const innerContent = configContent.substring(1, configContent.lastIndexOf('}')).trim();

        // Split by properties (looking for key: value pairs)
        // This is a simplified parser - we'll look for type and default specifically
        const properties = [];
        let currentProp = '';
        let inBrackets = 0;
        let inBraces = 0;
        let inParens = 0;
        let inString = false;
        let stringChar = '';

        for (let i = 0; i < innerContent.length; i++) {
            const char = innerContent[i];
            const prevChar = i > 0 ? innerContent[i - 1] : '';

            // Handle strings
            if (!inString && (char === "'" || char === '"' || char === '`')) {
                inString = true;
                stringChar = char;
            } else if (inString && char === stringChar && prevChar !== '\\') {
                inString = false;
            }

            // Only track brackets/braces/parens when not in a string
            if (!inString) {
                if (char === '[') inBrackets++;
                else if (char === ']') inBrackets--;
                else if (char === '{') inBraces++;
                else if (char === '}') inBraces--;
                else if (char === '(') inParens++;
                else if (char === ')') inParens--;
            }

            // Check for property separator (comma) at top level
            if (char === ',' && !inString && inBrackets === 0 && inBraces === 0 && inParens === 0) {
                if (currentProp.trim()) {
                    properties.push(currentProp.trim());
                    currentProp = '';
                }
            } else {
                currentProp += char;
            }
        }

        // Add the last property
        if (currentProp.trim()) {
            properties.push(currentProp.trim());
        }

        // Now parse each property
        for (const prop of properties) {
            const colonIndex = prop.indexOf(':');
            if (colonIndex === -1) continue;

            const key = prop.substring(0, colonIndex).trim();
            const value = prop.substring(colonIndex + 1).trim();

            if (key === 'type') {
                let typeValue = value;

                // Clean up trailing comma if present
                typeValue = typeValue.replace(/,$/, '').trim();

                // Parse the type
                result.type = this.parseTypeValue(typeValue);
            } else if (key === 'default') {
                let defaultValue = value;

                // Clean up trailing comma if present
                defaultValue = defaultValue.replace(/,$/, '').trim();

                // Handle quoted strings
                if ((defaultValue.startsWith("'") && defaultValue.endsWith("'")) ||
                    (defaultValue.startsWith('"') && defaultValue.endsWith('"'))) {
                    result.default = defaultValue.substring(1, defaultValue.length - 1);
                } else {
                    result.default = defaultValue;
                }
            }
        }

        return result;
    }

    /**
     * Parse type value from prop definition
     * @param {string} typeValue - Raw type value
     * @returns {string} Formatted type
     * @private
     */
    parseTypeValue(typeValue) {
        // Clean the value
        typeValue = typeValue.trim();

        // Handle array types: [String, Number]
        if (typeValue.startsWith('[') && typeValue.endsWith(']')) {
            const innerTypes = typeValue
                .substring(1, typeValue.length - 1)
                .split(',')
                .map(t => t.trim())
                .filter(t => t.length > 0);

            if (innerTypes.length === 0) {
                return 'Array';
            } else if (innerTypes.length === 1) {
                return innerTypes[0];
            } else {
                // For multiple types, show as union
                return innerTypes.join(' | ');
            }
        }

        // Handle union types
        if (typeValue.includes('|')) {
            const types = typeValue.split('|')
                .map(t => t.trim())
                .filter(t => t.length > 0);

            if (types.length === 1) {
                return types[0];
            }
            return types.join(' | ');
        }

        // Handle intersection types
        if (typeValue.includes('&')) {
            const types = typeValue.split('&')
                .map(t => t.trim())
                .filter(t => t.length > 0);

            if (types.length === 1) {
                return types[0];
            }
            return types.join(' & ');
        }

        // Handle common types
        const typeMap = {
            'String': 'String',
            'Number': 'Number',
            'Boolean': 'Boolean',
            'Array': 'Array',
            'Object': 'Object',
            'Function': 'Function',
            'Symbol': 'Symbol',
            'Date': 'Date',
            'Promise': 'Promise',
            'RegExp': 'RegExp',
            'Error': 'Error'
        };

        return typeMap[typeValue] || typeValue;
    }

    /**
     * Parse emits from script content
     * @param {string} scriptContent - Script setup content
     * @returns {ComponentEmit[]}
     * @private
     */
    parseEmits(scriptContent) {
        const emits = [];
        const emitsMatch = scriptContent.match(/defineEmits\s*\(\s*\[([\s\S]*?)\]\s*\)/);

        if (!emitsMatch) return emits;

        const emitsContent = emitsMatch[1];
        const lines = emitsContent.split('\n');

        let currentJsdoc = null;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            // Collect JSDoc
            if (line.startsWith('/**')) {
                currentJsdoc = this.collectJSDoc(lines, i);
                i = currentJsdoc.endLine;
                continue;
            }

            // Find emit names in quotes
            const emitNames = this.extractQuotedStrings(line);

            for (const emitName of emitNames) {
                if (!emitName || emitName.includes('*')) continue;

                const params = currentJsdoc ? this.extractJSDocParams(currentJsdoc.text) : null;

                emits.push({
                    name: emitName,
                    description: currentJsdoc ? this.cleanJSDocText(currentJsdoc.text, true) : undefined,
                    params: params ? this.formatParams(params) : undefined
                });
            }

            // Reset JSDoc after processing emits
            if (emitNames.length > 0) {
                currentJsdoc = null;
            }
        }

        return emits.filter(emit => emit.name && emit.name.trim().length > 0);
    }

    /**
     * Parse slots from template content
     * @param {string} templateContent - Template content
     * @returns {ComponentSlot[]}
     * @private
     */
    parseSlots(templateContent) {
        const slots = [];
        if (!templateContent) return slots;

        // Find all slot elements along with their preceding comments
        const slotWithCommentRegex = /((?:<!--[\s\S]*?-->)?\s*)<slot\b([^>]*)>/g;
        let match;

        while ((match = slotWithCommentRegex.exec(templateContent)) !== null) {
            const [fullMatch, whitespaceAndComment, slotAttrs] = match;
            const slotName = this.extractSlotName(slotAttrs);
            const slotProps = this.extractSlotProps(slotAttrs);

            // Parse the comment if present
            const commentMatch = whitespaceAndComment.match(/<!--([\s\S]*?)-->/);
            let description = '';
            let example = '';

            if (commentMatch) {
                const commentContent = commentMatch[1].trim();
                const parsedComment = this.parseSlotComment(commentContent);
                description = parsedComment.description;
                example = parsedComment.example;
            }

            slots.push({
                name: slotName,
                description: description || undefined,
                props: slotProps,
                example: example || undefined
            });
        }

        return slots;
    }

    /**
     * Parse slot comment content to extract description and example
     * @param {string} commentContent - Comment content without <!-- and -->
     * @returns {{description: string, example: string}}
     * @private
     */
    parseSlotComment(commentContent) {
        let description = '';
        let example = '';

        // Split into lines and clean
        const lines = commentContent.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);

        // Remove leading * from each line if it's a JSDoc-style comment
        const cleanedLines = lines.map(line => line.replace(/^\s*\*\s?/, ''));

        // Join back and parse
        const fullText = cleanedLines.join('\n');

        // Split by @example tag
        const parts = fullText.split(/@example\s*/);

        if (parts.length > 0) {
            description = parts[0].trim();

            // If there's more content after @example
            if (parts.length > 1) {
                example = parts.slice(1).join('\n').trim();
            }
        }

        return {description, example};
    }

    /**
     * Extract slot name from attributes
     * @param {string} attrs - Slot attributes string
     * @returns {string}
     * @private
     */
    extractSlotName(attrs) {
        const nameMatch = attrs.match(/name\s*=\s*["']([^"']+)["']/);
        return nameMatch ? nameMatch[1] : 'default';
    }

    /**
     * Extract slot props from attributes
     * @param {string} attrs - Slot attributes string
     * @returns {string|undefined}
     * @private
     */
    extractSlotProps(attrs) {
        const props = [];

        // Check for v-bind
        const bindMatch = attrs.match(/v-bind\s*=\s*["']([^"']+)["']/);
        if (bindMatch) {
            return `v-bind="${bindMatch[1]}"`;
        }

        // Check for individual bindings
        const bindingRegex = /:(\w+)\s*=\s*["']([^"']+)["']/g;
        let bindingMatch;

        while ((bindingMatch = bindingRegex.exec(attrs)) !== null) {
            props.push(`${bindingMatch[1]}: ${bindingMatch[2]}`);
        }

        return props.length > 0 ? props.join(', ') : undefined;
    }

    /**
     * Parse exposed properties
     * @param {string} scriptContent - Script setup content
     * @returns {ComponentExpose[]}
     * @private
     */
    parseExpose(scriptContent) {
        const exposed = [];

        // Find defineExpose call
        const exposeRegex = /defineExpose\s*\(\s*\{([\s\S]*?)\}\s*\)/;
        const exposeMatch = scriptContent.match(exposeRegex);

        if (!exposeMatch) return exposed;

        const exposeContent = exposeMatch[1];
        const lines = exposeContent.split('\n');

        let currentJsdoc = null;
        let inJsdoc = false;
        let jsdocLines = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            // Handle JSDoc comments
            if (line.startsWith('/**')) {
                inJsdoc = true;
                jsdocLines = [line];

                // Collect the rest of the JSDoc
                let j = i + 1;
                while (j < lines.length && !lines[j].includes('*/')) {
                    jsdocLines.push(lines[j]);
                    j++;
                }

                if (j < lines.length && lines[j].includes('*/')) {
                    jsdocLines.push(lines[j]);
                    i = j; // Skip to end of JSDoc
                }

                currentJsdoc = jsdocLines.join('\n');
                continue;
            }

            // Skip empty lines and closing braces
            if (!line || line === '}' || line === '},') {
                continue;
            }

            // Handle property definitions
            // This can be:
            // 1. Simple property: propName,
            // 2. Aliased property: alias:propName,
            // 3. Method property: propName(),
            const propertyMatch = this.matchExposedProperty(line);

            if (propertyMatch) {
                const {name, alias} = propertyMatch;

                exposed.push({
                    name: alias || name,
                    description: currentJsdoc ? this.cleanJSDocText(currentJsdoc) : undefined
                });

                // Reset JSDoc for next property
                currentJsdoc = null;
                inJsdoc = false;
                jsdocLines = [];
            }

            // If we're not in JSDoc and currentJsdoc exists but we didn't find a property,
            // reset it (might be orphaned JSDoc)
            if (!inJsdoc && currentJsdoc && !propertyMatch) {
                // Check if this line has content that suggests the JSDoc wasn't for a property
                if (line && !line.startsWith('*') && !line.startsWith('//')) {
                    currentJsdoc = null;
                }
            }
        }

        return exposed;
    }

    /**
     * Match an exposed property from a line
     * Handles: propName, alias:propName, propName(), alias:propName()
     * @param {string} line - Line to parse
     * @returns {{name: string, alias?: string}|null}
     * @private
     */
    matchExposedProperty(line) {
        // Remove trailing comma if present
        let cleanLine = line.replace(/,$/, '').trim();

        // Pattern 1: Simple property (propName)
        const simplePropRegex = /^(\w+)$/;
        let match = cleanLine.match(simplePropRegex);
        if (match) {
            return {name: match[1]};
        }

        // Pattern 2: Aliased property (alias:propName)
        const aliasedPropRegex = /^(\w+)\s*:\s*(\w+)$/;
        match = cleanLine.match(aliasedPropRegex);
        if (match) {
            return {name: match[2], alias: match[1]};
        }

        // Pattern 3: Method property (propName())
        const methodPropRegex = /^(\w+)\(\s*\)$/;
        match = cleanLine.match(methodPropRegex);
        if (match) {
            return {name: match[1]};
        }

        // Pattern 4: Aliased method property (alias:propName())
        const aliasedMethodRegex = /^(\w+)\s*:\s*(\w+)\(\s*\)$/;
        match = cleanLine.match(aliasedMethodRegex);
        if (match) {
            return {name: match[2], alias: match[1]};
        }

        // Pattern 5: Property with type annotation (propName: type)
        // This might appear in TypeScript components
        const typedPropRegex = /^(\w+)\s*:\s*\w+(?:<[^>]+>)?$/;
        match = cleanLine.match(typedPropRegex);
        if (match) {
            return {name: match[1]};
        }

        // Pattern 6: Complex property (could be destructuring or computed)
        // Look for any word that's not a JavaScript keyword
        const wordMatch = cleanLine.match(/^(\w+)/);
        if (wordMatch) {
            const potentialName = wordMatch[1];
            const jsKeywords = [
                'if', 'else', 'for', 'while', 'function', 'return', 'const', 'let', 'var',
                'import', 'export', 'default', 'class', 'extends', 'super', 'this', 'new',
                'typeof', 'instanceof', 'void', 'delete', 'in', 'of', 'await', 'async',
                'yield', 'debugger', 'with', 'switch', 'case', 'break', 'continue', 'try',
                'catch', 'finally', 'throw'
            ];

            if (!jsKeywords.includes(potentialName)) {
                return {name: potentialName};
            }
        }

        return null;
    }

    /**
     * Parse provide statements
     * @param {string} scriptContent - Script setup content
     * @returns {ComponentProvide[]}
     * @private
     */
    parseProvide(scriptContent) {
        const provides = [];
        const provideRegex = /provide\s*\(\s*['"]([^'"]+)['"]\s*,\s*([^);]+)/g;
        let match;

        while ((match = provideRegex.exec(scriptContent)) !== null) {
            const name = match[1];
            const value = match[2].trim();
            const description = this.findPrecedingJSDoc(scriptContent, match.index);

            provides.push({
                name: name,
                description: description ? this.cleanJSDocText(description) : undefined,
                value: value.replace(/\s+/g, ' ').trim()
            });
        }

        return provides;
    }

    /**
     * Collect a complete JSDoc comment
     * @param {string[]} lines - Array of lines
     * @param {number} startLine - Starting line index
     * @returns {{text: string, endLine: number}}
     * @private
     */
    collectJSDoc(lines, startLine) {
        let jsdocText = lines[startLine];
        let currentLine = startLine;

        while (currentLine < lines.length && !lines[currentLine].includes('*/')) {
            currentLine++;
            if (currentLine < lines.length) {
                jsdocText += '\n' + lines[currentLine];
            }
        }

        return {
            text: jsdocText,
            endLine: currentLine
        };
    }

    /**
     * Find JSDoc comment preceding a position
     * @param {string} text - Full text
     * @param {number} position - Position to search before
     * @returns {string|null}
     * @private
     */
    findPrecedingJSDoc(text, position) {
        const before = text.substring(0, position);
        const lines = before.split('\n');

        for (let i = lines.length - 1; i >= 0; i--) {
            if (lines[i].includes('/**')) {
                // Collect the complete comment
                let jsdoc = lines[i];
                let j = i + 1;

                while (j < lines.length && !lines[j].includes('*/')) {
                    jsdoc += '\n' + lines[j];
                    j++;
                }

                if (j < lines.length && lines[j].includes('*/')) {
                    jsdoc += '\n' + lines[j];
                }

                return jsdoc;
            }
        }

        return null;
    }

    /**
     * Clean JSDoc text
     * @param {string} jsdocText - Raw JSDoc text
     * @param {boolean} removeParams - Whether to remove @param tags
     * @returns {string}
     * @private
     */
    cleanJSDocText(jsdocText, removeParams = false) {
        if (!jsdocText) return '';

        // Extract content between /** and */
        const match = jsdocText.match(/\/\*\*\s*([\s\S]*?)\s*\*\//);
        if (!match) return '';

        let content = match[1];

        // Remove leading * from each line and trim
        const lines = content.split('\n');
        const cleanedLines = lines.map(line => {
            return line.replace(/^\s*\*\s?/, '').trim();
        }).filter(line => line.length > 0);

        // Join and optionally remove @param tags
        let result = cleanedLines.join(' ').trim();

        if (removeParams) {
            result = result.replace(/@param\s+\{[^}]+\}\s+\w+(?:\s+-\s+[^@]*)?/g, '').trim();
        }

        return result;
    }

    /**
     * Extract @param tags from JSDoc
     * @param {string} jsdocText - JSDoc text
     * @returns {Array<{type: string, name: string, description: string}>}
     * @private
     */
    extractJSDocParams(jsdocText) {
        const params = [];
        const paramRegex = /@param\s+{([^}]+)}\s+([^\s-]+)(?:\s+-\s+(.*))?/g;
        let match;

        while ((match = paramRegex.exec(jsdocText)) !== null) {
            params.push({
                type: match[1].trim(),
                name: match[2].trim(),
                description: match[3] ? match[3].trim() : ''
            });
        }

        return params;
    }

    /**
     * Format parameters for display
     * @param {Array<{type: string, name: string, description: string}>} params
     * @returns {string}
     * @private
     */
    formatParams(params) {
        return params.map(param =>
            `@param {${param.type}} ${param.name}${param.description ? ` - ${param.description}` : ''}`
        ).join('\n');
    }

    /**
     * Extract quoted strings from text
     * @param {string} text - Text to search
     * @returns {string[]}
     * @private
     */
    extractQuotedStrings(text) {
        const strings = [];
        const regex = /['"]([^'"]+)['"]/g;
        let match;

        while ((match = regex.exec(text)) !== null) {
            strings.push(match[1]);
        }

        return strings;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = VueComponentAPIParser;
}