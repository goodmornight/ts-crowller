import { Router, Request, Response } from 'express';
import Crowller from './crowller';
import DellAnalyzer from './dellAnalyzer';

interface RequstWithBody extends Request {
  body: {
    [key: string]: string | undefined
  }
}

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send(`
  <html>
    <body>
      <form method="post" action="/getData">
        <input type="password" name="password" />
        <button>提交</button>
      </form>
    </body>
  </html>
  `);
})

router.post('/getData', (req: RequstWithBody, res: Response) => {
  if(req.body.password === '123') {
    const secret = 'x3b174jsx';
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;

    const analyzer = DellAnalyzer.getInstance();
    new Crowller(url, analyzer);
    res.send('获取数据');
  } else {
    res.send(`${req.teacherName} Error`)
  }
})

export default router;