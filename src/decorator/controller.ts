import router from '../router';
import { Methods } from './request';

export function controller(root: string) {
  return function(target: new (...args:any[]) => any) {
    for(let key in target.prototype) {
      const path = Reflect.getMetadata('path', target.prototype, key);
      const method: Methods = Reflect.getMetadata('method', target.prototype, key);
      const middleware = Reflect.getMetadata('middleware', target.prototype, key);
      const handle = target.prototype[key];
      if(path && method) {
        const fullpath = root === '/' ? path : `${root}${path}`;
        if(middleware) {
          router[method](fullpath, middleware, handle);
        } else {
          router[method](fullpath, handle);
        }
      }
    }
  }
}
