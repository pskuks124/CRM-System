function formValidate(text: string) {
  console.log("formvalidate start");
  if (text.length >= 2 && text.length <= 64) {
    return true;
  } else {
    return false;
  }
}

export { formValidate };
