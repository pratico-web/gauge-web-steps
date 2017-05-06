import * as ajv from 'ajv';
import * as path from 'path';
import { GaugeProjectDefinition } from './models/gauge-project-definition';
import { GAUGE_DEFINITION_SCHEMA_FILE_NAME } from './models/constants';

export abstract class ResourcesResolver {
  abstract getRootFolder(): string;
  abstract loadSteps(): void;
  abstract loadPageObjects(): void;
  abstract getGaugeProjectDefinition(): GaugeProjectDefinition;

  validateDefinition(obj: any) {
    let schema = require(path.join(__dirname, './', GAUGE_DEFINITION_SCHEMA_FILE_NAME));
    let ajvObj = new ajv({ allErrors: true });
    ajvObj.addSchema('gauge-definition', schema);
    ajvObj.validate('gauge-definition', obj);
    if (ajvObj.errors && ajvObj.errors.length > 0) {
      throw new Error(`Not a valid gauge-e2e schema. See errors bellow: \n${JSON.stringify(ajvObj.errors, null, '\t')}`);
    }
  }
}
