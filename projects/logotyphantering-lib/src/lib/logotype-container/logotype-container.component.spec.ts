import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LogotypeContainerComponent } from "./logotype-container.component";

describe("LogotypeContainerComponent", () => {
  let component: LogotypeContainerComponent;
  let fixture: ComponentFixture<LogotypeContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogotypeContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogotypeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
