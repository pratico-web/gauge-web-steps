/// <reference types="webdriverio" />
/// <reference types="expect" />

declare namespace GaugeWebSteps {
  export class WebDriverIOHelper {
    private client;
    options: WebdriverIO.Options;
    private binaryPath;
    private browsersConfig;
    configBrowser(browserName: string): void;
    constructor(browserName?: string, browserOptions?: {});
    readonly browser: WebdriverIO.Client<void>;
    init(done: Function): void;
    end(done: Function): void;
  }
  export type Expect = typeof expect;
  export interface GaugeHooks {
    beforeScenario: (callback: Function, options?: any) => void;
    afterScenario: (callback: Function, options?: any) => void;
    afterSuite: (callback: Function) => void;
    beforeSuite: (callback: Function) => void;
  }

  export interface Gauge {
    siteMap: SiteMap;
    expect: Expect;
    browser: "chromium" | "firefox" | "safari" | "chrome";
    wdHelper: WebDriverIOHelper;
    hooks: GaugeHooks;
    step(desc: string, stepImpl: Function): void;
  }

  export class SiteMap {
    private _baseUrl;
    private browser;
    private static _instance;
    pages: {
      [nome: string]: BasePageObject;
    };
    private baseUri;
    constructor(_baseUrl?: string);
    readonly baseUrl: string;
    getBaseUrl(): string;
    addPage(name: string, object: BasePageObject): SiteMap;
    setBrowser(browser: WebdriverIO.Client<void>): SiteMap;
    getBrowser(): WebdriverIO.Client<void>;
    resolveUrl(pathOrUrl: string): string;
    urlFor(pageName: string): string;
    getPageObject<T extends BasePageObject>(pageName: string): T;
    static readonly instance: SiteMap;
  }

  export type Element = WebdriverIO.Client<WebdriverIO.RawResult<WebdriverIO.Element>>;
  /**
   * Represents a PageObject to be used to navigate using webdriverio
   *
   * @export
   * @class BasePageObject
   */
  export class BasePageObject {
    protected url: string;
    protected map: SiteMap;
    private mappedElements;
    constructor(url: string, map?: SiteMap);
    setElements(elements: {
      [name: string]: GaugeWebStepsElementDefinition;
    }): void;
    getUrl(): string;
    setMap(map: SiteMap): void;
    getBrowser(): WebdriverIO.Client<void>;
    navigateTo(path?: string): WebdriverIO.Client<boolean>;
    clickOnLink(text: string): void;
    checkIsVisible(selector: string): WebdriverIO.Client<boolean>;
    getInnerInput(id: string): WebdriverIO.Client<WebdriverIO.RawResult<WebdriverIO.Element>> & WebdriverIO.RawResult<WebdriverIO.Element>;
    typeValue(id: string, value: string): WebdriverIO.Client<WebdriverIO.RawResult<null>> & WebdriverIO.RawResult<null>;
    selecionarOpcaoSelect(id: string, option: string): WebdriverIO.Client<WebdriverIO.RawResult<null>> & WebdriverIO.RawResult<null>;
    clickOnElement(id: string): WebdriverIO.Client<void>;
    findButton(text: string): Element;
    clickOnButton(text: string): WebdriverIO.Client<WebdriverIO.RawResult<null>> & WebdriverIO.RawResult<null>;
    waitSomeSeconds(seconds: number): WebdriverIO.Client<void>;
  }

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
}

declare var gauge: GaugeWebSteps.Gauge;

