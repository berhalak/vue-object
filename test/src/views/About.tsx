import { prop, event, slot, Handler, Container } from "@/api"


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

class Info {
  @prop
  text: string;

  constructor(data?: { text: string }) {
    if (data) {
      this.value = data.text;
    }
  }

  private value = '';

  render() {
    return <div style="color: red">{this.value}</div>
  }
}

export class About {

  panel = new Panel();

  constructor() {
    this.panel.slot = new Text("Object content");
  }


  render(h: any) {

    const container = new Container();
    container.when(Info).use(x => {
      return <div>Changed {x.text}</div>
    });


    let info = new Info({ text: 'hej' })


    h = container.build(h);
    return <div>
      {info}
      <Panel>
        jsx panel content
        </Panel>
      {this.panel}
    </div>
  }
}
