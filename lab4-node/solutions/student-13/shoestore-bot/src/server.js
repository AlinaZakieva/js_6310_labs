import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

import {
  COMMANDS,
  getUserState,
  resetUserState,
  setUserState
} from "./utils/state.js";
import {
  createInitialCatalogState,
  processCatalogStep
} from "./utils/catalogFlow.js";
import {
  createInitialSizeState,
  processSizeStep
} from "./utils/sizeFlow.js";

const runServer = () => {
  dotenv.config();
  const token = process.env.TELEGRAM_BOT_TOKEN;

  if (!token) {
    throw new Error("TELEGRAM_BOT_TOKEN не задан в файле .env");
  }

  const bot = new TelegramBot(token, { polling: true });

  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    resetUserState(chatId);

    bot.sendMessage(
      chatId,
      "Привет! Я бот магазина обуви ShoeStore.\n" +
      "Команды:\n" +
      "/catalog — подобрать обувь по категории\n" +
      "/size_help — помощь с размером"
    );
  });

  bot.onText(/\/catalog/, (msg) => {
    const chatId = msg.chat.id;

    const state = createInitialCatalogState();
    setUserState(chatId, state);

    bot.sendMessage(
      chatId,
      "Выберите категорию: мужская, женская, детская."
    );
  });

  bot.onText(/\/size_help/, (msg) => {
    const chatId = msg.chat.id;

    const state = createInitialSizeState();
    setUserState(chatId, state);

    bot.sendMessage(
      chatId,
      "Для кого обувь? Введите: мужская / женская / детская."
    );
  });

  bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (!text || text.startsWith("/")) {
      return;
    }

    const state = getUserState(chatId);

    try {
      if (state.command === COMMANDS.CATALOG) {
        const { newState, reply, done } = processCatalogStep(state, text);
        setUserState(chatId, newState);
        bot.sendMessage(chatId, reply);
        if (done) {
          resetUserState(chatId);
        }
        return;
      }

      if (state.command === COMMANDS.SIZE_HELP) {
        const { newState, reply, done } = processSizeStep(state, text);
        setUserState(chatId, newState);
        bot.sendMessage(chatId, reply);
        if (done) {
          resetUserState(chatId);
        }
        return;
      }

      // если ни один сценарий не активен — эхо
      bot.sendMessage(chatId, `Ты написал: "${text}"`);
    } catch (error) {
      console.error("Bot error", error);
      bot.sendMessage(chatId, "Произошла ошибка. Попробуй ещё раз.");
    }
  });

  console.log("ShoeStore bot запущен...");
};

export default runServer;