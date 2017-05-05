export interface SiteMapConfig {
  name: string;
  url: string;
  pageObjectPath: string;
}

export interface SiteMapHashMapConfig {
  [name: string]: SiteMapConfig;
}
