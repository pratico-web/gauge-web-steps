import { GaugeHooks } from './gauge-hooks';
import { WebDriverIOHelper } from "../helpers/webdriver-io-helper";
import { SiteMap } from '../site-map';
import * as  expect from 'expect';

export type Expect = typeof expect;

export interface Gauge {
  siteMap: SiteMap;
  expect: Expect;
  browser: "chromium" | "firefox" | "safari" | "chrome"
  wdHelper: WebDriverIOHelper,
  hooks: GaugeHooks;
  step(desc: string, stepImpl: Function): void;
}
