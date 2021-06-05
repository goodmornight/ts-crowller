"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
var router_1 = __importDefault(require("../router"));
function controller(root) {
    return function (target) {
        for (var key in target.prototype) {
            var path = Reflect.getMetadata('path', target.prototype, key);
            var method = Reflect.getMetadata('method', target.prototype, key);
            var middleware = Reflect.getMetadata('middleware', target.prototype, key);
            var handle = target.prototype[key];
            if (path && method) {
                var fullpath = root === '/' ? path : "" + root + path;
                if (middleware) {
                    router_1.default[method](fullpath, middleware, handle);
                }
                else {
                    router_1.default[method](fullpath, handle);
                }
            }
        }
    };
}
exports.controller = controller;
