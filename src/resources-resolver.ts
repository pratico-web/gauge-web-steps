import * as ajv from 'ajv';
import * as path from 'path';
import { GaugeWebStepsPageDefinition } from './models/page-definition';
import { GAUGE_DEFINITION_SCHEMA_FILE_NAME } from './models/constants';
import { GaugeWebStepsProjectDefinition } from './models/project-definition';
import { BasePageObject } from './base-page-object';

export abstract class ResourcesResolver {
  loadPageObjects(): { [name: string]: BasePageObject } {
    const result: { [name: string]: BasePageObject } = {};
    Object.keys(this.getGaugeProjectDefinition().pages).forEach((pageName: string) => {
      const page: GaugeWebStepsPageDefinition = this.getGaugeProjectDefinition().pages[pageName];
      result[pageName] = new BasePageObject(page.url);
      result[pageName].setElements(page.elements);
    })
    return result;
  }

  validateDefinition(obj: any) {
    let schema = require(path.join(__dirname, './', GAUGE_DEFINITION_SCHEMA_FILE_NAME));
    let ajvObj = new ajv({ allErrors: true });
    ajvObj.addSchema('gauge-definition', schema);
    ajvObj.validate('gauge-definition', obj);
    if (ajvObj.errors && ajvObj.errors.length > 0) {
      throw new Error(`Not a valid gauge-e2e schema. See errors bellow: \n${JSON.stringify(ajvObj.errors, null, '\t')}`);
    }
  }

  abstract loadSteps(): void;
  abstract getRootFolder(): string;
  abstract getGaugeProjectDefinition(): GaugeWebStepsProjectDefinition;
}
