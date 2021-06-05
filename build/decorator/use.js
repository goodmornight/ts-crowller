"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = void 0;
function use(middleware) {
    return function (target, key) {
        var originMiddlerwares = Reflect.getMetadata('middlewares', target, key) || [];
        originMiddlerwares.push(middleware);
        Reflect.defineMetadata('middlewares', originMiddlerwares, target, key);
    };
}
exports.use = use;
