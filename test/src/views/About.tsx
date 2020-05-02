import { Render, event, slot, Handler, Container } from "@/api"
import { Test } from './Test';


class Name {
  render() {
    return <span>Name content</span>
  }
}

class Header {
  counter = 1;
  constructor() {
    console.log("Header is created")
  }
  click() {
    this.counter++
  }
  main() {
    return <div>Main header
      <div>
        {this.counter}
      </div>
      <button onClick={() => this.click()}>Increment</button>
    </div>
  }
}

class MyText {

  myHeader = new Header();

  header() {
    return this.myHeader.main();
  }

  inc() {
    this.myHeader.counter += 200;
  }

  created() {
    console.log("My text created");
  }

  render() {
    return <div>

      {this.header()}

      My name is <Name /> or {new Name()}
    </div>
  }
}

export class About {
  p = new MyText();

  l = new Render((h) => <div>hello from render</div>);

  created() {
    console.log("Created");
  }

  render() {
    const b = new MyText();
    return <div>
      <div>Created by new</div>
      {b}
      <hr />
      <div>Created by factory</div>
      <MyText />
      <hr />
      <div>My prop</div>
      {this.p}
      <button onClick={() => this.click()}>Increment</button>

      {this.l}
    </div>
  }
  click() {
    this.p.inc();
  }
}
