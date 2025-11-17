import { describe, test, expect } from "@jest/globals";
import { getSizeByCm, getModelSizeFeedback } from "../src/utils/sizeHelp.js";

describe("sizeHelp utils", () => {
  test("getSizeByCm возвращает строку для мужчины", () => {
    const row = getSizeByCm("men", 25.2);
    expect(row).not.toBeNull();
    expect(row.eu).toBe(40);
  });

  test("getSizeByCm возвращает null при неподходящей длине", () => {
    const row = getSizeByCm("men", 100);
    expect(row).toBeNull();
  });

  test("getModelSizeFeedback возвращает текст для m1", () => {
    const feedback = getModelSizeFeedback("m1");
    expect(typeof feedback).toBe("string");
    expect(feedback.length).toBeGreaterThan(0);
  });

  test("getModelSizeFeedback возвращает null для несуществующей модели", () => {
    const feedback = getModelSizeFeedback("xxx");
    expect(feedback).toBeNull();
  });
});