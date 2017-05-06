import { GaugeWebStepsElementDefinition } from './element-definition';

/**
 * Represents a Page which will be under functional test
 *
 * @export
 * @interface GaugeWebStepsPageDefinition
 */
export interface GaugeWebStepsPageDefinition {
  /**
   * The url of the page
   *
   * @type {string}
   * @memberof GaugeWebStepsPageDefinition
   */
  url: string;

  /**
   * Set of elements presents in the page
   *
   * @type {{ [name: string]: GaugeWebStepsElementDefinition }}
   * @memberof GaugeWebStepsPageDefinition
   */
  elements: { [name: string]: GaugeWebStepsElementDefinition };
}
