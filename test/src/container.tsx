import { Container } from '@/api';

import Box from "./Box.vue"
import { Test } from '@/views/Test';


const container = new Container();

class MyTest {
    render() {
        return <span>mytest</span>
    }
}

container.when(Test).use((x, h) => {
    return <div>
        Will be :
        <MyTest />
    </div>
});

export { container };