function fireEvent(el, eventName, data) {
    var e = document.createEvent('CustomEvent');
    e.initCustomEvent(eventName, true, true, data);
    el.dispatchEvent(e);
}

const maskStart = /^([^BANX]+)/;

function getInputElement(element) {
    if (element.tagName.toLocaleUpperCase() === 'INPUT') {
        return element
    }

    const inputElements = element.getElementsByTagName('input');
    if (inputElements.length === 0) {
        throw new Error('[mask]: v-mask directive requires input element');
    }

    return inputElements[0];
}

function format(data, mask = '') {
    if (!mask.length) {
        return data;
    }

    if (data.length === 1 && maskStart.test(mask)) {
        data = maskStart.exec(mask)[0] + data;
    }

    let dataOffset = 0;
    let dataOutput = '';
    let unmask = '';
    const lng=mask.length
    loop: for (let i = 0; i < lng; i++) {
        const dataChar = data.charAt(i + dataOffset);
        const maskChar = mask.charAt(i);
        switch (maskChar) {
            case 'N':
                if (/[0-9]/.test(dataChar)) {
                    dataOutput += dataChar;
                    unmask += dataChar
                    break;
                }

                break loop;
            case 'A':
                if (/[a-z]/i.test(dataChar)) {
                    dataOutput += dataChar;
                    unmask += dataChar
                    break;
                }

                break loop;
            case 'B':
                if (/[a-z0-9]/i.test(dataChar)) {
                    dataOutput += dataChar;
                    unmask += dataChar
                    break;
                }

                break loop;
            case 'X':
                dataOutput += dataChar;
                unmask += dataChar
                break;
            default:
                dataOutput += maskChar;
                if (dataChar && dataChar !== maskChar) {
                    dataOffset++;
                }
                break;
        }
    }

    return {'masked': dataOutput, 'unMasked': unmask};
}

function updateMask(element, mask) {
    element.dataset.mask = mask;
}


function updateValue(element, force = false) {
    const {value, dataset: {prevValue = '', mask}} = element;

    if (value.length < prevValue.length) {
        fireEvent(element, 'backspace', true)
    }
    const lng=value.length
    const lng2=prevValue.length
    if (force || (value && lng >= lng2)) {
        const data = format(value, mask);
        element.value = data['masked']
        if (value.length === mask.length) {
            fireEvent(element, 'complete', data)
        } else if (value.length < mask.length) {
            fireEvent(element, 'accept', data)
        }
        const event = document.createEvent('HTMLEvents');
        event.initEvent('input', true, true);
        element.dispatchEvent(event);
    }

    element.dataset.prevValue = value;
}

export default {
    mounted(element, binding) {
        const inputElement = getInputElement(element);

        updateMask(inputElement, binding.value);
        updateValue(inputElement);


    },
    unmounted(element) {
        const inputElement = getInputElement(element);

    },
    updated(element, binding) {
        const inputElement = getInputElement(element);

        if (binding.value !== binding.oldValue) {
            updateMask(inputElement, binding.value);
        }

        updateValue(inputElement);

    }
};