import { describe, test, expect } from "@jest/globals";
import {
  createInitialCatalogState,
  processCatalogStep
} from "../src/utils/catalogFlow.js";
import {
  createInitialSizeState,
  processSizeStep
} from "../src/utils/sizeFlow.js";

describe("catalog flow", () => {
  test("ошибка при неверной категории", () => {
    const state = createInitialCatalogState();
    const res = processCatalogStep(state, "хрень");
    expect(res.done).toBe(false);
    expect(res.reply).toMatch(/мужская, женская или детская/i);
  });

  test("полный сценарий каталога без доп. фильтров", () => {
    let state = createInitialCatalogState();

    // категория
    let res = processCatalogStep(state, "мужская");
    expect(res.done).toBe(false);
    expect(res.reply).toMatch(/Категория: мужская/i);
    state = res.newState;

    // бренд: нет
    res = processCatalogStep(state, "нет");
    expect(res.done).toBe(false);
    state = res.newState;

    // цвет: нет
    res = processCatalogStep(state, "нет");
    expect(res.done).toBe(false);
    state = res.newState;

    // размер: нет
    res = processCatalogStep(state, "нет");
    expect(res.done).toBe(true);
    expect(res.reply).toMatch(/Подходящие модели/i);
    expect(res.reply).toMatch(/Nike Air Max 270/);
  });

  test("ошибка при неверном бренде", () => {
    let state = createInitialCatalogState();

    // категория ок
    let res = processCatalogStep(state, "женская");
    state = res.newState;

    // бренд неправильный
    res = processCatalogStep(state, "Reebok");
    expect(res.done).toBe(false);
    expect(res.reply).toMatch(/Не понял бренд/i);
  });

  test("ошибка при некорректном размере", () => {
    let state = createInitialCatalogState();

    let res = processCatalogStep(state, "мужская");
    state = res.newState;

    res = processCatalogStep(state, "нет"); // бренд
    state = res.newState;

    res = processCatalogStep(state, "нет"); // цвет
    state = res.newState;

    res = processCatalogStep(state, "сорок"); // размер текстом
    expect(res.done).toBe(false);
    expect(res.reply).toMatch(/Нужно число размера/i);
  });

  test("сценарий с фильтром, который ничего не находит", () => {
    let state = createInitialCatalogState();

    let res = processCatalogStep(state, "мужская");
    state = res.newState;

    res = processCatalogStep(state, "Nike"); // бренд
    state = res.newState;

    res = processCatalogStep(state, "белый"); // цвет, которого нет у Nike men
    state = res.newState;

    res = processCatalogStep(state, "99"); // размер
    expect(res.done).toBe(true);
    expect(res.reply).toMatch(/ничего не найдено/i);
  });
});

describe("size_help flow", () => {
  test("ошибка при неверном поле", () => {
    const state = createInitialSizeState();
    const res = processSizeStep(state, "хз кто");
    expect(res.done).toBe(false);
    expect(res.reply).toMatch(/мужская, женская или детская/i);
  });

  test("полный сценарий: мужская → 25.2 → m1", () => {
    let state = createInitialSizeState();

    let res = processSizeStep(state, "мужская");
    state = res.newState;
    expect(res.done).toBe(false);
    expect(res.reply).toMatch(/длину стопы/i);

    res = processSizeStep(state, "25.2");
    state = res.newState;
    expect(res.done).toBe(false);
    expect(res.reply).toMatch(/Рекомендованный размер/i);

    res = processSizeStep(state, "m1");
    expect(res.done).toBe(true);
    expect(res.reply).toMatch(/Итого рекомендуемый размер/i);
    expect(res.reply).toMatch(/модели m1/i);
  });

  test("сценарий с ответом 'нет' без модели", () => {
    let state = createInitialSizeState();

    let res = processSizeStep(state, "женская");
    state = res.newState;

    res = processSizeStep(state, "23.4");
    state = res.newState;

    res = processSizeStep(state, "нет");
    expect(res.done).toBe(true);
    expect(res.reply).toMatch(/Итого рекомендуемый размер/i);
  });
});