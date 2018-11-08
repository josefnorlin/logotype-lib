import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LogotyphanteringLibComponent } from "./logotyphantering-lib.component";

describe("LogotyphanteringLibComponent", () => {
  let component: LogotyphanteringLibComponent;
  let fixture: ComponentFixture<LogotyphanteringLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogotyphanteringLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogotyphanteringLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
