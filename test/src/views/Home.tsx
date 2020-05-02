import { prop, event } from "@/api"

class MyButton {

  @prop
  text: string;

  @event
  click;

  render() {
    return <div onClick={this} style="border: 1px solid red; background: red; padding: 10px; color: white">
      {this.text || "Click me"}
    </div>
  }
}


export class Home {

  text = "hello";
  btn = new MyButton();

  constructor() {
    this.btn.text = "custom button"
    this.btn.click = () => {
      this.text += " btn";
    }
  }

  click() {
    this.text += " click";
  }

  render() {
    return <div>
      {this.text}
      <MyButton onClick={this} text="jsx buttn" />
      {this.btn}
    </div>
  }
}