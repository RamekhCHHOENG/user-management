<template>
  <v-app>
    <router-view/>

    <snackbar-manager left ref="snackbar" key="snackbarManager" />
    <error-dialog ref="errorDialog" key="errorDialog" />
  </v-app>
</template>

<script>

import SnackbarManager from '@/components/Snackbar.vue'
import ErrorDialog from '@/components/ErrorDialog.vue'

export default {
  name: 'App',
  components: {
    SnackbarManager,
    ErrorDialog
  },
  mounted () {
    this.global()
  },
  methods: {
    global () {
      this.$root.$snackbar = this.$refs.snackbar
      this.$root.$error = this.$refs.errorDialog
    }
  }
};
</script>
