import fs from 'fs';
import path from 'path';
import superagent from 'superagent';


export interface Analyzer {
  analyzer: (html:string, filePath: string) => string
}

class Crowller {

  private filePath = path.resolve(__dirname, '../../data/course.json');

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
export default Crowller;