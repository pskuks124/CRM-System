<script setup lang="ts">
import adminApi from "@/api/admin-api";
import type {
  MetaResponse,
  ModalState,
  User,
  UserFilters,
} from "@/types/admin-types";
import { computed, onBeforeMount, reactive, ref } from "vue";
import { type TableProps } from "ant-design-vue";
import type { SorterResult } from "ant-design-vue/es/table/interface";
import type { ColumnProps } from "ant-design-vue/es/table";
import IsBlockedColumn from "@/components/users/table/columns/IsBlockedColumn.vue";
import DateColumn from "@/components/users/table/columns/DateColumn.vue";
import RolesColumn from "@/components/users/table/columns/RolesColumn.vue";
import PhoneNumberColumn from "@/components/users/table/columns/PhoneNumberColumn.vue";
import EmailColumn from "@/components/users/table/columns/EmailColumn.vue";
import TheHeader from "@/components/users/table/TheHeader.vue";
import ButtonsSpace from "@/components/users/table/buttons/ButtonsSpace.vue";
import TheModal from "@/components/users/table/TheModal.vue";

const loading = ref(false);

const emptyUser = {
  id: 0,
  username: "",
  phoneNumber: "",
  email: "",
  roles: [],
  isBlocked: false,
  date: "",
};

let modalState = reactive<ModalState>({
  open: false,
  record: { ...emptyUser },
});

const columns = ref<ColumnProps<User>[]>([
  {
    title: "Имя",
    dataIndex: "username",
    key: "username",
    sorter: true,
    ellipsis: true,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    sorter: true,
    ellipsis: true,
  },
  {
    title: "Телефон",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
    ellipsis: true,
  },
  {
    title: "Роли",
    dataIndex: "roles",
    key: "roles",
    ellipsis: true,
  },
  {
    title: "Блокировка",
    dataIndex: "isBlocked",
    key: "isBlocked",
    ellipsis: true,
  },
  {
    title: "Дата регистрации",
    dataIndex: "date",
    key: "date",
    ellipsis: true,
  },
  {
    title: "",
    dataIndex: "buttons",
    key: "buttons",
    ellipsis: true,
  },
]);
let metaResponse = reactive<MetaResponse<User>>({
  data: [emptyUser],
  meta: {
    totalAmount: 0,
    sortBy: "id",
    sortOrder: "asc",
  },
});

let userFilters = reactive<UserFilters>({});
const paginationState = computed(() => {
  return {
    pageSize: userFilters.limit ? userFilters.limit : 20,
    current: userFilters.page ? userFilters.page + 1 : 1,
    total: metaResponse.meta.totalAmount,
  };
});

const setLoading = (value: boolean) => (loading.value = value);

const loadTable = async () => {
  setLoading(true);
  const response = await adminApi.getUsers(userFilters);
  metaResponse.data = response.data;
  metaResponse.meta = response.meta;
  setLoading(false);
};
const setModalState = (value: ModalState) => {
  Object.assign(modalState, value);
};
const clearModal = () => {
  Object.assign(modalState, { open: false, record: emptyUser });
};
const openRolesModal = (record: User) => {
  setModalState({ open: true, record: { ...record }, type: "roles" });
};
const openBlockModal = (record: User) => {
  setModalState({ open: true, record: { ...record }, type: "block" });
};
const openDeleteModal = (record: User) => {
  setModalState({ open: true, record: { ...record }, type: "delete" });
};
const openFilterModal = () => {
  setModalState({ open: true, record: { ...emptyUser }, type: "filter" });
};

const handleTableChange: TableProps<User[]>["onChange"] = async (
  pagination,
  _filters,
  sorter,
) => {
  const keyString = (sorter as SorterResult)?.column?.key?.toString() || "id";
  const orderString = (sorter as SorterResult).order;
  const sortByUnchanged =
    (!userFilters.sortBy && keyString === "id") ||
    userFilters.sortBy === keyString;
  const sortOrderUnchanged =
    (userFilters.sortOrder === "asc" && orderString === "ascend") ||
    (userFilters.sortOrder === "desc" && orderString === "descend") ||
    userFilters.sortOrder === orderString;
  const limitUnchanged =
    (!userFilters.limit && pagination.pageSize === 20) ||
    userFilters.limit === pagination.pageSize;
  userFilters.limit = pagination.pageSize;

  const resetRequired =
    !sortByUnchanged || !sortOrderUnchanged || !limitUnchanged;

  if (!pagination.current || resetRequired) {
    userFilters.page = 0;
  } else if (pagination.current) {
    userFilters.page = pagination.current - 1;
  }
  if (keyString) {
    userFilters.sortBy = keyString;
  }
  userFilters.sortOrder =
    orderString === "descend"
      ? "desc"
      : orderString === "ascend"
        ? "asc"
        : undefined;
  await loadTable();
};

onBeforeMount(async () => {
  await loadTable();
});
</script>
<template>
  <a-table
    class="user-table"
    :columns="columns"
    :data-source="metaResponse.data"
    @change="handleTableChange"
    :rowKey="(record: User) => record.id"
    :pagination="paginationState"
    :loading="loading"
  >
    <template #bodyCell="{ column, record }">
      <EmailColumn v-if="column.dataIndex === 'email'" :email="record.email" />
      <PhoneNumberColumn
        v-else-if="column.dataIndex === 'phoneNumber'"
        :phoneNumber="record.phoneNumber"
      />

      <RolesColumn
        v-else-if="column.dataIndex === 'roles'"
        :record="record"
        @openRolesModalRequired="openRolesModal"
      />

      <IsBlockedColumn
        v-else-if="column.dataIndex === 'isBlocked'"
        :isBlocked="record.isBlocked"
      />

      <DateColumn v-else-if="column.dataIndex === 'date'" :date="record.date" />

      <ButtonsSpace
        v-else-if="column.dataIndex === 'buttons'"
        @openBlockModalRequired="openBlockModal(record)"
        @openDeleteModalRequired="openDeleteModal(record)"
        :record="record"
      />
    </template>
    <template #title>
      <TheHeader
        v-model="userFilters.search"
        @loadTableRequired="loadTable"
        @openFilterModalRequired="openFilterModal"
      />
    </template>
  </a-table>
  <TheModal
    v-model:isBlocked="userFilters.isBlocked"
    v-model:roles="modalState.record.roles"
    @loadTableRequired="loadTable"
    @clearModalRequired="clearModal"
    :modalState="modalState"
  />
</template>
<style scoped>
.user-table {
  margin: 0 5rem;
}
</style>
