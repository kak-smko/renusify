export * as rApp from './app/index.js'
export * as rAvatar from './avatar/index.js'
export * as rToolbar from './bar/toolbar/index.js'
export * as rBottomNavigation from './bar/bottomNav.js'
export * as rBottomNavigationCircle from './bar/bottomNavigationCircle.js'
export * as rBreadcrumbs from './breadcrumb/index.js'
export * as rBtn from './button/index.js'
export * as rBtnConfirm from './button/buttonConfirm.js'
export * as rCalendar from './calendar/index.js'
export * as rCard from './card/index.js'
export * as rChart from './chart/chart.js'
export * as rChartMap from './chart/worldMap.js'
export * as rChat from './chat/index.js'
export * as rChip from './chip/index.js'
export * as rCodeEditor from './codeEditor/index.js'
export * as rConfirm from './confirm/index.js'
export * as rContainer from './container/index.js'
export * as rRow from './container/row.js'
export * as rCol from './container/col.js'
export * as rSpacer from './container/spacer.js'
export * as rDivider from './container/divider.js'
export * as rContent from './content/index.js'
export * as rCountDown from './countdown/index.js'
export * as rCropper from './cropper/index.js'
export * as rFloat from './float/index.js'
export * as rForm from './form/index.js'
export * as rColorInput from './form/colorInput/index.js'
export * as rDateInput from './form/dateInput/index.js'
export * as rFileInput from './form/fileInput/index.js'
export * as rTelInput from './form/telInput/index.js'
export * as rJsonInput from './form/jsonInput/index.js'
export * as rTextEditor from './form/text-editor/index.js'
export * as rTextEditorPreview from './form/text-editor/preview.js'
export * as rTimeInput from './form/timeInput/index.js'
export * as rTimeRangeInput from './form/timeInput/range.js'
export * as rUniqueInput from './form/uniqueInput/index.js'
export * as rAddressInput from './form/addressInput/index.js'
export * as rCamInput from './form/camInput/index.js'
export * as rCheckInput from './form/checkInput/index.js'
export * as rCheckboxInput from './form/checkboxInput/index.js'
export * as rGroupInput from './form/groupInput/index.js'
export * as rInput from './form/input/index.js'
export * as rMaskInput from './form/maskInput/index.js'
export * as rNumberInput from './form/numberInput/index.js'
export * as rPasswprdInput from './form/passwordInput/index.js'
export * as rRadioInput from './form/radioInput/index.js'
export * as rRangeInput from './form/rangeInput/index.js'
export * as rRatingInput from './form/ratingInput/index.js'
export * as rSelectInput from './form/selectInput/index.js'
export * as rSwitchInput from './form/switchInput/index.js'
export * as rTextArea from './form/textArea/index.js'
export * as rTextInput from './form/textInput/index.js'
export * as rUnitInput from './form/unitInput/index.js'
export * as rFormCreator from './formCreator/index.js'
export * as rHtml2pdf from './html2pdf/index.js'
export * as rHtml2pdfPageBreak from './html2pdf/pageBreak.js'
export * as rIcon from './icon/index.js'
export * as rImg from './img/index.js'
export * as rInfiniteDiv from './infinite/div.js'
export * as rInfinitePage from './infinite/page.js'
export * as rInfiniteBox from './infinite/index.js'
export * as rList from './list/index.js'
export * as rMap from './map/index.js'
export * as rMapSelect from './map/select.js'
export * as rMapRoute from './map/route.js'
export * as rMenu from './menu/index.js'
export * as rMessage from './message/index.js'
export * as rMeta from './meta/index.js'
export * as rModal from './modal/index.js'
export * as rNestable from './nestable/index.js'
export * as rNotify from './notify/index.js'
export * as rProgressCircle from './progress/circle.js'
export * as rProgressLine from './progress/line.js'
export * as rSearchBox from './searchBox/index.js'
export * as rSlider from './slider/index.js'
export * as rSwiper from './swiper/index.js'
export * as rTable from './table/index.js'
export * as rTableCrud from './table/crud/index.js'
export * as rTabs from './tabs/index.js'
export * as rTimeAgo from './timeAgo/index.js'
export * as rTimeline from './timeline/index.js'
export * as rTour from './tour/index.js'
export * as rTree from './tree/index.js'

export const register = (app, components) => {
    let d = {}
    let s = {}
    const setup = (ls) => {
        for (const name in ls) {
            try {
                for (const arrayKey in ls[name]) {
                    const cc=ls[name][arrayKey]
                    if(arrayKey.startsWith('d_')){
                        d[arrayKey.substring(2)]=cc
                    }
                    else if(arrayKey.startsWith('l_')){
                        setup({[arrayKey.substring(2)]:cc})
                    }
                    else if (!s[arrayKey]) {
                        app.component(arrayKey,cc.default)
                        s[arrayKey] = true
                    }
                }

            } catch (e) {
                console.error('component not found', c, e)
            }
        }
    }

    setup(components)
    return d
}