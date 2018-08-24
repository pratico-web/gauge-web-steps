import { BasePageObject } from './base-page-object';
import * as webdriverio from 'webdriverio';

import * as url from 'url';

export class SiteMap {
  private browser: webdriverio.Client<void>;
  private static _instance: SiteMap = null;
  pages: { [nome: string]: BasePageObject } = {};

  private baseUri: url.Url = null;

  constructor(private _baseUrl: string = 'http://localhost:4200') {
    this.baseUri = url.parse(_baseUrl);
  }

  get baseUrl() {
    return this.getBaseUrl();
  }

  getBaseUrl() {
    return this.baseUri;
  }

  getBaseUri() {
    return this.baseUri;
  }

  addPage(name: string, object: BasePageObject): SiteMap {
    this.pages[name] = object;
    object.setMap(this);
    return this;
  }

  setBrowser(browser: webdriverio.Client<void>): SiteMap {
    this.browser = browser;
    return this;
  }

  getBrowser(): webdriverio.Client<void> {
    return this.browser;
  }

  resolveUrl(pathOrUrl: string): string {
    let resolvedUrl = url.resolve(this._baseUrl, pathOrUrl);
    return resolvedUrl;
  }

  urlFor(pageName: string) {
    if (this.pages[pageName]) {
      return this.pages[pageName].getUrl();
    } else {
      throw `PageObject not found with name'${pageName}'!`;
    }
  }

  getPageObject<T extends BasePageObject>(pageName: string): T {
    if (this.pages[pageName]) {
      return <any>this.pages[pageName];
    } else {
      throw `PageObject not found with name '${pageName}'!`;
    }
  }

  static get instance(): SiteMap {
    if (!SiteMap._instance) {
      SiteMap._instance = new SiteMap();
    }
    return SiteMap._instance;
  }
}
