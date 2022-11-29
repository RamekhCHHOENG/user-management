<template>
  <v-row>
    <v-dialog
      class="rounded-xl"
      v-bind="getAttributesBinding"
      v-on="$listeners"
      :key="value"
      scrollable
      persistent
      width="500px"
    >
      <v-card elevation="4" light tag="section">
        <v-card-title>
          <span>Delete User</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-6">
          <span class="body-1"
            >Are you sure you want to delete user name -
            <span class="red--text">{{ items.name }}</span> ?
          </span>
        </v-card-text>
        <v-card-actions class="pa-6 pt-0">
          <v-row justify="space-around" class="mt-4">
            <v-col cols="12" class="d-flex">
              <v-btn color="error" depressed @click="onCancel"> Cancel </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                depressed
                :loading="loading"
                @click="onDelete"
              >
                Confirm
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "DeleteUserDialog",
  props: {
    value: {
      type: Boolean,
      default: () => false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onCancel() {
      this.$emit("onCancel");
    },
    onDelete() {
      this.$emit("onDelete");
    },
  },
  computed: {
    getAttributesBinding() {
      return {
        ...this.$attrs,
        value: this.value,
        loading: this.loading,
      };
    },
  },
};
</script>
