import { event, slot, Handler, Container } from "@/api"
import { Test } from './Test';

class Name {
  render() {
    return <span>Name content</span>
  }
}

class MyText {

  header() {
    console.log(JSON.stringify(this));
    return <div>This is header</div>;
  }

  render() {
    return <div>
      {this.header()}

      My name is <Name /> or {new Name()}
    </div>
  }
}

export class About {
  render() {
    const b = new MyText();
    return <div>
      {[b, b, b]}
    </div>
  }
}
