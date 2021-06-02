import superagent from 'superagent';
import cheerio from 'cheerio';

interface Course {
  title: string,
  count: number
}

class Crowller {
  private secret = 'x3b174jsx';
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`;

  getCourseInfo(html: string) {
    const $ = cheerio.load(html);
    const courseItems = $('.course-item');
    const courseInfos: Course[] = [];
    courseItems.map((indx, elem) => {
      const desc = $(elem).find('.course-desc');
      const title = desc.eq(0).text();
      const count = parseInt(desc.eq(1).text().split('：')[1], 10);
      courseInfos.push({
        title,
        count
      })
    });
    
    return {
      time: new Date().getTime(),
      data: courseInfos
    }
  }

  async initSpiderProcess() {
    const html = await this.getRawHtml();
    const courseInfo = this.getCourseInfo(html);
    console.log(courseInfo)
  }

  async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }

  constructor () {
    this.initSpiderProcess()
  }
}

const crowller = new Crowller();