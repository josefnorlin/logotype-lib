import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LogotypeDialogComponent } from "./logotype-dialog.component";

describe("LogotypeDialogComponent", () => {
  let component: LogotypeDialogComponent;
  let fixture: ComponentFixture<LogotypeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogotypeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogotypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
