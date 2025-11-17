import { describe, test, expect } from "@jest/globals";
import {
  getCategoryKeyByLabel,
  normalizeBrand,
  normalizeColor,
  filterShoes,
  formatShoesList,
  formatAllShoes,
  formatShoesByCategory
} from "../src/utils/catalog.js";

describe("catalog utils — категории и нормализация", () => {
  test("getCategoryKeyByLabel находит мужскую категорию", () => {
    expect(getCategoryKeyByLabel("мужская")).toBe("men");
  });

  test("getCategoryKeyByLabel возвращает null на мусор", () => {
    expect(getCategoryKeyByLabel("хрень")).toBeNull();
  });

  test("normalizeBrand находит бренд без учёта регистра", () => {
    expect(normalizeBrand("nike")).toBe("Nike");
    expect(normalizeBrand("NiKe")).toBe("Nike");
  });

  test("normalizeBrand возвращает null для неизвестного бренда", () => {
    expect(normalizeBrand("Reebok")).toBeNull();
  });

  test("normalizeColor находит цвет без учёта регистра", () => {
    expect(normalizeColor("ЧЕРНЫЙ")).toBe("черный");
    expect(normalizeColor("белый")).toBe("белый");
  });

  test("normalizeColor возвращает null для неизвестного цвета", () => {
    expect(normalizeColor("фиолетовый")).toBeNull();
  });
});

describe("catalog utils — фильтрация", () => {
  test("filterShoes фильтрует только по категории", () => {
    const result = filterShoes({ categoryKey: "men" });
    // в мужской категории у нас три модели
    expect(result.length).toBeGreaterThanOrEqual(3);
    expect(result.every((item) => item.category === "men")).toBe(true);
  });

  test("filterShoes фильтрует по категории и бренду", () => {
    const result = filterShoes({
      categoryKey: "men",
      brand: "Nike"
    });

    expect(result.length).toBe(1);
    expect(result[0].name).toMatch(/Air Max 270/);
  });

  test("filterShoes фильтрует по размеру", () => {
    const result = filterShoes({
      categoryKey: "men",
      size: 44
    });

    // есть мужские модели с размером 44
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((item) => item.sizes.includes(44))).toBe(true);
  });

  test("filterShoes возвращает пустой список, если ничего не найдено", () => {
    const result = filterShoes({
      categoryKey: "men",
      brand: "Nike",
      color: "белый",
      size: 99
    });

    expect(result.length).toBe(0);
  });
});

describe("catalog utils — форматирование", () => {
  test("formatShoesList возвращает 'Каталог пуст.' для пустого списка", () => {
    const text = formatShoesList([]);
    expect(text).toBe("Каталог пуст.");
  });

  test("formatAllShoes содержит несколько разных категорий", () => {
    const text = formatAllShoes();
    expect(text).toMatch(/мужская|женская|детская/);
    expect(text).toMatch(/Nike Air Max 270/);
    expect(text).toMatch(/Adidas Ultraboost/);
  });

  test("formatShoesByCategory выводит только детские модели", () => {
    const text = formatShoesByCategory("kids");
    expect(text).toMatch(/Kids/);
    expect(text).not.toMatch(/Air Max 270/);
    expect(text).not.toMatch(/Ultraboost/);
  });
});