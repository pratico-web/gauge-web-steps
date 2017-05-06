export interface GaugeElementDefinition {
  id: string;
  name: string;
  selector: string;
  text: string;
  tagName: string;
}

export interface GaugePagesDefinition {
  url: string;
  name: string;
  elements: GaugeElementDefinition[];
}

export interface GaugeProjectDefinition {
  pages: GaugePagesDefinition[];

}
