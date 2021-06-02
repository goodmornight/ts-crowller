import fs from 'fs';
import path from 'path';
import superagent from 'superagent';
import cheerio from 'cheerio';

interface Course {
  title: string,
  count: number
}

interface CourseInfo {
  time: number,
  data: Course[]
}

interface Content {
  [propName: number]: Course[];
}

class Crowller {
  private secret = 'x3b174jsx';
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`;
  private filePath = path.resolve(__dirname, '../data/course.json');

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

  generateJsonContent(courseInfo: CourseInfo) {
    let fileContent: Content = {};
    if(fs.existsSync(this.filePath)) {
      fileContent = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'))
    }
    fileContent[courseInfo.time] = courseInfo.data;
    return fileContent;
  }

  async initSpiderProcess() {
    const html = await this.getRawHtml();
    const courseInfo = this.getCourseInfo(html);
    const fileContent = this.generateJsonContent(courseInfo);
    fs.writeFileSync(this.filePath, JSON.stringify(fileContent));
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