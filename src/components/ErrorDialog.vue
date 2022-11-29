<template>
  <v-dialog
    v-model="dialog"
    :width="options.width"
    @keydown.esc="dialog = false"
    style="z-index: 9999"
  >
    <v-card>
      <v-toolbar
        :color="options.color"
        dark
        dense
        flat
      >
        <v-toolbar-title>
          {{ title }}
        </v-toolbar-title>
      </v-toolbar>

      <v-card-text
        v-show="!!message"
        class="pa-4"
      >
        {{ message }}
      </v-card-text>

      <v-card-actions class="pa-4">
        <v-btn
          @click.native="dialog = false"
          color="error"
          outlined
          text
        >
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    resolve: null,
    reject: null,
    message: null,
    title: null,
    options: {
      color: "error",
      width: 489,
    },
  }),

  methods: {
    show(title, message, options) {
      this.dialog = true;
      this.title = title;
      this.message = message;
      this.options = Object.assign(this.options, options);
    },
  },
};
</script>
