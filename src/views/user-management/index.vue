<template>
  <div>
    <v-row class="pa-12">
      <v-col>
        <h3>User Management</h3>
    
        <v-row class="mt-6">
          <v-col cols="2">
            <v-autocomplete
              :items="userIdList"
              label="ID"
              clearable
              outlined
              dense
              item-value="id"
              item-text="id"
            ></v-autocomplete>
          </v-col>
          <v-col cols="2">
            <v-autocomplete
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
              :items="roleList"
              label="User Role"
              clearable
              outlined
              dense
              item-value="id"
              item-text="name"
            ></v-autocomplete>
          </v-col>
          <v-col cols="1">
            <v-btn
              color="primary"
              depressed
            >
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-col>
          <v-col class="text-right">
            <v-btn
              class="mr-6"
              color="primary"
              depressed
              @click="onCreate"
            >
              <v-icon>mdi-account-plus</v-icon>
              Create
            </v-btn>
          </v-col>
        </v-row>
    
        <v-row>
          <v-col class="mt-3">
            <v-data-table
              :headers="headers"
              :items="userList"
              :items-per-page="10"
            >
            <template  v-slot:[`item.id`]='{ value, item }'>
              <a
                @click="onViewDetail(item)"
              >
                {{ value }}
              </a>
            </template>
            <template  v-slot:[`item.status.name`]='{ value, item }'>
              <span
                :class="item.status.id == StatusEnum.ACTIVE ?
                'green--text' : 'red--text'"
              >
                {{ value }}
              </span>
            </template>
            <template  v-slot:[`item.actions`]='{ value }'>
              <v-icon
                small
                class="mr-2"
                @click="editItem(value)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                small
                @click="deleteItem(value)"
              >
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
      @onCancel="toggleCreateEdit = false"
    />
  </div>
</template>

<script>

import { useUserStore } from '@/store/useUserStore'
import { useFilterStore } from '@/store/useFilterStore'
import { StatusEnum } from '@/constants/enums/StatusEnum'

export default {
  name: "UserViw",
  components: {
    'view-detail': () => import('./components/ViewDetails.vue'),
    'create-and-edit-dialog': () => import('./components/CreateAndEdit.vue')
  },  
  data() {
    return {
      toggleViewDetail: false,
      toggleCreateEdit: false,
      userDetail: {},

      StatusEnum,
      headers: [
        { text: "No.", value: "id" },
        { text: "Name", value: "name" },
        { text: "Email", value: "email" },
        { text: "Role", value: "role.name" },
        { text: "Status", value: "status.name" },
        { text: "Action", value: "actions" }
      ],
      userIdList: useFilterStore().userIdList,
      statusList: useFilterStore().statuses,
      roleList: useFilterStore().roles,
      userList: useUserStore().users
    }
  },
  async created () {
    await useFilterStore().getUserIdList()
    await useFilterStore().getStatusList()
    await useFilterStore().getRoleList()
    await useUserStore().getUserList()
  },
  methods: {
    async onViewDetail (item) {
      console.log(item)
      this.userDetail = item
      this.toggleViewDetail = true
    },
    async onCreate (item) {
      console.log(item)
      this.userDetail = item
      this.toggleCreateEdit = true
    }
  }
};
</script>
