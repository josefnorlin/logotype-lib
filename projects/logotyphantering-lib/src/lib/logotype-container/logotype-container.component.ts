import { Component, OnInit, Input } from "@angular/core";
import { MatDialog } from "@angular/material";
import { finalize, catchError } from "rxjs/operators";
import { LogotypeDialogComponent } from "../logotype-dialog/logotype-dialog.component";
import { LogotyphanteringLibService } from "../logotyphantering-lib.service"
import { Logotyp } from "../model/Logotyp";
import { ResponseArbetsplats } from "../model/ResponseArbetsplats";

@Component({
  selector: "enl-logotype-container",
  templateUrl: "./logotype-container.component.html",
  styleUrls: ["./logotype-container.component.scss"]
})
export class LogotypeContainerComponent implements OnInit {
  logotype: Logotyp;
  loading = true;
  noWorkplaceFound = false;
  showError = false;

  private arbetsgivareId: string;

  @Input() arbetsplatsId: string = "empty";
  @Input() editMode: boolean = false;

  constructor(public dialog: MatDialog, private readonly service: LogotyphanteringLibService) { }

  ngOnInit() {
    this.service.arbetsgivareId.subscribe(
      arbetsgivareId => {       
          this.arbetsgivareId = arbetsgivareId;
          this.getLogotype();
      });

    this.service.refeshArbetsplatsLogo.subscribe(() => {
      if (this.arbetsplatsId !== "empty"  && !this.noWorkplaceFound && this.logotype && this.logotype.referensId === null) {
        this.loading = true;
        this.callServiceForArbetsplatsLogo();
      }
    });
  }

  getLogotype() {
    if (this.arbetsgivareId) {
      if (this.arbetsplatsId === "empty") {
        this.getOrganisationLogotype();
      }
      else {
        if (this.arbetsplatsId && !this.noWorkplaceFound) {
          this.getArbetsplatsLogotype();
        } else {
          this.noWorkplaceFound = true;
          this.loading = false;
        }
      }
    }
  }

  private getOrganisationLogotype() {
    this.loading = true;

    this.service.getArbetsgivare(this.arbetsgivareId).subscribe(
      arbetsgivare => {
        this.logotype = (arbetsgivare && arbetsgivare.logotyp) ? arbetsgivare.logotyp : null;

        this.service.getOrganizationsLogotype(this.arbetsgivareId)
          .pipe(
            finalize(() => { this.loading = false; }),
            catchError((error): any => this.handleError(error)))
          .subscribe((logotyp: Blob) => {
            this.createImageFromBlob(logotyp);
          });
      });
  }

  private getArbetsplatsLogotype() {
      this.service.getArbetsplats(this.arbetsplatsId)
        .pipe(
          catchError((error): any => {
            this.handleError(error);
            this.noWorkplaceFound = true;
            this.loading = false;
          }))
        .subscribe(
        (arbetsplats: ResponseArbetsplats) => {
          this.noWorkplaceFound = false;
          this.logotype = (arbetsplats && arbetsplats.logotyp) ? arbetsplats.logotyp :
          {
            referensId: null,
            filnamn: null,
            uppladdadAv: null,
            uppladdadTid: null,
            bredd: null,
            hojd: null,
            format: null,
            storlek: null,
            image: null
            };

          this.callServiceForArbetsplatsLogo();
        });

  }

  private callServiceForArbetsplatsLogo() {
      this.service.getArbetsplatLogotype(this.arbetsplatsId)
        .pipe(
          finalize(() => { this.loading = false; }),
        catchError((error): any => {
          this.handleError(error);
          this.logotype = {
            referensId: null,
            filnamn: null,
            uppladdadAv: null,
            uppladdadTid: null,
            bredd: null,
            hojd: null,
            format: null,
            storlek: null,
            image: null
          };
        }))
        .subscribe((logotyp: Blob) => {
          this.createImageFromBlob(logotyp);
        });
  }

  onButtonClick(): void {
    const dialogRef = this.dialog.open(LogotypeDialogComponent, {
      hasBackdrop: true,
      data: {
        logotype: this.logotype
      }
    });

    dialogRef.componentInstance.deleteLogoEvent.subscribe(() => {
      this.loading = true;
      if (this.logotype.referensId) {
        this.service.deleteLogotype(this.logotype.referensId)
          .pipe(
            finalize(() => {
            this.loading = false;
            if (this.logotype) {
              this.logotype.image = null;
              this.logotype.referensId = null;
            }
              this.service.setRefreshArbetsplatsLogo();
            }),
            catchError((error): any => this.handleError(error)))
          .subscribe(() => {});
      } else {
        if (this.logotype) {
          this.logotype.image = null;
          this.logotype.referensId = null;
        }
        this.loading = false;
      }
    });

    dialogRef.componentInstance.saveLogoEvent.subscribe((file: File) => {
      this.loading = true;
      this.service.uploadLogotype(file).subscribe(
        result => {
          this.logotype = result;
          if (this.arbetsplatsId === "empty") {
            this.service.publishLogotypeForArbetsgivare(this.arbetsgivareId, this.logotype.referensId)
              .pipe(
                finalize(() => {
                  this.loading = false;
                  this.service.setRefreshArbetsplatsLogo();
                }),
                catchError((error): any => this.handleError(error)))
              .subscribe(() => {
                this.readImageFile(file);
              });
          } else {
            this.service.publishLogotypeForArbetsplats(this.arbetsplatsId, this.logotype.referensId)
              .pipe(
                finalize(() => { this.loading = false; }),
                catchError((error): any => this.handleError(error)))
              .subscribe(() => {
                this.readImageFile(file);
              });
          }
        });
    });
  }

  private readImageFile(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        this.logotype.image = reader.result as string; 
    };
  }

   private createImageFromBlob(image: Blob) {
    const reader = new FileReader();
     reader.addEventListener("load", () => {
         this.logotype.image = reader.result as string;
     }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
   }

  private handleError(error: Response) {
    if (error.status !== 404) {
      this.showError = true;
    }
  }
}
