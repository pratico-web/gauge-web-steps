import * as webdriverio from 'webdriverio';


export type Element = webdriverio.Client<webdriverio.RawResult<webdriverio.Element>>;

export class BasePageObject {

  path: string = '';

  constructor(protected url: string, protected browser?: webdriverio.Client<void>) {
  }

  setBrowser(browser: webdriverio.Client<void>) {
    this.browser = browser;
  }

  navigateTo(path: string = ''): webdriverio.Client<boolean> {
    let urlTo = this.url + path;
    return this.browser.url(urlTo).then(() => {
      return this.browser.getUrl().then(currentUrl => new RegExp(urlTo).test(currentUrl));
    });
  }

  clickOnLink(text: string) {
    this.browser.click(`a=${text}`);
  }

  checkIsVisible(selector: string): webdriverio.Client<boolean> {
    return this.browser.isVisible(selector);
  }

  getInnerInput(id: string) {
    return this.browser.element('#' + id + ' input');
  }

  typeValue(id: string, value: string) {
    let fieldSelector = '#' + id + ' input';
    return this.browser.addValue(fieldSelector, value);
  }

  selecionarOpcaoSelect(id: string, option: string) {
    return this.clickOnElement(id)
      .waitForVisible('ion-alert', 250)
      .click(`div.alert-radio-label*=${option}`)
      .pause(250)
      .click('span.button-inner=OK');
  }

  clickOnElement(id: string) {
    return this.browser.click('#' + id).pause(5000);
  }

  findButton(text: string): Element {
    return this.browser.element(`button=${text}`);
  }

  clickOnButton(text: string) {
    return this.browser.click(`button=${text}`);
  }

  waitSomeSeconds(seconds: number) {
    return this.browser.pause(seconds * 1000);
  }

}
