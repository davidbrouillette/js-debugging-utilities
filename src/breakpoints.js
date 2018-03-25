export function setBreakpoint_set(obj){
    return new Proxy(obj, {
        set: function(target, prop, value){
            debugger;
            Reflect.set(target,prop,value);
        }
    });
}

export function setBreakpoint_get(obj){
    return new Proxy(obj, {
        get: function(target, prop){
            debugger;
            return Reflect.get(target,prop);
        }
    });
}

