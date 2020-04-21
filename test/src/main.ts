import { render, Renderer } from "@/api"
import "./router"
import App from "./App.vue"
import Vue from "vue";
import { container } from '@/container';
import { About } from '@/views/About';

Vue.use(Renderer);
Vue.use(container);

render(new About());
