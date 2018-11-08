import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { map, tap } from "rxjs/operators";
import { ResponseAnvandarkonto } from "./model/ResponseAnvandarkonto";
import { ResponseArbetsgivare } from "./model/ResponseArbetsgivare";
import { ResponseArbetsplats } from "./model/ResponseArbetsplats";
import { Logotyp } from "./model/Logotyp";
import { AfAgLogotypOptionsConfig, AF_AG_LOGOTYPOPTIONS_OPTIONS } from "./model/AfAgLogotypOptions";


@Injectable(({
  providedIn: "root"
}) as any)

export class LogotyphanteringLibService {
  arbetsgivareId = new BehaviorSubject<string>(null);
  arbetsplatser = new BehaviorSubject<Array<ResponseArbetsplats>>([]);
  refeshArbetsplatsLogo = new BehaviorSubject<string>("");

  private arbetsgivareURL: string = "";

  constructor(private readonly http: HttpClient, @Inject(AF_AG_LOGOTYPOPTIONS_OPTIONS) config: AfAgLogotypOptionsConfig) {   
    this.arbetsgivareURL = config.arbetsgivareKomponentUrl;
    this.retrieveInitialInformation();
  }

  private retrieveInitialInformation() {
    this.getAnvandarkonto()
      .subscribe(
      anvandare => {
        if (anvandare.arbetsgivareId) {
          this.arbetsgivareId.next(anvandare.arbetsgivareId);
        }
        });
  }

  deleteLogotype(logoReferenceId: string): Observable<any> {
    const endPoint = `logotyper/${logoReferenceId}`;
    return this.http.delete(this.arbetsgivareURL + endPoint);
  }

  setRefreshArbetsplatsLogo() {
    this.refeshArbetsplatsLogo.next(Math.random().toString(36).substr(2, 9)); 
  }

  private getAnvandarkonto(): Observable<ResponseAnvandarkonto>{
    const endPoint = `anvandarkonton`;

    return this.http.get<ResponseAnvandarkonto[]>(this.arbetsgivareURL + endPoint).pipe(
      map(res => res[0]));
  }

  getArbetsgivare(arbetsgivareId: string): Observable<ResponseArbetsgivare>{
    const endPoint = `arbetsgivare/${arbetsgivareId}/mini`;
    return this.http.get<ResponseArbetsgivare>(this.arbetsgivareURL + endPoint);
  }

  getArbetsplats(arbetsplatsId: string): Observable<ResponseArbetsplats>{
    const endPoint = `arbetsplatser/${arbetsplatsId}/mini`;
    return this.http.get<ResponseArbetsplats>(this.arbetsgivareURL + endPoint);
  }

  getOrganizationsLogotype(arbetsgivareId: string): Observable<Blob> {
    const endPoint = `arbetsgivare/${arbetsgivareId}/logotyper/logo.png`;
    return this.http.get(this.arbetsgivareURL + endPoint, { responseType: "blob" });
  }

  getArbetsplatLogotype(arbetsplatsId: string): Observable<Blob> {
    const endPoint = `arbetsplatser/${arbetsplatsId}/logotyper/logo.png`;
    return this.http.get(this.arbetsgivareURL + endPoint, { responseType: "blob" });
  }

  uploadLogotype(file: File): Observable<Logotyp> {
    const endPoint = `logotyper`;
    const headers = new HttpHeaders();
    headers.append("Content-Type", "multipart/form-data; boundary=----WebKitFormBoundaryR6kCoqmc5rn4lKI9");

    const formData = new FormData();
    formData.append("file", file);

    return this.http.post<Logotyp>(this.arbetsgivareURL + endPoint, formData, { headers: headers});
  }

  publishLogotypeForArbetsgivare(arbetsgivareId: string, logoReferenceId: string) {
    const endPoint = `arbetsgivare/${arbetsgivareId}/logotyper/${logoReferenceId}`;

    return this.http.put(this.arbetsgivareURL + endPoint, { body: null })
      .pipe(
        tap(() => { this.setRefreshArbetsplatsLogo();})
      );
  }

  publishLogotypeForArbetsplats(arbetsplatsId: string, logoReferenceId: string) {
    const endPoint = `arbetsplatser/${arbetsplatsId}/logotyper/${logoReferenceId}`;
    return this.http.put(this.arbetsgivareURL + endPoint, {body: null});
  }
}
