import * as ajv from 'ajv';
import * as fs from 'fs';
import * as path from 'path';
import { GaugeWebStepsPageDefinition } from './models/page-definition';
import {
  GAUGE_DEFINITION_SCHEMA_FILE_NAME,
  GAUGE_PROJECT_DEFINITION_FILE_NAME,
  GAUGE_PROJECT_DEFINITION_SCHEMA_NAME,
} from './models/constants';
import { GaugeWebStepsProjectDefinition } from './models/project-definition';
import { BasePageObject } from './base-page-object';
import { getGaugeProjectRoot } from './helpers/get-gauge-project-root';
import { SiteMap } from './site-map';
import { Gauge } from './models/gauge';

/**
 * Load the pageObjects into the siteMap and also loads the gauge steps
 *
 * @export
 * @abstract
 * @class GaugeWebStepsProjectLoader
 */
export class GaugeWebStepsProjectLoader {
  private rootFolder: string;

  constructor(protected siteMap: SiteMap) {
    this.rootFolder = getGaugeProjectRoot();
    if (!fs.existsSync(this.rootFolder)) {
      throw new Error('Strange error here. Gauge Project Root not found!');
    }
  }

  getRootFolder() {
    return this.rootFolder;
  }

  /**
   *
   *
   * @returns {GaugeWebStepsProjectLoader}
   *
   * @memberof GaugeWebStepsProjectLoader
   */
  load(gauge: Gauge, callback: Function): GaugeWebStepsProjectLoader {
    this.loadPageObjects();
    callback();
    return this;
  }

  protected loadPageObjects() {
    if (process.env.DEBUG == 'true') {
      console.log('Loading page Objects!!!!');
    }
    Object.keys(this.getGaugeProjectDefinition().pages).forEach((pageName: string) => {
      const page: GaugeWebStepsPageDefinition = this.getGaugeProjectDefinition().pages[pageName];
      //this.pagesLoaded[pageName] = new BasePageObject(page.url, this.siteMap);
      //this.pagesLoaded[pageName].setElements(page.elements);
      this.siteMap.addPage(pageName, new BasePageObject(page.url, this.siteMap));
    });
  }

  protected validateDefinition(obj: any) {
    let schema = require(path.join(__dirname, '../schemas', GAUGE_DEFINITION_SCHEMA_FILE_NAME));
    let ajvObj = new ajv({ allErrors: true });
    ajvObj.addSchema(Object.assign(schema, { id: GAUGE_PROJECT_DEFINITION_SCHEMA_NAME }));
    ajvObj.validate(GAUGE_PROJECT_DEFINITION_SCHEMA_NAME, obj);
    if (ajvObj.errors && ajvObj.errors.length > 0) {
      throw new Error(
        `Not a valid gauge-e2e schema. See errors bellow: \n${JSON.stringify(ajvObj.errors, null, '\t')}`
      );
    }
  }

  protected getGaugeProjectDefinition(): GaugeWebStepsProjectDefinition {
    const definitionFileName = path.join(this.rootFolder, GAUGE_PROJECT_DEFINITION_FILE_NAME);
    if (fs.existsSync(definitionFileName)) {
      try {
        let definitionObject = require(definitionFileName);
        this.validateDefinition(definitionObject);
        return definitionObject;
      } catch (e) {
        throw new Error(`Could not evaluate file in ${definitionFileName}\n${e.message}`);
      }
    } else {
      throw new Error(`Could not read file in ${definitionFileName}`);
    }
  }
}
