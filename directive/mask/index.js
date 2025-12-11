/**
 * @example // v-mask usage
 * <template>
 *     <div class="title-1 my-3">Number input (N)</div>
 *     <input
 *      class="input-mask"
 *         v-model="lazy1"
 *         placeholder="2020/04/01"
 *         @complete="log('complete',$event)"
 *         @accept="log('accept',$event)"
 *         @backspace="log('backspace',$event)"
 *         @paste.prevent="log('paste',$event)"
 *         v-mask="'NNNN/NN/NN'"
 *     />
 *     <div class="title-1 my-3">[a-z] input (A)</div>
 *     <input
 *      class="input-mask"
 *         v-model="lazy2"
 *         placeholder="aaaa - bbbb"
 *         @complete="log('complete',$event)"
 *         @accept="log('accept',$event)"
 *         @backspace="log('backspace',$event)"
 *         @paste.prevent="log('paste',$event)"
 *         v-mask="'AAAA - AAAA'"
 *     />
 *     <div class="title-1 my-3">[a-z0-9] input (B)</div>
 *     <input
 *      class="input-mask"
 *         v-model="lazy3"
 *         placeholder="aaaa - 22"
 *         @complete="log('complete',$event)"
 *         @accept="log('accept',$event)"
 *         @backspace="log('backspace',$event)"
 *         @paste.prevent="log('paste',$event)"
 *         v-mask="'BBBB - BB'"
 *     />
 *     <div class="title-1 my-3">Any input (X)</div>
 *     <input
 *      class="input-mask"
 *         v-model="lazy4"
 *         placeholder="aa - 22 - #@"
 *         @complete="log('complete',$event)"
 *         @accept="log('accept',$event)"
 *         @backspace="log('backspace',$event)"
 *         @paste.prevent="log('paste',$event)"
 *         v-mask="'XX XX XX'"
 *     />
 *
 * </template>
 * <script>
 *     import {ref} from 'vue'
 *     const lazy1=ref(null)
 *     const lazy2=ref(null)
 *     const lazy3=ref(null)
 *     const lazy4=ref(null)
 *     const log=(name,e)=>{
 *         console.log(name,e)
 *     }
 * <//script>
 * <style>
 *     .input-mask{
 *         width:100%;
 *         border:1px solid;
 *         padding:8px
 *     }
 * </style>
 * */
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