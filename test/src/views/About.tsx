import { event, slot, Handler, Container } from "@/api"
import { Info } from '@/views/Info';


class Panel {
  slot: any;

  render() {
    return <div>
      Panel start
      {this.slot}
      Panel end
    </div>
  }
}

class Text {
  constructor(private text: string) {

  }
  render() {
    return <span> {this.text}</span>
  }
}

export class About {

  panel = new Panel();

  constructor() {
    this.panel.slot = new Text("Object content");
  }


  render(h: any) {


    let info = new Info({ text: 'hej' })

    return <div>
      {info}
      <Panel>
        jsx panel content
        </Panel>
      {this.panel}
    </div>
  }
}
