import {createApp} from "vue";
import App from "./Index.vue";
import Axios from "./plugins/axios";
import "./registerServiceWorker";
import router from "./router/index";
import renusify from "renusify";
import ButtomNextPage from "./components/buttomNextPage";
import tableProps from "./components/tableProps";
import tableEvents from "./components/tableEvents";

import * as components from "renusify/components";
import {scroll, title, intersect} from "renusify/directive";

window.app = createApp(App)
  .use(router)
  .use(Axios)
  .use(renusify, {
    autoAddTranslate: false,
    useNotify: true,
    components: components,
    directives: {title, scroll, intersect},
  })
  .component("ButtomNextPage", ButtomNextPage)
  .component("tableProps", tableProps)
  .component("tableEvents", tableEvents)
  .mount("#app");
