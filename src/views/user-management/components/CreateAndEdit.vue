<template>
  <v-row>
    <v-dialog
      class="rounded-xl"
      v-bind="getAttributesBinding"
      v-on="$listeners"
      :key="value"
      scrollable
      persistent
      width="760px"
    >
      <v-card elevation="4" light tag="section">
        <v-card-title class="justify-center">
          <span>{{ isEdit ? "Edit User" : "Create User" }}</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form v-model="createValid" :disabled="loading" ref="form_register">
            <v-card-text>
              <v-row>
                <v-col cols="6" class="py-0 mt-6">
                  <v-text-field
                    v-model="form.id"
                    label="ID*"
                    :rules="[
                      (v) => !!v || 'ID is required',
                      (v) =>
                        (v && v.length <= 5 && v.length >= 5) ||
                        'ID must be 5 characters',
                    ]"
                    type="text"
                    dense
                    outlined
                    required
                  />
                </v-col>
                <v-col cols="6" class="py-0 mt-6">
                  <v-text-field
                    v-model="form.name"
                    label="Full Name*"
                    :rules="[(v) => !!v || 'Full Name is required']"
                    type="text"
                    dense
                    outlined
                    required
                  />
                </v-col>
                <v-col cols="6" class="py-0">
                  <v-text-field
                    v-model="form.phoneNumber"
                    label="Phone Number"
                    name="phone-number"
                    type="phone"
                    dense
                    outlined
                    required
                  />
                </v-col>
                <v-col cols="6" class="py-0">
                  <v-text-field
                    v-model="form.email"
                    label="Email*"
                    :rules="[rules.emailRequired, rules.email]"
                    :disabled="isEdit"
                    type="email"
                    dense
                    outlined
                    required
                  />
                </v-col>
                <v-col cols="6" class="py-0">
                  <v-autocomplete
                    v-model="form.status"
                    :items="statusList"
                    label="Status"
                    :rules="[(v) => !!v || 'Status is required']"
                    type="text"
                    clearable
                    outlined
                    dense
                    item-value="id"
                    item-text="name"
                    return-object
                  ></v-autocomplete>
                </v-col>
                <v-col cols="6" class="py-0">
                  <v-autocomplete
                    v-model="form.role"
                    :items="roleList"
                    label="User Role"
                    :rules="[(v) => !!v || 'Role is required']"
                    type="text"
                    clearable
                    outlined
                    dense
                    item-value="id"
                    item-text="name"
                    return-object
                  ></v-autocomplete>
                </v-col>
                <v-col cols="6" class="py-0">
                  <v-text-field
                    v-if="!isEdit"
                    v-model="form.password"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.passwordRequired, rules.min]"
                    :type="showPassword ? 'text' : 'password'"
                    label="Please enter password*"
                    counter
                    dense
                    outlined
                    required
                    @click:append="showPassword = !showPassword"
                  />
                </v-col>
              </v-row>
              <v-row align="center" justify="space-around" class="mt-4">
                <v-col cols="12" class="d-flex">
                  <v-btn color="error" depressed @click="onCancel">
                    Cancel
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    depressed
                    :loading="loading"
                    :disabled="!createValid"
                    @click="onCreateOrEdit"
                  >
                    {{ isEdit ? "Edit" : "Create" }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
import { useFilterStore } from "@/store/useFilterStore";

export default {
  name: "CreateAndEditView",
  props: {
    value: {
      type: Boolean,
      default: () => false,
    },
    items: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    isEdit: {
      type: Boolean,
      default: () => false,
    },
  },
  watch: {
    items: {
      immediate: true,
      deep: true,
      handler(val) {
        if (val && this.isEdit) {
          this.form = cloneDeep(val);
        } else {
          this.form = {};
        }
      },
    },
  },
  data() {
    return {
      dialog: false,
      tab: 0,
      snackbar: false,
      showPassword: false,
      createValid: false,
      form: {
        name: "",
        phoneNumber: "",
        email: "",
        password: "",
      },

      statusList: useFilterStore().statuses,
      roleList: useFilterStore().roles,

      rules: {
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return (
            pattern.test(value) || "Your Email should look like user@email.com"
          );
        },
        min: (v) =>
          (v && v.length >= 8) || "Your password must be at least 8 characters",
        emailRequired: (value) => !!value || "You must enter your Email",
        passwordRequired: (value) => !!value || "Your password is required",
      },
    };
  },
  async create() {
    await useFilterStore().getStatusList();
    await useFilterStore().getRoleList();
  },
  methods: {
    onCancel() {
      this.$emit("onCancel");
    },
    onCreateOrEdit() {
      if (!this.$refs.form_register.validate()) return;
      this.$emit("submit", this.form);
    },
  },
  computed: {
    getAttributesBinding() {
      return {
        ...this.$attrs,
        value: this.value,
        loading: this.loading,
      }
    },
  },
};
</script>
