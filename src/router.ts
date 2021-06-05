import { Router, Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import Crowller from './utils/crowller';
import Analyzer from './utils/analyzer';
import { getResponseData } from './utils/util';

interface BodyRequest extends Request {
  body: {
    [key: string]: string | undefined
  }
}

const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const isLogin = req.session ? req.session.login : false;
  if(isLogin) {
    next();
  } else {
    res.send('请先登录');
  }
}

const router = Router();

router.get('/', () => {})

router.post('/login', (req: BodyRequest, res: Response) => {
  const { password } = req.body;
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    res.json(getResponseData(false, '已经登陆过'));
  } else {
    if (password === '123' && req.session) {
      req.session.login = true;
      res.json(getResponseData(true));
    } else {
      res.json(getResponseData(false, '登陆失败'));
    }
  }
})

router.get('/logout', (req: BodyRequest, res: Response) => {

  if(req.session) {
    req.session.login = undefined;
  }
  res.json(getResponseData(true));
})

router.get('/getData', checkLogin, (req: BodyRequest, res: Response) => {
  
  const secret = 'x3b174jsx';
  const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;

  const analyzer = Analyzer.getInstance();
  new Crowller(url, analyzer);
  res.json(getResponseData(true));

})

router.get('/showData', checkLogin,(req: BodyRequest, res: Response) => {

  try {
    const position = path.resolve(__dirname, '../data/course.json');
    const result = fs.readFileSync(position, 'utf8');
    res.send(JSON.parse(result))
  } catch (e) {
    res.json(getResponseData(false, '数据不存在'));
  }

})

export default router;