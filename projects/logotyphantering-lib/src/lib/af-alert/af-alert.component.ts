import { Component, Output, EventEmitter, Input  } from "@angular/core";

@Component({
  selector: "enl-af-alert",
  templateUrl: "./af-alert.component.html"
})
export class AfAlertComponent {
  @Input() success = false;
  @Input() danger = false;
  @Input() warning = false;
  @Input() info = false;

  @Output() close = new EventEmitter<any>();

  onClose() {
    this.close.emit();
  }
}
