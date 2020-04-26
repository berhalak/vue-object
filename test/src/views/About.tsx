
import { event, slot, Handler, Container } from "@/api"
import { Test } from './Test';

class Name {
  text = 'My name';

  click() {
    debugger;
    this.text += "ha ha ";
  }

  render() {
    return <div>
      <div>
        Name component
      </div>
      <div>
        My Name is {this.text}
      </div>
      <button onClick={() => {
        debugger;
        this.click();
      }}>Change me</button>
    </div>
  }
}

class MyText {
  counter = "b";

  inc() {
    this.counter += "a";
  }

  render() {
    return <span>
      {this.counter}
      My name is <Name /> or {new Name()}
    </span>
  }
}

export class About {
  b = new MyText();
  inc() {
    this.b.inc();
  }

  render() {
    const b = this.b;
    return <div>
      {b}
      {[b, b, b]}
    </div>
  }
}
