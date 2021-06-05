"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.controller = void 0;
function controller(target) {
    for (var key in target.prototype) {
        console.log(Reflect.getMetadata('path', target.prototype));
    }
}
exports.controller = controller;
function get(path) {
    return function (target, key) {
        console.log(target, key);
        Reflect.defineMetadata('path', path, target, key);
    };
}
exports.get = get;
