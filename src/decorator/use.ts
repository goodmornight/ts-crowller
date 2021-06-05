import { RequestHandler } from 'express';
import { CrowllerController, LoginController } from '../controller';

export function use(middleware: RequestHandler) {
  return function(target: CrowllerController | LoginController, key: string) {
    const originMiddlerwares = Reflect.getMetadata('middlewares', target, key) || [];
    originMiddlerwares.push(middleware)
    Reflect.defineMetadata('middlewares', originMiddlerwares, target, key);
  }
}