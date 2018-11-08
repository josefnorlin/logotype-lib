import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { LogotyphanteringLibModule, AfAgLogotypOptions } from "af-shared-js-ag-logotyphantering-lib";
import { AppComponent } from "./app.component";
import { AfJwtHttpModule, AfJwtHttpOptions } from "af-jwt-http";
import { environment } from "src/environments/environment";

const jwtOptions: AfJwtHttpOptions = {
  config: {
    idpServer: environment.jsonWebTokenIdpServer,
    clientId: environment.jsonWebTokenClientId,
    headers: environment.jsonWebTokenHeaders,
    whitelistedHosts: environment.whitelistedHosts
  }
}

const logoOptions: AfAgLogotypOptions = {
  config: {
    googleAnalitcsCategory: "LogotypLib",
    arbetsgivareKomponentUrl: "http://arbetsgivare.arbetsformedlingen.se/arbetsgivare/rest/af/v3/"
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AfJwtHttpModule.forRoot(jwtOptions),
    LogotyphanteringLibModule.forRoot(logoOptions)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
