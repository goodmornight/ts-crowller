import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import Crowller from './crowller';
import DellAnalyzer from './dellAnalyzer';

interface RequstWithBody extends Request {
  body: {
    [key: string]: string | undefined
  }
}

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const isLogin = req.session ? req.session.login : false;
  if(isLogin) {
    res.send(`
      <html>
        <body>
          <a href='/getData'>爬取内容</a>
          <a href='/showData'>展示内容</a>
          <a href='/logout'>退出</a>
        </body>
      </html>
    `);
  } else {
    res.send(`
    <html>
      <body>
        <form method="post" action="/login">
          <input type="password" name="password" />
          <button>提交</button>
        </form>
      </body>
    </html>
    `);
  }
})

router.post('/login', (req: RequstWithBody, res: Response) => {
  const { password } = req.body;
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    res.send('已经登陆过');
  } else {
    if (password === '123' && req.session) {
      req.session.login = true;
      res.send('登陆成功');
    } else {
      res.send('登陆失败');
    }
  }
})

router.get('/logout', (req: RequstWithBody, res: Response) => {
  if(req.session) {
    req.session.login = undefined;
  }
  res.redirect('/');
})

router.get('/getData', (req: RequstWithBody, res: Response) => {
  const isLogin = req.session ? req.session.login : false;
  if(isLogin) {
    const secret = 'x3b174jsx';
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;

    const analyzer = DellAnalyzer.getInstance();
    new Crowller(url, analyzer);
    res.send('获取数据');
  } else {
    res.send('请登陆后爬取内容')
  }
})

router.get('/showData', (req: RequstWithBody, res: Response) => {
  const isLogin = req.session ? req.session.login : false;
  if(isLogin) {
    try {
      const position = path.resolve(__dirname, '../data/course.json');
      const result = fs.readFileSync(position, 'utf8');
      res.send(JSON.parse(result))
    } catch (e) {
      res.send('尚未爬取到内容');
    }
    
  } else {
    res.send('请登陆后查看内容')
  }
})

export default router;