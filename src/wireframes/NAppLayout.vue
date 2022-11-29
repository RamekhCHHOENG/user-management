<template>
  <div>
    <v-app-bar color="primary" dark app>
      <v-app-bar-nav-icon
        @click.stop="drawer.mini = !drawer.mini"
      ></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-menu offset-y open-on-hover transition="slide-y-transition" bottom>
        <template v-slot:activator="{ on }">
          <div v-on="on" class="d-flex">
            <v-list color="transparent" nav dense>
              <v-list-item class="text-right subtitle-2">
                <v-list-item-content>
                  <v-list-item-title>
                    {{ username || "Username" }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ userRole || "Role" }} User
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-avatar class="mr-3 mt-2">
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
            </v-avatar>
          </div>
        </template>
        <v-list flat>
          <v-list-item
            v-for="link in profiles"
            :key="link.text"
            :to="link.route"
            active-class="border"
            router
          >
            <v-list-item-title width="200px" @click="link.methods">
              <v-icon>{{ link.icon }}</v-icon> {{ link.text }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer
      app
      permanent
      :mini-variant="drawer.mini"
      :mini-variant-width="64"
      aria-user-select-none
    >
      <v-layout class="ma-6" align-center column>
        <div>{{ appName }}</div>
      </v-layout>

      <v-list flat>
        <v-list-item
          v-for="link in links"
          :key="link.text"
          :to="link.route"
          active-class="border"
          router
        >
          <v-list-item-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main key="content">
      <v-container class="py-8 px-6" fluid>
        <slot>
          <router-view></router-view>
        </slot>
      </v-container>
    </v-main>

    <slot name="extension"></slot>

    <change-password
      :value="toggleChangePassword"
      @onSubmit="onSubmitChangePass"
      @onCancel="toggleChangePassword = false"
    />
  </div>
</template>

<script>
import { useAuthStore } from "@/store/useAuthStore"
import { useUserStore } from "@/store/useUserStore"

export default {
  name: "NAppLayout",
  components: {
    "change-password": () => import("@/views/auth/ChangePassword.vue"),
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      toggleChangePassword: false,
      userData: {},
      drawer: {
        mini: false,
      },
      extensionHeight: 56,
      links: [
        { icon: "mdi-microsoft-windows", text: "Dashboard", route: "/" },
        { icon: "mdi-account", text: "Users", route: "/users" },
      ],
      profiles: [
        {
          icon: "mdi-lock",
          text: "Change Password",
          methods: () => this.onChangePassword(),
        },
        {
          icon: "mdi-logout-variant",
          text: "Logout",
          route: "/auth",
          methods: () => this.onLogout(),
        },
      ],
    }
  },
  computed: {
    username() {
      return this.userData.name
    },
    userRole() {
      return this.userData.role?.name
    },
    appName() {
      return this.drawer.mini ? "USR" : "User Management"
    },
  },
  mounted() {
    setInterval(() => {
      this.userData = this.user
    }, 5000)
  },
  methods: {
    async onLogout() {
      await useAuthStore().logout()
        .then(() => {
          this.$root.$snackbar.show('Successfully Logout')
        }).catch((error) => {
          this.$root.$error.show('Error', error)
        })
    },
    onChangePassword() {
      this.toggleChangePassword = true
    },
    async onSubmitChangePass(item) {
      await useUserStore().changePassword(item)
        .then(()=> {
          this.$root.$snackbar.show('Successfully change password.')
        }).catch((error) => {
          this.$root.$error.show('Error', error)
        }).finally(() => {
          this.toggleChangePassword = false
        })
    },
  },
}
</script>
