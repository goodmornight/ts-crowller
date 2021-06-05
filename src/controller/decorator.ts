import { Router } from 'express';
export const router = Router();

enum Method {
  get = 'get',
  post = 'post',
  delete = 'delete'
}

export function controller(target:any) {
  for(let key in target.prototype) {
    const path = Reflect.getMetadata('path', target.prototype, key);
    const method: Method = Reflect.getMetadata('method', target.prototype, key);
    const handle = target.prototype[key];
    if(path && method && method) {
      router[method](path, handle);
    }
  }
}

function getRequestDecorator(type: string) {
  return function(path: string){
    return function(target: any, key: string) {
      Reflect.defineMetadata('path', path, target, key);
      Reflect.defineMetadata('method', type, target, key);
    }
  }
}

export const get = getRequestDecorator('get');
export const post = getRequestDecorator('post');
export const put = getRequestDecorator('put');
export const del = getRequestDecorator('delete');