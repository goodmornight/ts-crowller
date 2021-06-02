import fs from 'fs';
import path from 'path';
import superagent from 'superagent';
import DellAnalyzer from './dellAnalyzer';

export interface Analyzer {
  analyzer: (html:string, filePath: string) => string
}

class Crowller {

  private filePath = path.resolve(__dirname, '../data/course.json');

  writeFile(fileContent:string) {
    fs.writeFileSync(this.filePath, fileContent);
  }

  async initSpiderProcess() {
    const html = await this.getRawHtml();
    const fileContent = this.analyzer.analyzer(html, this.filePath)
    this.writeFile(fileContent)
  }

  async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }

  constructor(private url: string, private analyzer: Analyzer) {
    this.initSpiderProcess()
  }
}
const secret = 'x3b174jsx';
const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;

const analyzer = new DellAnalyzer()
const crowller = new Crowller(url, analyzer);