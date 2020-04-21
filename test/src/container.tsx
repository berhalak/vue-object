import { Info } from "@/views/Info";
import { Container } from '@/api';
import VueInfo from "./VueInfo.vue"

class MyInfo {
    render() {
        let v: any = VueInfo;
        return <v />;
    }
}

const container = new Container();
container.when(Info).use(x => new MyInfo());

export { container };