export function prop(target: any, name: string) {
    target.constructor.props = target.props || [];
    target.constructor.props.push(name);
}

export function event(target: any, name: string) {
    target.constructor.events = target.props || [];
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
    render(el: any, ctx) {
        const t = ctx.slots();
        const child = t?.default[0];
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
        if (args) {
            if (args[0] && isClass(args[0])) {
                args[0] = Convert(args[0]);
            }
            if (args[1] && args[1].length) {
                for (let i = 0; i < args[1].length; i++) {
                    const el = args[1][i];
                    if (typeof el == 'object' && el && typeof el.render == 'function') {
                        args[1][i] = el.render(custom);
                    }
                }
            }
            if (args[2] && args[2].length) {
                for (let i = 0; i < args[2].length; i++) {
                    const el = args[2][i];
                    if (typeof el == 'object' && el && typeof el.render == 'function') {
                        args[2][i] = el.render(custom);
                    }
                }
            }
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

export function Convert(type: any): any {
    const v = {
        methods: type.prototype,
        props: type.props,
        data() {
            const data = new type();
            if (type.props) {
                type.props.forEach((name: string) => {
                    delete data[name]
                })
            }
            return data;
        },
        render: type.prototype.render
    } as any;

    if (type.events) {
        type.events.forEach((name: string) => {
            Object.assign(v.methods, {
                [name](payload: any) {
                    (this as any).$emit(name, payload);
                }
            })
        })
    }

    return v;
}