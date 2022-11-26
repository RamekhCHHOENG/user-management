<template>
  <!-- :drawer-items="drawerItems" -->
  <n-app-layout
    :profile-menu-user="user"
    :profile-menu-items="profileMenuItems"
    :on-click-on-logout="onClickOnLogout"
  >
  </n-app-layout>
</template>

<script>

import NAppLayout from './NAppLayout'
import { IconEnum } from '@/constants'

export default {
  name: 'NAppWireframe',
  components: {
    NAppLayout
  },
  // props: {
  //   DrawerBuilder: {
  //     required: true
  //   }
  // },
  data: () => ({
    user: {
      name: 'Unauthenticated user',
      role: 'Login required',
      participantCode: 'Unknown Participant Code'
    }
  }),
  methods: {
    async onClickOnLogout () {
      // will implement it later
    }
  },
  computed: {
    // drawerItems () {
    //   return this.DrawerBuilder.build(this.$can)
    // },
    profileMenuItems () {
      return [
        {
          icon: IconEnum.LOCK,
          title: 'Change password',
          type: 'item',
        },
        {
          icon: IconEnum.INFO,
          title: 'About',
          type: 'item',
        }
      ]
    }
  }
}
</script>
