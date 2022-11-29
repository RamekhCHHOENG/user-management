<template>
  <v-snackbar
    v-model="showSnackbar"
    v-bind="options"
    :multi-line="true"
    bottom
    right
  >
    {{ message }}
  </v-snackbar>
</template>

<script>
import isEmpty from 'lodash/isEmpty'

export default {
  name: 'SnackbarComponent',
  data () {
    return {
      showSnackbar: false,
      message: '',
      options: {
        color: 'success',
        timeout: 3000
      }
    }
  },
  methods: {
    show (message, options = {}) {
      this.message = message

      if (!isEmpty(options)) {
        this.$set(this, 'options', options)
      }

      this.showSnackbar = true
    }
  }
}
</script>
