<template>
    <v-row>
      <v-dialog
        class="rounded-xl"
        v-bind="getAttributesBinding"
        v-on="$listeners"
        scrollable
        persistent
        width="600px"
      >
        <v-card elevation="4" light tag="section">
          <v-card-title class="justify-center">
            <span>{{ isEdit ? 'Edit User' : 'Create User'}}</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-form
                ref="form_register"
                v-model="createValid"
                lazy-validation
            >
                <v-card-text>
                <v-text-field
                    v-model="registerForm.name"
                    label="Full Name*"
                    prepend-icon="mdi-account"
                    :rules="[
                    v => !!v || 'Full Name is required',
                    ]"
                    type="text"
                    dense
                    outlined
                    required
                />
                <v-text-field
                    v-model="registerForm.phoneNumber"
                    label="Phone Number"
                    name="phone-number"
                    prepend-icon="mdi-phone"
                    type="phone"
                    dense
                    outlined
                    required
                />
                <v-text-field
                    v-model="registerForm.email"
                    label="Email*"
                    :rules="[
                    v => !!v || 'Email is required',
                    ]"
                    prepend-icon="mdi-email"
                    type="email"
                    dense
                    outlined
                    required
                />
                <v-text-field
                    v-model="registerForm.password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.passwordRequired, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    label="Please enter your password*"
                    prepend-icon="mdi-lock"
                    counter
                    dense
                    outlined
                    required
                    @click:append="show1 = !show1"
                />
                <v-row align="center" justify="space-around" class="mt-4">
                    <v-col cols="12" class="d-flex">
                    <v-btn
                        color="error"
                        depressed
                        @click="onCancel"
                    >
                        Cancel
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        depressed
                        :disabled="!createValid"
                        @click="register"
                    >
                        Submit
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


export default {
    name: 'CreateAndEditView',
    props: {
      value: {
        type: Boolean,
        default: () => false
      },
      loading: {
        type: Boolean,
        default: false
      },
      isEdit: {
        type: Boolean,
        default: () => false
      }
    },
    data () {
      return {
        dialog: false,
        tab: 0,
        snackbar: false,
        show1: false,
        valid: false,
        createValid: false,
        userType: 1,
        userTypeList: [{ id: 1, name: 'Doctor' }, {id: 2, name: 'Clinic'}],
        form:  {
          email: '',
          password: '',
        },
        registerForm: {
          email: '',
          password: '',
          newPassword: '',
          name: '',
          firstName: '',
          lastName: '',
          userType: 1,
          phoneNumber: ''
        },
        rules: {
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return pattern.test(value) || "Your Email should look like user@email.com";
          },
          emailRequired: value => !!value || "You must enter your Email",
          passwordRequired: value => !!value || "Your password is required",
          passwordMatch: value => value === this.registerForm.newPassword || "Your passwords don't match",
          min: v =>
            v.length >= 8 ||
            "Your password must be at least 8 characters",
          emailMatch: () => "The email and password you entered don't match"
        }
      }
    },
    methods: {
      onCancel () {
        this.$emit('onCancel')
      }
    },
    computed: {
      getAttributesBinding() {
        return {
          ...this.$attrs,
          value: this.value,
          loading: this.loading
        };
      },
    }
  }
  </script>