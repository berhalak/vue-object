import { prop } from "@/api";
export class Info {
    @prop
    text: string;
    constructor(data?: {
        text: string;
    }) {
        if (data) {
            this.value = data.text;
        }
    }
    private value = '';
    render() {
        return <div style="color: red">{this.value}</div>;
    }
}
