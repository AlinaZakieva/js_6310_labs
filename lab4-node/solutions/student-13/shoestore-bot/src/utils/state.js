export const COMMANDS = {
  NONE: "none",
  CATALOG: "catalog",
  SIZE_HELP: "size_help"
};

const userStates = new Map();

export function getUserState(chatId) {
  if (!userStates.has(chatId)) {
    userStates.set(chatId, {
      command: COMMANDS.NONE,
      step: null,
      data: {}
    });
  }
  return userStates.get(chatId);
}

export function setUserState(chatId, state) {
  userStates.set(chatId, state);
}

export function resetUserState(chatId) {
  userStates.set(chatId, {
    command: COMMANDS.NONE,
    step: null,
    data: {}
  });
}