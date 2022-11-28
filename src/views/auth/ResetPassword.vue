<template>
  <v-row>
    <v-col cols="4"></v-col>
    <v-col cols="4">
      <v-card class="mt-12" elevation="4" tag="section" light>
        <v-card-title> Reset Password </v-card-title>
        <v-form v-model="valid" ref="form" :disable="isBusy">
          <template v-if="requestSent">
            <v-row>
              <v-col cols="12" class="text-center">
                <span class="subtitle ma-12 font-weight-bold">
                  We have send you email to reset your password.
                </span>
              </v-col>
              <v-col cols="12" class="text-center">
                <a href="/auth">
                  <span class="pa-6">Back to login page</span>
                </a>
              </v-col>
            </v-row>
          </template>
          <template v-else>
            <span class="font-weight-bold subtitle-1 px-3">Enter your email address and reset you password</span>
            <v-card-text>
              <v-text-field
                v-model="form.email"
                label="Email Address"
                :rules="[rules.emailRequired, rules.email]"
                type="email"
                dense
                outlined
              />
            </v-card-text>
          </template>
        </v-form>
        <v-card-actions v-if="!requestSent">
          <v-row>
            <v-col cols="12" class="px-6">
              <v-btn
                class="my-0"
                color="primary"
                depressed
                block
                :disabled="!valid"
                :loading="isBusy"
                @click="onRequestResetPassword"
              >
                Submit
              </v-btn>
            </v-col>
            <v-col cols="12">
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="4"></v-col>
  </v-row>
</template>

<script>

import { useUserStore } from '@/store/useUserStore'

export default {
  name: 'ResetPassword',
  data () {
    return {
      form: {
        email: ''
      },
      valid: false,
      requestSent: false,
      isBusy: false,
      rules: {
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return (
            pattern.test(value) || "Your Email should look like user@email.com"
          );
        },
        emailRequired: (value) => !!value || "You must enter your Email"
      }
    }
  },
  methods: {
    async onRequestResetPassword () {
      if (!this.$refs.form.validate()) return
    
      try {
        this.isBusy = true
        await useUserStore().resetPassword(this.form)

        this.requestSent = true
      } catch (error) {
        console.log(error)
      } finally {
        this.isBusy = false
      }
    }
  }
}
</script>
