<template>
  <div>
    <v-row>
      <v-col>
        <h3>User Management</h3>
        <v-row class="mt-6">
          <v-col cols="2">
            <v-autocomplete
              v-model="filters.statusId"
              :items="statusList"
              label="Status"
              clearable
              outlined
              dense
              item-value="id"
              item-text="name"
            ></v-autocomplete>
          </v-col>
          <v-col cols="2">
            <v-autocomplete
              v-model="filters.roleId"
              :items="roleList"
              label="User Role"
              clearable
              outlined
              dense
              item-value="id"
              item-text="name"
            ></v-autocomplete>
          </v-col>
          <v-col cols="2">
            <v-text-field
              v-model="filters.q"
              label="Search"
              clearable
              outlined
              dense
              @keydown.enter="handleSearch"
            ></v-text-field>
          </v-col>
          <v-col cols="1">
            <v-btn
              color="primary"
              depressed
              :loading="loading"
              @click="handleSearch"
            >
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-col>
          <v-col class="text-right">
            <v-btn class="mr-6" color="primary" depressed @click="onCreate">
              <v-icon>mdi-account-plus</v-icon>
              Create
            </v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="mt-3">
            <v-data-table
              :headers="headers"
              :items="users"
              :loading="loading"
              :footer-props="{
                'items-per-page-text': 'User per page',
                'items-per-page-options': [5, 20, 30, 50, 100],
              }"
              @update:options="(options) => onTableOptionChange(options)"
            >
              <template v-slot:[`item.phoneNumber`]="{ value }">
                {{ value || "N/A" }}
              </template>
              <template v-slot:[`item.id`]="{ value, item }">
                <a @click="onViewDetail(item)">
                  {{ value }}
                </a>
              </template>
              <template v-slot:[`item.status.name`]="{ value, item }">
                <span
                  :class="
                    item.status.id == StatusEnum.ACTIVE
                      ? 'green--text'
                      : 'red--text'
                  "
                >
                  {{ value }}
                </span>
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon color="primary" @click="onEdit(item)">
                  mdi-pencil
                </v-icon>
                <v-icon color="error" @click="onToggleDeleteUser(item)">
                  mdi-delete
                </v-icon>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <view-detail
      :value="toggleViewDetail"
      :items="userDetail"
      @onCancel="toggleViewDetail = false"
    />
    <create-and-edit-dialog
      :value="toggleCreateEdit"
      :items="userDetail"
      :isEdit="isEdit"
      @submit="onSubmit"
      @onCancel="toggleCreateEdit = false"
    />
    <delete-user-dialog
      :value="toggleDelete"
      :items="userDetail"
      @onDelete="onSubmitDelete"
      @onCancel="toggleDelete = false"
    />
  </div>
</template>

<script>
import { useUserStore } from "@/store/useUserStore"
import { useFilterStore } from "@/store/useFilterStore"
import { StatusEnum } from "@/constants/enums/StatusEnum"
import { mapState, mapActions } from "pinia"

export default {
  name: "UserViw",
  components: {
    "view-detail": () => import("./components/ViewDetails.vue"),
    "create-and-edit-dialog": () => import("./components/CreateAndEdit.vue"),
    "delete-user-dialog": () => import("./components/DeleteUserDialog.vue"),
  },
  data() {
    return {
      toggleViewDetail: false,
      toggleCreateEdit: false,
      toggleDelete: false,
      isEdit: false,
      filters: {
        q: null,
        statusId: null,
        roleId: null,
      },
      userDetail: {},

      StatusEnum,
      headers: [
        { text: "ID", value: "id" },
        { text: "Name", value: "name" },
        { text: "Email", value: "email" },
        { text: "Phone Number", value: "phoneNumber" },
        { text: "Role", value: "role.name" },
        { text: "Status", value: "status.name" },
        { text: "Action", value: "actions" },
      ],
      userIdList: useFilterStore().userIdList,
      statusList: useFilterStore().statuses,
      roleList: useFilterStore().roles,
      // userList: useUserStore().users
    }
  },
  computed: {
    ...mapState(useUserStore, ["users", "loading"]),
  },
  async created() {
    await useFilterStore().getUserIdList()
    await useFilterStore().getStatusList()
    await useFilterStore().getRoleList()
    await this.getUserList()
  },
  methods: {
    ...mapActions(useUserStore, ["getUserList", "getFilterData"]),
    onTableOptionChange() {
      this.getFilterData({ ...this.filters })
    },
    handleSearch() {
      this.getFilterData({ ...this.filters })
    },
    async onViewDetail(item) {
      this.userDetail = item
      this.toggleViewDetail = true
    },
    async onCreate() {
      this.isEdit = false
      this.userDetail = {}
      this.toggleCreateEdit = true
    },
    async onEdit(item) {
      this.isEdit = true
      this.userDetail = item
      this.toggleCreateEdit = true
    },
    onToggleDeleteUser(item) {
      this.userDetail = item
      this.toggleDelete = true
    },
    async onSubmitDelete() {
      await useUserStore().deleteUser(this.userDetail)
        .then(() => {
          this.$root.$snackbar.show('Successfully delete a user.')
        }).catch((error) => {
          this.$root.$error.show('Error', error)
        }).finally(async () => {
          this.toggleDelete = false
          await this.getUserList()
        })
    },
    async onSubmit(item) {
      if (this.isEdit) {
        await useUserStore().editUser(item)
          .then(() => {
            this.$root.$snackbar.show('Successfully update a user.')
          }).catch((error) => {
            this.$root.$error.show('Error', error)
          })
      } else {
        await useUserStore().createUser(item)
          .then(() => {
            this.$root.$snackbar.show('Successfully create a user.')
          }).catch((error) => {
            this.$root.$error.show('Error', error)
          })
      }
      this.toggleCreateEdit = false
      await this.getUserList()
    },
  },
}
</script>
