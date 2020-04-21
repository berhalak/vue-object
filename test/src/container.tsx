import { Info } from "@/views/Info";
import { Container } from '@/api';
import VueInfo from "./VueInfo.vue"

class MyInfo {
    render() {
        return <VueInfo />
    }
}

const container = new Container();
container.when(Info).use(x => new MyInfo());

export { container };