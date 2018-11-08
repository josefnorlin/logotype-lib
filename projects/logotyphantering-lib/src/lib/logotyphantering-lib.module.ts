import { NgModule, ModuleWithProviders } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { MatDialogModule } from "@angular/material/dialog";
import { LogotyphanteringLibComponent } from "./logotyphantering-lib.component";
import { LogotypeContainerComponent } from "./logotype-container/logotype-container.component";
import { LogotypeDialogComponent } from "./logotype-dialog/logotype-dialog.component";
import { AfAlertComponent } from "./af-alert/af-alert.component";
import { AfAgLogotypOptions, AF_AG_LOGOTYPOPTIONS_OPTIONS } from "./model/AfAgLogotypOptions";
import { FileDropModule } from "ngx-file-drop";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    FileDropModule
  ],
  declarations: [LogotyphanteringLibComponent, LogotypeContainerComponent, LogotypeDialogComponent, AfAlertComponent],
  exports: [LogotyphanteringLibComponent],
  entryComponents: [
    LogotypeDialogComponent
  ]
})
export class LogotyphanteringLibModule {
  static forRoot(options: AfAgLogotypOptions): ModuleWithProviders {
    return {
      ngModule: LogotyphanteringLibModule,
      providers: [
        {
          provide: AF_AG_LOGOTYPOPTIONS_OPTIONS,
          useValue: options.config
        }
      ]
    };
  }
}
