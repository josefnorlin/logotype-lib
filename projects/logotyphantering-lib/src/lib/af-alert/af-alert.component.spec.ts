import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { } from "jasmine";
import { AfAlertComponent } from "./af-alert.component";

describe("AfAlertComponent", () => {
  let component: AfAlertComponent;
  let fixture: ComponentFixture<AfAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
