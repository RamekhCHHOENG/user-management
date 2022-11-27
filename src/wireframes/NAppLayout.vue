<template>
  <nav>
    <v-app-bar color="red" dark app>
      <v-app-bar-nav-icon @click.stop="drawer.mini = !drawer.mini"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">
            <v-icon left>mdi-account</v-icon>
            <span>Menu</span>
          </v-btn>
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
              @click="onLogout"
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
      <!-- <s-drawer-card
        :title="appName"
        :subtitle="appVersion"
        :mini-variant="drawer.mini"
      />
      <s-drawer-list
        :items="drawerItems"
        :mini-variant="drawer.mini"
      /> -->
  
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
<!-- 
    <v-main key="content">
      <v-container class="py-8 px-6" fluid>
        <slot>
          <router-view></router-view>
        </slot>
      </v-container>
    </v-main>

    <slot name="extension"></slot> -->
  </nav>
</template>

<script>

// import DateTimeModule from '@/components/trays/DateTimeModule'
// import NProfileMenu from '@/components/profile/NProfileMenu'
// import NAppTitleCard from '@/components/title/NAppTitleCard'
import router from '@/router';
import { useAuthStore } from '@/store/useAuthStore'

export default {
  name: 'NAppLayout',
  components: {
    // DateTimeModule,
    // NProfileMenu,
    // NAppTitleCard
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
      users: useAuthStore(),
      drawer: {
        mini: true
      },
      extensionHeight: 86,
      links :[
          {icon: 'mdi-microsoft-windows', text:'Dashboard', route: '/'},
          {icon: 'mdi-account', text:'Users', route: '/users'}
      ],
      profiles :[
          {icon: 'mdi-logout-variant', text:'Logout', route: '/login'}
      ]
    }
  },
  mounted () {

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
        alert('Logout sucess')
      } catch (error) {
        console.log(error)
      } finally {
        router.push('/')
      }
    },
  }
}
</script>
