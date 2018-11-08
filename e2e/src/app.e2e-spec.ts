import { AppPage } from "./app.po";
import { } from "jasmine";

describe("workspace-project App", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it("should display welcome message", () => {
    page.navigateTo();
    page.getParagraphText().then((x) => {
      expect(x).toEqual("Welcome to logotyphantering-lib-app!");
    });
  });
});
