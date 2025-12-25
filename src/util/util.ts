import { message } from "ant-design-vue";

type ErrorOption =
  | "Ошибка при отправке данных"
  | "Ошибка при удалении данных"
  | "Ошибка при изменении данных"
  | "Ошибка при обновлении данных"
  | "Ошибка при авторизации"
  | "Ошибка при регистрации"
  | "Пользователь с данным логином уже зарегистрирован. Попробуйте придумать другой";
const showError = (errorOption: ErrorOption): void => {
  message.error({ content: errorOption });
};

export { showError };
