<template>
  <v-app>
    <n-app-wireframes />
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import NAppWireframes from '@/wireframes/NAppWireframe.vue'

export default {
  name: 'App',
  components: {
    NAppWireframes
  },

  data: () => ({
    //
  }),
};
</script>
