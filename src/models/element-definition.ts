/**
 * Represents a page element
 *
 * @export
 * @interface GaugeWebStepsElementDefinition
 */
export interface GaugeWebStepsElementDefinition {
  /**
   * Id of a DOM Element
   *
   * @type {string}
   * @memberof GaugeWebStepsElementDefinition
   */
  id: string;

  /**
   * A css selector which matchs to a DOM Element
   *
   * @type {string}
   * @memberof GaugeWebStepsElementDefinition
   */
  selector: string;

  /**
   * A text content of a DOM Element
   *
   * @type {string}
   * @memberof GaugeWebStepsElementDefinition
   */
  text: string;

  /**
   * A tagName which matches to an element or a set of elements
   *
   * @type {string}
   * @memberof GaugeWebStepsElementDefinition
   */
  tagName: string;
}
