import { TestBed, inject } from "@angular/core/testing";

import { LogotyphanteringLibService } from "./logotyphantering-lib.service";

describe("LogotyphanteringLibService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogotyphanteringLibService]
    });
  });

  it("should be created", inject([LogotyphanteringLibService], (service: LogotyphanteringLibService) => {
    expect(service).toBeTruthy();
  }));
});
