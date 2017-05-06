import { GaugeWebStepsPageDefinition } from './page-definition';

/**
 * A gauge project definition file
 *
 * @export
 * @interface GaugeWebStepsProjectDefinition
 */
export interface GaugeWebStepsProjectDefinition {
  pages: { [name: string]: GaugeWebStepsPageDefinition };
}
