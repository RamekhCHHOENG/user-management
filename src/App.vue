<template>
  <v-app>
    <router-view/>
  </v-app>
</template>

<script>

// import NAppWireframes from '@/wireframes/NAppWireframe.vue'
import { useAuthStore } from '@/store/useAuthStore'

export default {
  name: 'App',
  // components: {
  //   NAppWireframes
  // }, 
  mounted () {
    useAuthStore().auth()
  },
  data: () => ({
    user: useAuthStore().user
  }),
};
</script>
