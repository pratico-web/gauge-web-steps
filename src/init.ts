/* globals gauge, process*/
import { SiteMap } from './site-map';

import { WebDriverIOHelper } from './helpers/webdriver-io-helper';
import { GaugeWebStepsProjectLoader } from './project-loader';
import { Gauge } from './models/gauge';
import * as expect from 'expect';
if (process.env.DEBUG == 'true') {
  console.log('Init called');
}

declare var process: any;

export function setup(gauge: Gauge) {
  gauge.browser = process.env.browser;

  // loads the webdriverIOHelper
  let wdHelper = new WebDriverIOHelper(gauge.browser);

  gauge.wdHelper = wdHelper;

  // initializes the siteMap passing the wdHelper browser reference into it
  let siteMap: SiteMap = SiteMap.instance.setBrowser(wdHelper.browser);

  if (process.env.DEBUG == 'true') {
    console.log('BEFORE Project Loader!!');
  }
  // loads the pageObjects and the tests steps
  new GaugeWebStepsProjectLoader(siteMap).load(gauge, () => {
    gauge.siteMap = siteMap;
    gauge.expect = expect;
  });

  if (process.env.DEBUG == 'true') {
    console.log('AFTER Project Loader!!');
  }

  // stores the expect function into the global gauge object

  /**
   * Gauge Hooks - Gauge Hooks defined by the gauge framework
   * http://getgauge.io/documentation/user/current/language_features/execution_hooks.html
   */
  gauge.hooks.beforeScenario(function(context: any = null, done: any) {
    if (process.env.DEBUG == 'true') {
      console.log('WdHelper.init!!!!');
    }
    gauge.wdHelper.init(done);
  });

  gauge.hooks.afterScenario(function(context: any, done: any) {
    if (process.env.DEBUG == 'true') {
      console.log('WdHelper.end!!!!');
    }
    gauge.wdHelper.end(done);
  });
}
