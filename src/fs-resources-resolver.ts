import * as fs from 'fs';
import * as path from 'path';
import { getGaugeProjectRoot } from './helpers/get-gauge-project-root';
import { ResourcesResolver } from './resources-resolver';
import { GaugeProjectDefinition } from './models/gauge-project-definition';
import { GAUGE_DEFINITION_FILE_NAME } from './models/constants';

import requireDir = require('require-dir');

export class FsResourcesResolver extends ResourcesResolver {

  private rootFolder: string;
  constructor() {
    super();
    this.rootFolder = getGaugeProjectRoot();
    if (!fs.existsSync(this.rootFolder)) {
      throw new Error('Strange error here. Gauge Project Root not found!');
    }
  }

  getRootFolder() {
    return this.rootFolder;
  }

  loadSteps(): void {
    requireDir(path.join(this.rootFolder, '/steps'));
  }

  loadPageObjects(): void {
    this.getGaugeProjectDefinition()
  }

  getGaugeProjectDefinition(): GaugeProjectDefinition {
    const definitionFileName = path.join(this.rootFolder, GAUGE_DEFINITION_FILE_NAME);
    if (fs.existsSync(definitionFileName)) {
      try {
        let definitionObject = require(definitionFileName);
        super.validateDefinition(definitionObject)
        return definitionObject;
      } catch (e) {
        throw new Error(`Could not evaluate file in ${definitionFileName}\n${e.message}`);
      }
    } else {
      throw new Error(`Could not read file in ${definitionFileName}`);
    }
  }




}
