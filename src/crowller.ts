import superagent from 'superagent';

class Crowller {
  private secret = 'x3b174jsx';
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`;
  private rawHtml = '';

  async getRawHtml() {
    const result = await superagent.get(this.url);
    console.log(result.text);
    this.rawHtml = result.text;
  }

  constructor () {
    this.getRawHtml();
  }
}

const crowller = new Crowller();