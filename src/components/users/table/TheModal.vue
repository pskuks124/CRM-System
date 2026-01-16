<script setup lang="ts">
import adminApi from "@/api/admin-api";
import type { ModalState, Roles } from "@/types/admin-types";
import { message } from "ant-design-vue";
import { computed } from "vue";

interface ModalData {
  title: string | null;
  ok: (() => void) | null;
  cancel: (() => void) | null;
}
const props = defineProps<{
  modalState: ModalState;
}>();
const emit = defineEmits<{
  (e: "loadTableRequired"): void;
  (e: "clearModalRequired"): void;
}>();
const isBlocked = defineModel<boolean | undefined>("isBlocked", {
  default: null,
});
const roles = defineModel<Roles[]>("roles");
const modalData = computed((): ModalData => {
  if (!props.modalState.record) return { title: null, ok: null, cancel: null };
  const cancel = () => emit("clearModalRequired");
  const cancelRightsUpdate = () => {
    roles.value = props.modalState.record.roles;
    emit("clearModalRequired");
  };
  return props.modalState.type === "roles"
    ? {
        title: `Сменить роли пользователя ${props.modalState.record.username}`,
        ok: () => {
          return props.modalState.record
            ? handleRights(
                props.modalState.record.id,
                props.modalState.record.roles,
              )
            : null;
        },
        cancel: cancelRightsUpdate,
      }
    : props.modalState.type === "block"
      ? {
          title: `Вы уверены, что хотите ${props.modalState.record.isBlocked ? "разблокировать" : "заблокировать"} пользователя?`,
          ok: !props.modalState.record.isBlocked
            ? () => {
                return props.modalState.record
                  ? handleBlock(props.modalState.record.id)
                  : null;
              }
            : () => {
                return props.modalState.record
                  ? handleUnblock(props.modalState.record.id)
                  : null;
              },
          cancel,
        }
      : props.modalState.type === "delete"
        ? {
            title: "Вы уверены, что хотите удалить пользователя?",
            ok: () => {
              return props.modalState.record
                ? deleteUser(props.modalState.record.id)
                : null;
            },
            cancel,
          }
        : {
            title: `Выбор отображения пользователей`,
            ok: confirmFilters,
            cancel,
          };
});
const deleteUser = async (id: number) => {
  await adminApi.removeUser(id).then(async () => {
    message.success("Пользователь успешно удален");
    emit("loadTableRequired");
  });
  emit("clearModalRequired");
};
const handleBlock = async (id: number) => {
  await adminApi.blockUser(id).then(async () => {
    message.success("Пользователь успешно заблокирован");
    emit("loadTableRequired");
  });
  emit("clearModalRequired");
};
const handleUnblock = async (id: number) => {
  await adminApi.unblockUser(id).then(async () => {
    message.success("Пользователь успешно разблокирован");
    emit("loadTableRequired");
  });
  emit("clearModalRequired");
};

const handleRights = async (id: number, roles: Roles[]) => {
  await adminApi.updateRights(id, { roles }).then(async () => {
    message.success("Права пользователя успешно обновлены");
    emit("loadTableRequired");
  });
  emit("clearModalRequired");
};

const confirmFilters = async () => {
  emit("loadTableRequired");
  message.success("Фильтры успешно применены");
  emit("clearModalRequired");
};
</script>
<template>
  <a-modal
    :open="props.modalState.open"
    okText="Ок"
    cancelText="Отмена"
    :title="modalData?.title"
    @ok="modalData?.ok"
    @cancel="modalData?.cancel"
  >
    <a-select
      v-if="props.modalState.type === 'filter'"
      v-model:value="isBlocked"
      style="width: 100%"
      :firstActiveValue="undefined"
    >
      <a-select-option
        v-for="filter in [
          {
            value: null,
            label: 'Все',
          },
          {
            value: 'true',
            label: 'Заблокированные',
          },
          {
            value: 'false',
            label: 'Не заблокированные',
          },
        ]"
        :key="filter.value"
      >
        {{ filter.label }}
      </a-select-option>
    </a-select>
    <a-select
      v-if="props.modalState.type === 'roles'"
      v-model:value="roles"
      mode="tags"
      style="width: 100%"
      :defaultActiveFirstOption="true"
    >
      <a-select-option
        v-for="role in [
          {
            value: 'USER',
            label: 'USER',
          },
          {
            value: 'MODERATOR',
            label: 'MODERATOR',
          },
          {
            value: 'ADMIN',
            label: 'ADMIN',
          },
        ]"
        :key="role.value"
      >
        <a-tag
          :color="
            role.value === 'ADMIN'
              ? 'geekblue'
              : role.value === 'MODERATOR'
                ? 'volcano'
                : role.value === 'USER'
                  ? 'purple'
                  : 'red'
          "
        >
          {{ role.label }}
        </a-tag>
      </a-select-option>
    </a-select>
  </a-modal>
</template>
<style scoped></style>
