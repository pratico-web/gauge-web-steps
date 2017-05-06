import { SiteMap } from './site-map';
import { BasePageObject } from './base-page-object';
import * as webdriverio from 'webdriverio';


describe(SiteMap.name, () => {
  let siteMap: SiteMap;
  let samplePageObject = new BasePageObject('http://localhost:8100/page1');
  beforeEach(() => {
    siteMap = new SiteMap('http://localhost:8100')
      .addPage('page1', samplePageObject);
  });
  it('adds a new page', () => {
    let newPageObject = new BasePageObject('http://localhost:8100/page2');
    siteMap.addPage('page2', newPageObject );
    expect(Object.keys(siteMap.pages)).toContain('page2');
    expect(siteMap.pages['page2']).toEqual(newPageObject);
  });
  it('returns the pageObject for a given page name', () => {
    expect(siteMap.getPageObject('page1')).toEqual(samplePageObject);
  });

  it('returns the url of a specific page', () => {
    expect(siteMap.urlFor('page1')).toEqual('http://localhost:8100/page1');
  });

  it('getBaseUrl() returns the siteMap baseUrl', () => {
    expect(siteMap.getBaseUrl()).toEqual('http://localhost:8100');
  });

  it('property baaseUrl returns the siteMap baseUrl', () => {
    expect(siteMap.baseUrl).toEqual('http://localhost:8100');
  });

  it('setBrowser() stores the webdriver browser reference', () => {
    let wdMock = <webdriverio.Client<void>>{};
    siteMap.setBrowser(wdMock);
    expect(siteMap.getBrowser()).toEqual(wdMock);
  });
});
