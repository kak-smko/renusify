export const color = {
    methods: {
        setColorValue(color) {
            let rgba = {r: 0, g: 0, b: 0, a: 1}
            const rgbRegex = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*([01]?\.\d+)?\s*)?\)$/;
            const hexRegex = /^#([a-f0-9]{6}|[a-f0-9]{8})$/i;
            if (hexRegex.test(color)) {
                rgba = this.hex2rgba(color)
            } else if (rgbRegex.test(color)) {
                rgba = this.rgb2rgba(color)
            } else if (Object.prototype.toString.call(color) === '[object Object]') {
                rgba = color
            } else {
                return
            }
            this.r = rgba.r
            this.g = rgba.g
            this.b = rgba.b
            if (rgba.a >= 0 && rgba.a <= 1) {
                this.a = rgba.a
            } else {
                this.a = 1
            }

            this.set_hsv(rgba)
        },
        createAlphaSquare(size) {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            const doubleSize = size * 2
            canvas.width = doubleSize
            canvas.height = doubleSize

            ctx.fillStyle = '#ffffff'
            ctx.fillRect(0, 0, doubleSize, doubleSize)
            ctx.fillStyle = '#ccd5db'
            ctx.fillRect(0, 0, size, size)
            ctx.fillRect(size, size, size, size)

            return canvas
        },
        createLinearGradient(
            direction,
            ctx,
            width,
            height,
            color1,
            color2
        ) {
            // l horizontal p vertical
            const isL = direction === 'l'
            const gradient = ctx.createLinearGradient(
                0,
                0,
                isL ? width : 0,
                isL ? 0 : height
            )
            gradient.addColorStop(0.01, color1)
            gradient.addColorStop(0.99, color2)
            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, width, height)
        },
        rgb2hex({r, g, b, a}, toUpper = false) {
            const change = (val) => {
                const hex = Math.round(val).toString(16);
                return hex.length === 1 ? '0' + hex : hex;
            };

            let color = `#${change(r)}${change(g)}${change(b)}`;

            if (a !== undefined && a !== 1) {
                const alpha = Math.round(a * 255);
                color += change(alpha);
            }

            return toUpper ? color.toUpperCase() : color;
        },
        hex2rgba(hex) {
            hex = hex.slice(1)
            const change = (val) => parseInt(val, 16) || 0;
            const r = change(hex.slice(0, 2));
            const g = change(hex.slice(2, 4));
            const b = change(hex.slice(4, 6));

            let a = 1;
            if (hex.length === 8) {
                const alphaHex = hex.slice(6, 8);
                a = parseFloat((parseInt(alphaHex, 16) / 255).toFixed(2));
            }

            return {r, g, b, a};
        },
        rgb2rgba(rgba) {
            rgba = (/rgba?\((.*?)\)/.exec(rgba) || ['', '0,0,0,1'])[1].split(',')
            return {
                r: Number(rgba[0]) || 0,
                g: Number(rgba[1]) || 0,
                b: Number(rgba[2]) || 0,
                a: Number(rgba[3] ? rgba[3] : 1), // Avoid the case of 0
            }
        },
        set_hsv({r, g, b}) {
            r = r / 255
            g = g / 255
            b = b / 255
            const max = Math.max(r, g, b)
            const min = Math.min(r, g, b)
            const delta = max - min
            let h = 0
            if (max === min) {
                h = 0
            } else if (max === r) {
                if (g >= b) {
                    h = (60 * (g - b)) / delta
                } else {
                    h = (60 * (g - b)) / delta + 360
                }
            } else if (max === g) {
                h = (60 * (b - r)) / delta + 120
            } else if (max === b) {
                h = (60 * (r - g)) / delta + 240
            }
            h = Math.floor(h)
            let s = parseFloat((max === 0 ? 0 : 1 - min / max).toFixed(2))
            let v = parseFloat(max.toFixed(2))
            this.h = h
            this.s = s
            this.v = v
        }
    },

}