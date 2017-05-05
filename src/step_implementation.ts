/* globals gauge*/
import * as path from 'path';
import * as  expect from 'expect';
import { SiteMap } from './site-map';
import { Gauge } from './models/gauge';
import { getGaugeProjectRoot } from './helpers/get-gauge-project-root';
import { loadPageObjects } from './load-page-objects';
import { WebDriverIOHelper } from "./helpers/webdriver-io-helper";

declare var gauge: Gauge;
gauge.browser = process.env.browser;

// define variaveis globais do webdriverIOHelper
let wdHelper = new WebDriverIOHelper(gauge.browser);

gauge.wdHelper = wdHelper;

let siteMap: SiteMap = SiteMap.instance.setBrowser(wdHelper.browser);

const gaugeProjectRoot = getGaugeProjectRoot();

const gaugeDefinition = require(path.join(gaugeProjectRoot, 'gauge-e2e.config.json'))

loadPageObjects(gaugeProjectRoot, siteMap, gaugeDefinition);

gauge.siteMap = siteMap;

// inicializa o expect do chai (assertion library)
gauge.expect = expect;

/**
 * Importa os steps definidos na pasta steps
 */
require(path.join(gaugeProjectRoot, './steps'));


/**
 * Gauge Hooks - Ganchos de execução disponibilizados pelo Gauge
 * http://getgauge.io/documentation/user/current/language_features/execution_hooks.html
 */
gauge.hooks.beforeScenario(function (context: any = null, done: any) {
  gauge.wdHelper.init(done);
});

gauge.hooks.afterScenario(function (context: any, done: any) {
  gauge.wdHelper.end(done);
});
