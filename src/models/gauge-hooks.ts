export interface GaugeHooks {
  beforeScenario: (callback: Function, options?: any) => void;
  afterScenario: (callback: Function, options?: any) => void;
  afterSuite: (callback: Function) => void;
  beforeSuite: (callback: Function) => void;
}
