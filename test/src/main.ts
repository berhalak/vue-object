import { render, Renderer } from "@/api"
import "./router"
import App from "./App.vue"
import Vue from "vue";
import { container } from '@/container';

Vue.use(Renderer);
Vue.use(container);

render(App);

setTimeout(() => {
    //main.text = "test";
}, 1000)