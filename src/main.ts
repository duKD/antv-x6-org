import { createApp } from "vue";
import ArcoVue from "@arco-design/web-vue";
import ArcoVueIcon from "@arco-design/web-vue/es/icon";
import router from "./router";
import store from "./store";
import directive from "./directive";
import "./mock";
import App from "./App.vue";
import "virtual:windi-base.css";
import "virtual:windi-components.css";
import "@/assets/style/global.less";
import "@arco-design/web-vue/es/message/style/css.js";
import "@arco-design/web-vue/es/Notification/style/css.js";
import "virtual:windi-utilities.css";
import "@/api/interceptor";
//@ts-ignore
window.__x6_instances__ = [];

const app = createApp(App);

app.use(ArcoVue, {});
app.use(ArcoVueIcon);

app.use(router);
app.use(store);
app.use(directive);

app.mount("#app");
