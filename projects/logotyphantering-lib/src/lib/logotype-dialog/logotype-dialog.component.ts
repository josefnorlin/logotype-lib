import { Component, OnInit, Inject, EventEmitter, Output} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Logotyp } from "../model/Logotyp";
import { UploadEvent, UploadFile, FileSystemFileEntry } from "ngx-file-drop";

@Component({
  selector: "enl-logotype-dialog",
  templateUrl: "./logotype-dialog.component.html",
  styleUrls: ["./logotype-dialog.component.scss"]
})
export class LogotypeDialogComponent implements OnInit {
  loading = false;
  fileIsTooBig = false;
  wrongFileFormat = false;
  technicalProblem = false;
  selectedLogotype: string;
  selectedLogotypeFile: File;
  private maxFileSize = 512000; // 500 KB
  newLogotypeSelected = false;
  logotype: Logotyp;

  @Output() saveLogoEvent = new EventEmitter();
  @Output() deleteLogoEvent = new EventEmitter();

  constructor(public dialogRef: MatDialogRef<LogotypeDialogComponent>, @Inject(MAT_DIALOG_DATA) private readonly data: any) {
    if (data && data.logotype) {
      this.logotype = data.logotype;
      this.selectedLogotype = data.logotype.image;
    }
  }

  ngOnInit() {
    this.dialogRef.disableClose = true; //disable default close operation

    this.dialogRef.backdropClick().subscribe(() => {
      this.onClose();
    });
  }

  onNoClick(): void {
    this.onClose();
  }

  private resetWarningMessages() {
    this.wrongFileFormat = false;
    this.fileIsTooBig = false;
    this.technicalProblem = false;
  }

  handleDropFile(event: UploadEvent) {
    this.loading = true;
    this.resetWarningMessages();

    const files = event.files;
    const fileEntry = files[0].fileEntry as FileSystemFileEntry; //if multiple files are selected -> take first one

    fileEntry.file((file: File) => {
        this.loadFile(file);
    });

    this.loading = false;
  }

  handleInputFile(files: FileList) {
    this.loading = true;
    this.resetWarningMessages();

    this.loadFile(files[0]); //if multiple files are selected -> take first one

    this.loading = false;
  }

  private loadFile(file: File) {
    if (!file) return;

    if (!file.type.startsWith("image/gif") &&
      !file.type.startsWith("image/png") &&
      !file.type.startsWith("image/jpg") &&
      !file.type.startsWith("image/jpeg")) {
      this.wrongFileFormat = true;
      return;
    }

    if (file.size > (this.maxFileSize)) {
      this.fileIsTooBig = true;
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const image = new Image();
      image.src = reader.result as string;
      image.onload = () => {
        if (image.width > 3000 || image.height > 3000) {
          this.fileIsTooBig = true;
          this.loading = false;
        } else {
          this.selectedLogotype = reader.result as string;
          this.selectedLogotypeFile = file;
          this.newLogotypeSelected = true;
        }
      }
    }
  }

  onDeleteLogo() {
    this.resetWarningMessages();
    this.deleteLogoEvent.emit();
    this.selectedLogotype = null;
    this.selectedLogotypeFile = null;
    this.newLogotypeSelected = false;
    this.dialogRef.close();
  }

  onSaveLogo() {
    this.resetWarningMessages();
    this.saveLogoEvent.emit(this.selectedLogotypeFile);
    this.newLogotypeSelected = false;
    this.dialogRef.close();
  }

  private onClose() {
    this.dialogRef.close();
  }
}
