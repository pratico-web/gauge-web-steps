import { SiteMap } from './site-map';
import { SiteMapHashMapConfig } from './models/sitemap-config';
import * as path from 'path';
/**
 * It loads pageObjects from the gauge-pages.json definition file
 */
export function loadPageObjects(gaugeProjectRoot: string, siteMap: SiteMap, config: SiteMapHashMapConfig) {
  Object.keys(config).forEach((key) => {
    let pageConfig = config[key];
    let typePageObject = require(path.resolve(gaugeProjectRoot, 'tests/page-objects/', pageConfig.pageObjectPath));
    siteMap.pages[pageConfig.name] = new typePageObject(pageConfig.url, siteMap.getBrowser())
  });
}
