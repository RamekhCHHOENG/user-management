<template>
  <v-dialog
    class="rounded-xl"
    v-bind="getAttributesBinding"
    v-on="$listeners"
    scrollable
    persistent
    width="560px"
  >
    <v-card
      class="mx-auto"
    >
      <v-card-title class="justify-center">
          User Detail
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="text--primary">
        <div class="ma-3">
          <v-row class="mt-6">
            <v-col cols="6" class="ma-0 pa-0">User ID</v-col>
            <v-col cols="6" class="font-weight-bold text-right ma-0 pa-0">{{ items.id }}</v-col>
          </v-row>
          <v-row class="mt-6">
            <v-col cols="6" class="mt-0 pa-0">User Name</v-col>
            <v-col cols="6" class="font-weight-bold text-right ma-0 pa-0">{{ items.name }}</v-col>
          </v-row>
          <v-row class="mt-6">
            <v-col cols="6" class="mt-0 pa-0">Email</v-col>
            <v-col cols="6" class="font-weight-bold text-right ma-0 pa-0">{{ items.email }}</v-col>
          </v-row>
          <v-row class="mt-6">
            <v-col cols="6" class="mt-0 pa-0">Role</v-col>
            <v-col cols="6" class="font-weight-bold text-right ma-0 pa-0">{{ items.role}}</v-col>
          </v-row>
          <v-row class="mt-6">
            <v-col cols="6" class="mt-0 pa-0">Status</v-col>
            <v-col cols="6" class="font-weight-bold text-right ma-0 pa-0">{{ items.status}}</v-col>
          </v-row>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="error"
          outlined
          @click="onCancel"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DetailView",
  props: {
    value: {
      type: Boolean,
      default: () => false,
    },
    items: {
      type: Object,
      default: () => {},
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    getAttributesBinding() {
      return {
        ...this.$attrs,
        value: this.value,
        loading: this.loading
      };
    },
  },
  methods: {
    onCancel () {
      this.$emit('onCancel')
    }
  }
};
</script>
