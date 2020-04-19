import { prop, Handler, event, Wrap, emit } from '@/api';
import Vue from 'vue'

export class Panel {
  @prop
  text = '';

  render() {
    return <div>Result: {this.text}</div>
  }
}

export class TextBox {
  @prop
  value: string;

  prefix = '';

  @event
  input: Handler;

  handle(text: string) {
    this.input(text);
  }

  render() {
    return <div>
      Enter text:
      <input type="text" value={this.value} onInput={(x: any) => this.handle(x.target.value)} />
      <br />
      Enter prefix
      <input type="text" value={this.prefix} onInput={(x: any) => this.prefix = x.target.value} />
      <br />
      Prefixed value is {this.prefix + this.value}
    </div>
  }
}

export class Home {

  text = "Hello"

  render() {
    return <div>
      <Panel text={this.text} />
      <TextBox value={this.text} onInput={(x: any) => this.text = x} />
    </div>
  }
}