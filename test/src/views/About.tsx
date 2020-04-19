import { prop, event, slot, Handler } from "@/api"


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

    return <div>
      <Panel>
        jsx panel content
        </Panel>
      {this.panel}
    </div>
  }
}
