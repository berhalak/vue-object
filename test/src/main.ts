import { render, Renderer, Plugin } from "@/api"
import "./router"
import Vue from "vue";
import { About } from '@/views/About';

import Box from "./Box.vue"
import { Test } from '@/views/Test';

Vue.use(Renderer);
Vue.use(Plugin(Test, Box));

const about = render(new About());

setTimeout(() => {
    about.inc();
}, 2000);
