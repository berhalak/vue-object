[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/berhalak/vue-object) 

# vue-object

Treat normal objects as vue components. 

This library allows you to create an application using a plain objects that can render themselves.
Perfect to proper encapsulation and widgets library. No external dependencies, works with vue as a rendering platform.
See tests

Install:

```bash
npm install vue-object
```

Then add custom renderer and configure tsx

```ts
/// main.ts

import { Renderer } from 'vue-object';
Vue.use(Renderer);
```

```ts
/// shims-tsx.d.ts

import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element { } // for now disable all type checks
    // tslint:disable no-empty-interface
    interface ElementClass { }
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}

```

And use plain classes instead of components

```ts
/// About.tsx

import { prop, event, slot, Handler } from "vue-object"

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
    // pass plain objects, that can render themselves
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


```

You can always convert classes to vue components using Convert utility. For example for VueRouter:

```ts

/// router.ts

import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import { Home } from '../views/Home'
import { About } from '../views/About'
import { Convert } from 'vue-object'

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Convert(Home)
  },
  {
    path: '/about',
    name: 'About',
    component: Convert(About)
  }
]
```