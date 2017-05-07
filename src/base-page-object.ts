import * as webdriverio from 'webdriverio';
import { SiteMap } from './site-map';
import { GaugeWebStepsElementDefinition } from './models/element-definition';


export type Element = webdriverio.Client<webdriverio.RawResult<webdriverio.Element>>;

/**
 * Represents a PageObject to be used to navigate using webdriverio
 *
 * @export
 * @class BasePageObject
 */
export class BasePageObject {

  private mappedElements: { [name: string]: GaugeWebStepsElementDefinition };

  constructor(protected url: string, protected map?: SiteMap) {
  }

  setElements(elements: { [name: string]: GaugeWebStepsElementDefinition }) {
    this.mappedElements = elements;
  }

  getUrl(): string {
    return (this.map) ? this.map.resolveUrl(this.url) : this.url;
  }

  setMap(map: SiteMap) {
    this.map = map;
  }

  getBrowser(): webdriverio.Client<void> {
    return this.map.getBrowser();
  }

  navigateTo(path: string = null): webdriverio.Client<boolean> {
    let urlTo = this.map.resolveUrl(path ? path : this.url );
    return this.getBrowser().url(urlTo).then(() => {
      return this.getBrowser().getUrl().then(currentUrl => new RegExp(urlTo).test(currentUrl));
    });
  }

  clickOnLink(text: string) {
    this.getBrowser().click(`a=${text}`);
  }

  checkIsVisible(selector: string): webdriverio.Client<boolean> {
    return this.getBrowser().isVisible(selector);
  }

  getInnerInput(id: string) {
    return this.getBrowser().element('#' + id + ' input');
  }

  typeValue(id: string, value: string) {
    let fieldSelector = '#' + id + ' input';
    return this.getBrowser().addValue(fieldSelector, value);
  }

  selecionarOpcaoSelect(id: string, option: string) {
    return this.clickOnElement(id)
      .waitForVisible('ion-alert', 250)
      .click(`div.alert-radio-label*=${option}`)
      .pause(250)
      .click('span.button-inner=OK');
  }

  getElement(elementName: string) {
    return this.getBrowser().element(this.getSelectorForElement(elementName));
  }

  clickOnElement(elementName: string) {
    return this.getBrowser().element(this.getSelectorForElement(elementName)).click();
  }

  typeOnElement(elementName: string, value: string) {
    this.getElement(elementName).addValue(value);
  }

  setValue(elementName: string, value: string) {
    this.getElement(elementName).setValue(value);
  }

  findButton(text: string): Element {
    return this.getBrowser().element(`button=${text}`);
  }

  clickOnButton(text: string) {
    return this.getBrowser().click(`button=${text}`);
  }

  waitSomeSeconds(seconds: number) {
    return this.getBrowser().pause(seconds * 1000);
  }

  getSelectorForElement(elementName: string) {
    let selector = '';
    if (this.mappedElements[elementName]) {
      let el = this.mappedElements[elementName];
      if (el.selector) {
        selector = el.selector;
      } else if (el.id) {
        selector = `#${el.id}`
      } else {
        selector = el.tagName;
      }
      if (el.text) {
        selector = `${selector}*=${el.text}`;
      }
    }
    return selector;
  }
}
