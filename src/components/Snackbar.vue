<template>
  <v-snackbar
    v-on="$listeners"
    v-bind="$attrs"
    :color="color"
    :timeout="timeout"
    top
    right
  >
    <span>{{ text}}</span>
  </v-snackbar>
</template>

<script>
export default {
  name: "SnackbarView",
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    text: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },  
    timeout: {
      type: Number,
      required: false,
      default: () => 2000,
    },
  },
  watch: {
    value: {
      handler (val) {
        alert(val, 'iam')
      }
    }
  }
};
</script>
