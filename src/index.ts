export function prop(target: any, name: string) {
    target.constructor.props = target.props || [];
    target.constructor.props.push(name);
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

function smart(h: any) {
    return function (...args: any[]) {
        if (isClass(args[0])) {
            args[0] = Convert(args[0]);
        }
        if (args[1] && args[1].length) {
            for (let i = 0; i < args[1].length; i++) {
                const el = args[1][i];
                if (typeof el == 'object' && el && typeof el.render == 'function') {
                    args[1][i] = el.render(h);
                }
            }
        }
        return h(...args);
    }
}


export function component(target: any) {
    const was = target.prototype.render;
    target.prototype.render = function (h: any) {
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


    return v;
}