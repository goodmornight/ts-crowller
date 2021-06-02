import fs from 'fs';
import cheerio from 'cheerio';
import { Analyzer } from './crowller';

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

export default class DellAnalyzer implements Analyzer{
  private static instance: DellAnalyzer;
  static getInstance () {
    if(!DellAnalyzer.instance) {
      DellAnalyzer.instance = new DellAnalyzer();
    }
    return DellAnalyzer.instance;
  }
  private getCourseInfo(html: string) {
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
  private generateJsonContent(courseInfo: CourseInfo, filePath: string) {
    let fileContent: Content = {};
    if(fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    }
    fileContent[courseInfo.time] = courseInfo.data;
    return fileContent;
  }
  public analyzer (html: string, filePath: string) {
    const courseInfo = this.getCourseInfo(html);
    const fileContent = this.generateJsonContent(courseInfo, filePath);
    return JSON.stringify(fileContent)
  }
  private constructor() {}
}