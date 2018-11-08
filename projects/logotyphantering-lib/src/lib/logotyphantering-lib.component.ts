import { Component, Input } from "@angular/core";

@Component({
  selector: "enl-logotyphantering-lib",
  template: `
    <enl-logotype-container arbetsplatsId="{{arbetsplatsId}}" [editMode]="editMode"></enl-logotype-container>
  `,
  styles: []
})
export class LogotyphanteringLibComponent {
  @Input() arbetsplatsId: string = "empty";
  @Input() editMode: boolean = false;
}
