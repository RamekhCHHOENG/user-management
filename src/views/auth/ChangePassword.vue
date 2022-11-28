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
        <v-card-title class="justify-center">
          <span>Change Password</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form v-model="valid" :disabled="loading" ref="form">
            <v-row>
              <v-col cols="12" class="py-0 mt-6">
                <v-text-field
                  v-model="form.newPassword"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.passwordRequired, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  label="New Password*"
                  prepend-icon="mdi-lock"
                  counter
                  dense
                  outlined
                  required
                  @click:append="show1 = !show1"
                />
              </v-col>
              <v-col cols="12" class="my-0 py-0">
                <v-text-field
                  v-model="form.confirmPassword"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.passwordRequired, rules.passwordMatch]"
                  :type="show2 ? 'text' : 'password'"
                  @click:append="show2 = !show2"
                  label="Confirm Password*"
                  prepend-icon="mdi-lock"
                  counter
                  dense
                  outlined
                  required
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-row justify="space-around">
            <v-col cols="12" class="d-flex">
              <v-btn
                @click="onCancel"
                color="error"
                depressed
              > 
                Cancel 
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                depressed
                :loading="loading"
                :disabled="!valid"
                @click="onChangePassword"
              >
                Submit
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
  name: "CreateAndEditView",
  props: {
    value: {
      type: Boolean,
      default: () => false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      snackbar: false,
      show1: false,
      show2: false,
      valid: false,
      form: {
        newPassword: "",
        confirmPassword: "",
      },
      rules: {
        passwordRequired: (value) => !!value || "Your password is required",
        passwordMatch: (value) =>
          value === this.form.newPassword || "Your passwords don't match",
        min: (v) =>
          v.length >= 8 || "Your password must be at least 8 characters",
      },
    };
  },
  methods: {
    onCancel() {
      this.$emit("onCancel");
    },
    async onChangePassword() {
      if (!this.$refs.form.validate()) return;

      this.$emit("onSubmit", this.form);
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
