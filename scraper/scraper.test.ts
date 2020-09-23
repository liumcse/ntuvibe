import {
  initialize,
  scrapeClassSchedule,
  scrapeCourseContent,
} from "./scraper";

jest.setTimeout(120000); // Timeout: 2min

describe("initialize", () => {
  it("should be able to install scraper CLI", async () => {
    expect(await initialize()).toBeUndefined();
  });
});

describe("scraper - course content", () => {
  it("should be able to scrape course content", async () => {
    expect(await scrapeCourseContent()).toBeDefined();
  });
});

describe("scraper - class schedule", () => {
  it("should be able to scrape class schedule", async () => {
    expect(await scrapeClassSchedule()).toBeDefined();
  });
});
