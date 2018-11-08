import { Logotyp } from "./Logotyp";

export interface ResponseArbetsgivare {
  arbetsgivareId: string;
  namn: string;
  organisationsnummer: string;
  logotyp: Logotyp;
}
