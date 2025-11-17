import { COMMANDS } from "./state.js";
import { parseNumber } from "./validation.js";
import { getModelSizeFeedback, getSizeByCm } from "./sizeHelp.js";

export const SIZE_STEPS = {
  GENDER: "GENDER",
  CM: "CM",
  MODEL: "MODEL"
};

const GENDER_LABELS = {
  "мужская": "men",
  "женская": "women",
  "детская": "kids"
};

export function createInitialSizeState() {
  return {
    command: COMMANDS.SIZE_HELP,
    step: SIZE_STEPS.GENDER,
    data: {}
  };
}

export function processSizeStep(state, text) {
  const trimmed = text.trim();

  // 1. Выбор пола
  if (state.step === SIZE_STEPS.GENDER) {
    const genderKey = GENDER_LABELS[trimmed.toLowerCase()];
    if (!genderKey) {
      return {
        newState: state,
        reply: "Введите: мужская, женская или детская.",
        done: false
      };
    }

    return {
      newState: {
        command: COMMANDS.SIZE_HELP,
        step: SIZE_STEPS.CM,
        data: { gender: genderKey }
      },
      reply: "Введите длину стопы в сантиметрах (например 26.5).",
      done: false
    };
  }

  // 2. Ввод длины стопы
  if (state.step === SIZE_STEPS.CM) {
    const cm = parseNumber(trimmed);
    if (cm === null) {
      return {
        newState: state,
        reply: "Нужно число, пример: 26.5",
        done: false
      };
    }

    const row = getSizeByCm(state.data.gender, cm);
    if (!row) {
      return {
        newState: state,
        reply: "Не удалось подобрать размер по этой длине стопы.",
        done: false
      };
    }

    const baseText = `Рекомендованный размер:
EU ${row.eu}, RU ${row.ru}, US ${row.us}.`;

    return {
      newState: {
        command: COMMANDS.SIZE_HELP,
        step: SIZE_STEPS.MODEL,
        data: { ...state.data, cm, row }
      },
      reply: `${baseText}
Если хотите учесть отзывы по конкретной модели, введите её код (например m1), или "нет".`,
      done: false
    };
  }

  // 3. Модель для отзывов
  if (state.step === SIZE_STEPS.MODEL) {
    const { row } = state.data;

    let extra = "";
    if (trimmed.toLowerCase() !== "нет") {
      const feedback = getModelSizeFeedback(trimmed);
      if (feedback) {
        extra = `\nПо отзывам для модели ${trimmed}: ${feedback}`;
      } else {
        extra = "\nОтзывы по такой модели не найдены.";
      }
    }

    return {
      newState: state,
      reply: `Итого рекомендуемый размер:
EU ${row.eu}, RU ${row.ru}, US ${row.us}.${extra}`,
      done: true
    };
  }

  return {
    newState: state,
    reply: "Что-то пошло не так. Попробуйте /size_help ещё раз.",
    done: true
  };
}