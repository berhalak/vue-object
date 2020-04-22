import { event, slot, Handler, Container } from "@/api"
import { Test } from './Test';

class Name {
  render() {
    return <span>Name content</span>
  }
}

class MyText {
  render() {
    return <span>
      My name is <Name /> or {new Name()}
    </span>
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
