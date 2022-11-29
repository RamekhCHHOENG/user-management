<template>
  <v-row>
    <v-col cols="4"></v-col>
    <v-col cols="4">
      <v-row>
        <v-col class="mt-6">
          <v-alert :value="alert.show" :type="alert.type">
            {{ alert.text }}
          </v-alert>
        </v-col>
      </v-row>
      <v-card
        class="mt-12"
        elevation="4"
        tag="section"
        light
      >
        <v-card-title class="justify-center">
          <div>APPLICATION</div>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-tabs
            v-model="tab"
            active-class="white"
            background-color="grey lighten-2"
            height="40"
            fixed-tabs
            hide-slider
          >
            <v-tab>Login</v-tab>
            <v-tab>New user?</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item :value="0">
              <v-card-text>
                <v-form v-model="valid" ref="form">
                  <v-text-field
                    v-model="form.email"
                    :rules="[rules.emailRequired, rules.email]"
                    label="Please enter your Email"
                    prepend-icon="mdi-email"
                    type="email"
                    clearable
                    dense
                    outlined
                    validate-on-blur
                  />
                  <v-text-field
                    v-model="form.password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.passwordRequired, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"
                    label="Please enter your password"
                    prepend-icon="mdi-lock"
                    counter
                    dense
                    outlined
                  />
                  <v-row class="text-center mt-4">
                    <v-col cols="12">
                      <v-btn
                        color="primary"
                        depressed
                        block
                        :disabled="!valid"
                        @click="login"
                      >
                        Login
                      </v-btn>
                    </v-col>
                    <v-col class="text-left">
                      <a href="/reset-password" class="subtitle-2">Forgot your password?</a>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-tab-item>
            <v-tab-item :value="1">
              <v-form ref="form_register" v-model="createValid">
                <v-card-text>
                  <v-text-field
                    v-model="registerForm.name"
                    label="Full Name*"
                    prepend-icon="mdi-account"
                    :rules="[(v) => !!v || 'Full First Name is required']"
                    type="text"
                    dense
                    outlined
                    required
                  />
                  <v-text-field
                    v-model="registerForm.email"
                    label="Email*"
                    :rules="[(v) => !!v || 'Email is required']"
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
                  <v-text-field
                    v-model="registerForm.newPassword"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.passwordRequired, rules.passwordMatch]"
                    :type="show2 ? 'text' : 'password'"
                    @click:append="show2 = !show2"
                    label="Please enter your password*"
                    prepend-icon="mdi-lock"
                    counter
                    dense
                    outlined
                    required
                  />
                  <v-row class="mt-4">
                    <v-col cols="12" class="d-flex">
                      <v-btn
                        color="primary"
                        depressed
                        block
                        :disabled="!createValid"
                        @click="register"
                      >
                        Submit
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-form>
            </v-tab-item>
          </v-tabs-items>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="4"></v-col>
  </v-row>
</template>

<script>

// import router from '@/router'
import { useAuthStore } from '@/store/useAuthStore'

export default {
  name: "LoginView",
  //     value: {
  //       type: Boolean,
  //       default: () => false
  //     },
  //     loading: {
  //       type: Boolean,
  //       default: false
  //     }
  //   },
  data() {
    return {
      user: useAuthStore(),
      dialog: false,
      tab: 0,
      show1: false,
      show2: false,
      valid: false,
      createValid: false,
      alert: {
        show: false,
        text: 'error',
        type: 'error',
      },
      snackbar: {
        toggle: false,
        color: '',
        text: '',
      },
      form: {
        email: '',
        password: '',
      },
      registerForm: {
        name: '',
        email: '',
        password: '',
        newPassword: ''
      },
      rules: {
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return (
            pattern.test(value) || "Your Email should look like user@email.com"
          );
        },
        emailRequired: (value) => !!value || "You must enter your Email",
        passwordRequired: (value) => !!value || "Your password is required",
        passwordMatch: (value) =>
          value === this.registerForm.password ||
          "Your passwords don't match",
        min: (v) =>
          v.length >= 8 || "Your password must be at least 8 characters",
        emailMatch: () => "The email and password you entered don't match",
      },
    };
  },
  methods: {
    async login() {
      if (!this.$refs.form.validate()) return

      const payload = {
        email: this.form.email,
        password: this.form.password
      }

      await useAuthStore().login(payload)
        .then(() => {
          //login success
        }).catch((error) => {
          this.$root.$error.show('Error', error)
        })
    },
    async register() {
      if (!this.$refs.form_register.validate()) return;
      
      const payload = {
          name: this.registerForm.name,
          email: this.registerForm.email,
          password: this.registerForm.password
        }

        await useAuthStore().register(payload)
          .then(() => {
            this.$root.$snackbar.show('Successfully register')
          }).catch((error) => {
            this.$root.$error.show('Error', error)
          })
    },
  },
};
</script>
