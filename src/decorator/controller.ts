import { RequestHandler } from 'express';
import router from '../router';
import { Methods } from './request';

export function controller(root: string) {
  return function(target: new (...args:any[]) => any) {
    for(let key in target.prototype) {
      const path: string = Reflect.getMetadata('path', target.prototype, key);
      const method: Methods = Reflect.getMetadata('method', target.prototype, key);
      const middlewares: RequestHandler[] = Reflect.getMetadata('middlewares', target.prototype, key);
      const handle = target.prototype[key];
      if(path && method) {
        const fullpath = root === '/' ? path : `${root}${path}`;
        if(middlewares && middlewares.length) {
          router[method](fullpath, ...middlewares, handle);
        } else {
          router[method](fullpath, handle);
        }
      }
    }
  }
}
