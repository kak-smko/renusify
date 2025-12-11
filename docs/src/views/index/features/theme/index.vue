<template>
  <section>
    <h1 class="display-4">Theme</h1>
    <p class="title mt-5">
      You can change the theme mode during installation or while the application is running.
    </p>

    <p>As shown in the example below, you can change the theme mode from within the application.</p>

    <r-code-editor
        runnable
        script="data(){
  return{
    dark:false
  }
},
methods: {
    change() {
      this.dark=!this.dark;
      if(!this.dark){
        this.$helper.changeColor({});
        return;
      }
      this.$helper.changeColor({
        '--color-one': '#a80b42',
        '--color-on-one': '#FFFFFF',
        '--color-one-container': '#3e424a',
        '--color-on-one-container': '#cedef1',
        '--color-two': '#565F71',
        '--color-on-two': '#FFFFFF',
        '--color-two-container': '#DAE2F9',
        '--color-on-two-container': '#131C2B',
        '--color-three': '#705575',
        '--color-on-three': '#FFFFFF',
        '--color-three-container': '#FAD8FD',
        '--color-on-three-container': '#28132E',
        '--color-error': '#BA1A1A',
        '--color-on-error': '#FFFFFF',
        '--color-error-container': '#FFDAD6',
        '--color-on-error-container': '#410002',
        '--color-success': '#246b0f',
        '--color-on-success': '#FFFFFF',
        '--color-success-container': '#e3ffd6',
        '--color-on-success-container': '#1d4100',
        '--color-warning': '#a45104',
        '--color-on-warning': '#FFFFFF',
        '--color-warning-container': '#ffe8d6',
        '--color-on-warning-container': '#411f00',
        '--color-info': '#1a5aba',
        '--color-on-info': '#FFFFFF',
        '--color-info-container': '#d6e9ff',
        '--color-on-info-container': '#002341',
        '--color-sheet': '#262627',
        '--color-sheet-dark': '#0e0e0e',
        '--color-sheet-light': '#4b4b4c',
        '--color-on-sheet': '#e9ebed',
        '--color-sheet-low': '#57585e',
        '--color-on-sheet-low': '#edeef1',
        '--color-sheet-container-lowest': '#0b0b0b',
        '--color-sheet-container-low': '#181819',
        '--color-sheet-container': '#222223',
        '--color-sheet-container-high': '#303133',
        '--color-sheet-container-highest': '#5f5f63',
        '--color-border': '#a8acb6',
        '--color-border-low': '#9ea0aa',
        '--color-overlay': 'rgba(246, 250, 254, 0.4980392157)',
      })
     }
    }"
        template='<div class="mt-5">
  <r-btn @click="change" >change</r-btn>
</div>'
    >
    </r-code-editor>
  </section>
  <section>
    <h2 class="display-4 my-5"></h2>
    <p>
      The application has the following main colors for the light mode, which you can change anywhere in the
      application.
    </p>

    <r-code-editor
        :script-show="false"
        :css-show="false"
        :template-show="false"
        script=":root {

    --color-one: #415F91;
    --color-on-one: #FFFFFF;
    --color-one-container: #D6E3FF;
    --color-on-one-container: #001B3E;
    --color-two: #565F71;
    --color-on-two: #FFFFFF;
    --color-two-container: #DAE2F9;
    --color-on-two-container: #131C2B;
    --color-three: #705575;
    --color-on-three: #FFFFFF;
    --color-three-container: #FAD8FD;
    --color-on-three-container: #28132E;
    --color-error: #BA1A1A;
    --color-on-error: #FFFFFF;
    --color-error-container: #FFDAD6;
    --color-on-error-container: #410002;
    --color-success: #246b0f;
    --color-on-success: #FFFFFF;
    --color-success-container: #e3ffd6;
    --color-on-success-container: #1d4100;
    --color-warning: #a45104;
    --color-on-warning: #FFFFFF;
    --color-warning-container: #ffe8d6;
    --color-on-warning-container: #411f00;
    --color-info: #1a5aba;
    --color-on-info: #FFFFFF;
    --color-info-container: #d6e9ff;
    --color-on-info-container: #002341;
    --color-sheet: #F9F9FF;
    --color-sheet-dark: #D9D9E0;
    --color-sheet-light: #F9F9FF;
    --color-on-sheet: #191C20;
    --color-sheet-low: #E0E2EC;
    --color-on-sheet-low: #44474E;
    --color-sheet-container-lowest: #FFFFFF;
    --color-sheet-container-low: #F3F3FA;
    --color-sheet-container: #EDEDF4;
    --color-sheet-container-high: #E7E8EE;
    --color-sheet-container-highest: #E2E2E9;
    --color-border: #74777F;
    --color-border-low: #C4C6D0;
    --color-overlay: rgba(246, 250, 254, 0.4980392157);
 }"
    >
    </r-code-editor>
  </section>
</template>

<script>
export default {
  name: "theme",
  data() {
    return {};
  },
};
</script>