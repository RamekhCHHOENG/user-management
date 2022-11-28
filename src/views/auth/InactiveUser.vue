<template>
  <v-row>
    <v-col cols="4"></v-col>
    <v-col cols="4">
      <v-card class="mt-12" elevation="4" tag="section" light>
        <v-card-title class="justify-center"> Caution!! </v-card-title>
        <template >
          <v-row>
            <v-col cols="12" class="pa-6 text-center">
              <span class="subtitl font-weight-bold red--text">
                This user have been inactivated or deleted.
                Please contact admin for more information.
                Thank you!!🥹😌
              </span>
            </v-col>
            <v-col cols="12" class="text-center">
              <a href="/auth">
                <span class="pa-6">Back to login page</span>
              </a>
            </v-col>
          </v-row>
        </template>
      </v-card>
    </v-col>
    <v-col cols="4"></v-col>
  </v-row>
</template>

<script>
export default {
  name: 'InactiveUser'
}
</script>
