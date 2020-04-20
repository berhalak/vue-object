import { Form } from './Main';
import { render } from "@/api"
import Vue from "vue";


const main = new Form();

render(main)
    .using(Vue)
    .mount();

setTimeout(() => {
    main.text = "test";
}, 1000)