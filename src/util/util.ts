import { message } from "ant-design-vue";

type ErrorOption =
  | "при отправке"
  | "при удалении"
  | "при изменении"
  | "при обновлении";
const showError = (errorOption: ErrorOption): void => {
  console.log("showError сработал");

  message.error({ content: `Ошибка ${errorOption} данных` });
};

export { showError };
