<template>
  <div>
    <v-app-bar color="red" dark app>
      <v-app-bar-nav-icon @click.stop="drawer.mini = !drawer.mini"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-menu
        offset-y 
        open-on-hover
        transition="slide-y-transition"
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-avatar v-on="on" button>
            <img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
            >
          </v-avatar>
        </template>
        <v-list flat>
          <v-list-item
            v-for="link in profiles"
            :key="link.text"
            :to="link.route"
            active-class="border"
            router
          >
            <v-list-item-title
              width="200px"
              @click="link.methods"
            >
              {{ link.text }}
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
      <v-layout
        class="ma-6"
        align-center
        column
      >
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
            <v-icon >{{link.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content >
            <v-list-item-title >{{link.text}}</v-list-item-title>
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
    <v-snackbar
      v-model="snackbar.toggle"
      :color="snackbar.color"
      top
      right
    >
      <span>{{ snackbar.text}}</span>
    </v-snackbar>
  </div>
</template>

<script>

import { useAuthStore } from '@/store/useAuthStore'
import { useUserStore } from '@/store/useUserStore'

export default {
  name: 'NAppLayout',
  components: {
    'change-password': () => import('@/views/auth/ChangePassword.vue')
  },
  props: {
    profileMenuItems: {
      type: Array,
      default: () => []
    },
    onClickOnLogout: {
      type: Function,
      default: () => () => {}
    }
  },
  data () {
    return {
      toggleChangePassword: false,
      snackbar: {
        toggle: false,
        color: '',
        text: ''
      },
      drawer: {
        mini: true
      },
      extensionHeight: 56,
      links :[
          {icon: 'mdi-microsoft-windows', text:'Dashboard', route: '/'},
          {icon: 'mdi-account', text:'Users', route: '/users'}
      ],
      profiles :[
          {icon: 'mdi-logout-variant', text:'Change Password', methods: () => this.onChangePassword()},
          {icon: 'mdi-logout-variant', text:'Logout', route: '/auth', methods: () => this.onLogout()}
      ]
    }
  },
  computed: {
    appName () {
      return this.drawer.mini
        ? 'USR'
        : 'User Management'
    }
  },
  methods: {
    async onLogout() {
      try {
        await useAuthStore().logout()
      } catch (error) {
        console.log(error)
      }
    },
    onChangePassword () {
      this.toggleChangePassword = true
    },
    async onSubmitChangePass (item) {
      try {
        await useUserStore().changePassword(item)
        
        this.snackbar.text = 'Succesfully change password'
        this.snackbar.color = 'primary'
        this.snackbar.toggle = true
      } catch (error) {
        alert(error)
      } finally {
        this.toggleChangePassword = false
      }
    }
  }
}
</script>
