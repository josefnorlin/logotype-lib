import { InjectionToken } from "@angular/core";

export interface AfAgLogotypOptions {
  config: AfAgLogotypOptionsConfig;
}

export interface AfAgLogotypOptionsConfig {
  googleAnalitcsCategory: string;
  arbetsgivareKomponentUrl: string;
}

export const AF_AG_LOGOTYPOPTIONS_OPTIONS = new InjectionToken(
  "AF_AG_LOGOTYPOPTIONS_OPTIONS"
);
