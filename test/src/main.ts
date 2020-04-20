import { Form } from './Form';
import { render } from "@/api"
import Vue from "vue";
Vue.use(render);

const main = new Form();

render(main);

setTimeout(() => {
    main.text = "test";
}, 1000)