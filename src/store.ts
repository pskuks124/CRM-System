import { ref, reactive } from "vue";
import { Todo, type TodoInfo } from "./util/api";

const formText = ref<string>("");
const tasks = ref<Todo[]>([]);
const info = reactive<TodoInfo>({ all: 0, inWork: 0, completed: 0 });
let sortType = ref<keyof TodoInfo>("all");

function formValidate(text: string) {
  console.log("formvalidate start");
  if (text.length >= 2 && text.length <= 64) {
    return true;
  } else {
    return false;
  }
}

export { tasks, formText, info, sortType, formValidate };
