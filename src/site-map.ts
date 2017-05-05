import { BasePageObject } from './base-page-object';
import * as webdriverio from 'webdriverio';
export class SiteMap {
  private browser: webdriverio.Client<void>;
  private static _instance: SiteMap = null;
  pages: { [nome: string]: BasePageObject } = {};
  baseUrl: string = 'http://localhost:4200';

  setBrowser(browser: webdriverio.Client<void>): SiteMap {
    this.browser = browser;
    return this;
  }

  getBrowser(): webdriverio.Client<void> {
    return this.browser;
  }

  getUrl(pageName: string) {
    if (this.pages[pageName]) {
      return this.baseUrl + (this.pages[pageName].path || '/');
    } else {
      throw `PageObject not found with name'${pageName}'!`;
    }
  }

  getPageObject<T>(apgeName: string): T {
    if (this.pages[apgeName]) {
      return <any>this.pages[apgeName];
    } else {
      throw `PageObject not found with name '${apgeName}'!`;
    }
  }

  static get instance(): SiteMap {
    if (!SiteMap._instance) {
      SiteMap._instance = new SiteMap();
    }
    return SiteMap._instance;
  }

}
