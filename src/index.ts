export function prop(target: any, name: string) {
    target.constructor.props = target.constructor.props || [];
    target.constructor.props.push(name);
}

export function event(target: any, name: string) {
    target.constructor.events = target.constructor.events || [];
    target.constructor.events.push(name);
}

function isClass(obj: any) {
    const isCtorClass = obj.constructor
        && obj.constructor.toString().substring(0, 5) === 'class'
    if (obj.prototype === undefined) {
        return isCtorClass
    }
    const isPrototypeCtorClass = obj.prototype.constructor
        && obj.prototype.constructor.toString
        && obj.prototype.constructor.toString().substring(0, 5) === 'class'
    return isCtorClass || isPrototypeCtorClass
}

export const Renderer = {
    install(vue: any) {
        vue.mixin({
            beforeCreate(this: any) {
                const was = this.$createElement;
                this.$createElement = function (...args: any[]) {
                    return smart(was)(...args);
                }
            }
        })
    }
}

export type Handler = (payload?: any) => any;

export function slot(self: any) {
    if (self.$slots)
        return self.$slots.default;
    return null;
}

export function input(self: any, payload?: any) {
    emit(self, "input", payload);
}

export function click(self: any) {
    emit(self, "click");
}

export function emit(self: any, msg: string, payload?: any) {
    self.$emit(msg, payload);
}

export const Wrap = {
    functional: true,
    render(el: any, ctx: any) {
        const t = ctx.slots();
        if (!t) return;
        const child = t.default[0];
        if (!child) return null;
        child.data.class = child.data.class ? (child.data.class + " ") : "";
        child.data.class += ctx.data.class;
        child.data.style = child.data.style ? (child.data.style + "; ") : "";
        child.data.style = child.data.style + ";" + ctx.data.style + ";";
        if (ctx.data.on) {
            child.data.on = Object.assign({}, child.data.on, ctx.data.on);
        }
        return child;
    }
} as any;

function smart(h: any) {
    const custom = function (...args: any[]) {

        function convert(el: any) {
            if (el) {
                if (Array.isArray(el)) {
                    for (let i = 0; i < el.length; i++) {
                        el[i] = convert(el[i]);
                    }
                    return el;
                } else {
                    if (typeof el == 'function' && isClass(el)) {
                        return Convert(el);
                    } else {
                        if (typeof el == 'object' && el.render) {
                            if (!el._compiled && el.constructor.name != 'Object' && el.constructor.name != 'VNode')
                                return el.render(custom);
                        }
                    }
                }
            }
            return el;
        }

        if (args) {
            args = convert(args);
        }

        return h(...args);
    }

    return custom;
}


export function component(target: any) {
    const was = target.prototype.render;
    target.prototype.render = function (h: any) {
        if (h.__smart) {
            return was.call(this, h);
        }
        return was.call(this, smart(h));
    }
}

function methods(t: any, flat = false) {
    if (t == null) return [];

    function* proto(p: any): any {
        for (let key of Object.getOwnPropertyNames(p)) {
            if (key != 'constructor')
                yield key
        }
        if (flat) {
            let parent = Object.getPrototypeOf(p)
            if (parent && parent != Object.prototype) {
                yield* proto(parent)
            }
        }
    }

    if (typeof t == 'function') {
        return [...proto(t.prototype)]
    } else {
        return [...proto(t.constructor.prototype)]
    }
}

export function Convert(type: any): any {

    if (type.__compiled) return type.__compiled;

    const definition = {
        methods: {},
        props: type.props,
        data() {
            const data = new type((this as any).$props);
            if (type.props) {
                type.props.forEach((name: string) => {
                    delete data[name]
                })
            }
            return data;
        },
        render(h: any) {
            return type.prototype.render.call(this, h);
        }
    } as any;

    if (type.events) {
        type.events.forEach((name: string) => {
            Object.assign(definition.methods, {
                [name](payload: any) {
                    (this as any).$emit(name, payload);
                }
            })
        })
    }
    definition.computed = {
        slot: {
            get() {
                return (this as any).$slots.default;
            }
        }
    }

    for (let m of methods(type)) {
        definition.methods[m] = type.prototype[m];
    }

    type.__compiled = definition;

    return definition;
}

declare global {
    namespace JSX {
        // tslint:disable no-empty-interface
        interface Element { }
        // tslint:disable no-empty-interface
        interface ElementClass { }
        interface IntrinsicElements {
            [elem: string]: any
        }
    }
}

const configuration = {
    vue: null,
    plugins: []
}

export function render(main: any, tag = '#app') {
    const Vue = configuration.vue;
    let vueData = {};
    if (!main._compiled) {
        Object.assign(main, Vue.observable(main));
        vueData = {
            render: (h: any) => {
                return main.render(h);
            }
        }
    } else {
        vueData = {
            render: (h: any) => {
                return h(main);
            }
        }
    }

    if (configuration.plugins) {
        configuration.plugins.forEach(x => x.data(vueData));
    }

    new Vue(vueData).$mount(tag);
}

render.install = function (vue: any) {
    Renderer.install(vue);
    configuration.vue = vue;
}

type Config = {
    data?: (config: any) => any;
}

render.plugin = function (config: Config) {
    configuration.plugins.push(config);
}