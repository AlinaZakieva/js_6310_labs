import { describe, test, expect } from "@jest/globals";
import {
  COMMANDS,
  getUserState,
  resetUserState,
  setUserState
} from "../src/utils/state.js";

describe("state utils", () => {
  test("resetUserState сбрасывает состояние", () => {
    const chatId = 123;
    setUserState(chatId, {
      command: COMMANDS.CATALOG,
      step: "X",
      data: { a: 1 }
    });

    resetUserState(chatId);
    const state = getUserState(chatId);

    expect(state.command).toBe(COMMANDS.NONE);
    expect(state.step).toBeNull();
    expect(state.data).toEqual({});
  });

  test("состояния разных пользователей не пересекаются", () => {
    const user1 = 1;
    const user2 = 2;

    resetUserState(user1);
    resetUserState(user2);

    setUserState(user1, {
      command: COMMANDS.CATALOG,
      step: "X",
      data: { a: 1 }
    });

    const state1 = getUserState(user1);
    const state2 = getUserState(user2);

    expect(state1.command).toBe(COMMANDS.CATALOG);
    expect(state2.command).toBe(COMMANDS.NONE);
    expect(state1).not.toBe(state2);
  });
});