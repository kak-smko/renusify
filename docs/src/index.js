import {createApp} from "vue";
import App from "./Index.vue";
import Axios from "./plugins/axios";
import "./registerServiceWorker";
import router from "./router/index";
import renusify from "renusify";
import ButtomNextPage from "./components/buttomNextPage";
import tableProps from "./components/tableProps";
import tableEvents from "./components/tableEvents";
import tableExpose from "@/components/tableExpose.vue";
import tableProvide from "@/components/tableProvide.vue";
import tableSlots from "@/components/tableSlots.vue";

import * as components from "renusify/components";
import * as directive from "renusify/directive";

window.app = createApp(App)
  .use(router)
  .use(Axios)
  .use(renusify, {
    useNotify: true,
    components: components,
    directives: directive,
  })
  .component("ButtomNextPage", ButtomNextPage)
  .component("tableProps", tableProps)
  .component("tableEvents", tableEvents)
  .component("tableExpose", tableExpose)
  .component("tableProvide", tableProvide)
  .component("tableSlots", tableSlots)
  .mount("#app");
