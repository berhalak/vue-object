import { render } from "@/api"
import "./router"
import App from "./App.vue"
import Vue from "vue";

Vue.use(render);

render(App);

setTimeout(() => {
    //main.text = "test";
}, 1000)