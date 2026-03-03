export const MIN_TASK_LENGTH = 2;
export const MAX_TASK_LENGTH = 64;
export const MIN_LOGIN_LENGTH = 2;
export const MAX_LOGIN_LENGTH = 60;
export const MIN_PASSWORD_LENGTH = 6;
export const MAX_PASSWORD_LENGTH = 60;
export const VALIDATION_RULES = {
  username: [
    {
      required: true,
      max: 60,
      message: "от 1 до 60 символов русского/латинского алфавита",
    },
  ],
  login: [
    {
      required: true,
      min: MIN_LOGIN_LENGTH,
      max: MAX_LOGIN_LENGTH,
      message: "от 2 до 60 символов латинского алфавита",
    },
  ],
  password: [
    {
      required: true,
      min: MIN_PASSWORD_LENGTH,
      max: MAX_PASSWORD_LENGTH,
      message: "от 6 до 60 символов",
    },
  ],

  email: [
    {
      required: true,
      type: "email",
      message: "адрес почты должен быть корректным",
    },
  ],
  phoneNumber: [
    {
      required: false,
      type: "number",
      message: "номер телефона должен быть корректным",
    },
  ],
};
