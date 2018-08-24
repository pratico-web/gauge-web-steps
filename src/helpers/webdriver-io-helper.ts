import * as webdriverio from 'webdriverio';
import * as shelljs from 'shelljs';

//TODO: avaliar migrar esta classe para um pacote node à parte, onde seria reaproveitável também pelo perdcomp
export class WebDriverIOHelper {
  private client: webdriverio.Client<void>;
  options: webdriverio.Options;

  private binaryPath: string;

  private browsersConfig = <any>{
    chromium: {
      binaryName: 'chromium-browser',
      macOSPath: '/Applications/Chromium.app/Contents/MacOS/Chromium',
      capabilitiesBrowserName: 'chrome',
    },
    firefox: {
      binaryName: 'firefox-browser',
      macOSPath: '/Applications/Firefox.app/Contents/MacOS/firefox',
    },
    safari: {
      binaryName: 'safari-browser',
      macOSPath: '/usr/bin/safaridriver',
    },
    chrome: {
      binaryName: 'chrome-browser',
      macOSPath: '/Applications/Chrome.app/Contents/MacOS/Chrome',
    },
  };

  configBrowser(browserName: string) {
    let browserConfig = this.browsersConfig[browserName];

    if (browserConfig) {
      let binaryName = shelljs.which(browserConfig['binaryName']);

      if (!binaryName) {
        binaryName = browserConfig['macOSPath'];
      }

      this.binaryPath = binaryName;
    } else {
      throw new Error('Defina o browser a ser executado. As opções são: chromium, firefox, safari e chrome.');
    }
  }

  constructor(browserName: string = 'chromium', browserOptions: {} = {}) {
    this.configBrowser(browserName);

    let capabilitiesBrowserName = this.browsersConfig[browserName].capabilitiesBrowserName || browserName;

    let capabilities = <any>{ browserName: capabilitiesBrowserName };
    capabilities[capabilitiesBrowserName + 'Options'] = browserOptions;

    if (this.binaryPath) {
      capabilities[capabilitiesBrowserName + 'Options'] = {
        binary: this.binaryPath,
        args: ['--no-sandbox'],
      };
    }

    this.options = {
      // logLevel: 'debug',
      coloredLogs: true,
      desiredCapabilities: capabilities,
      waitforTimeout: 3000,
    };
    this.client = webdriverio.remote(this.options);
  }

  get browser(): webdriverio.Client<void> {
    return this.client;
  }

  // ao invés de colocar this.client.init().then(done), escrevemos desta forma abaixo.
  // isso porque o método init resolve com algum objeto que informa à respeito da inicialização,
  // e o método done, se receber algum parâmetro, este parâmetro representa um erro.
  // então, tivemos que escrever da forma abaixo para evitar que o retorno do método init (que não representa erro)
  // seja passado para o done (que espera um parâmetro de erro)
  init(done: Function) {
    this.client
      .init()
      .then(() => done())
      .catch(error => console.log('Error initializing wdio: ' + error));
  }

  // ver explicação no método init
  end(done: Function) {
    this.client.end().finally(() => done());
  }
}
