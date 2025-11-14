function formValidate(text: string) {
  if (text.length < 2) {
    return "Текст задачи должен состоять хотя-бы из 2 символов";
  } else if (text.length > 64) {
    return "Текст задачи не должен превышать 64 символа";
  } else {
    return "";
  }
}

export { formValidate };
