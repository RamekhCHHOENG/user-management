<template>
  <n-app-layout :user="user"/>
</template>

<script>

import NAppLayout from './NAppLayout'
import { useAuthStore } from '@/store/useAuthStore'

export default {
  name: 'NAppWireframe',
  components: {
    NAppLayout
  },
  data: () => ({
    user: useAuthStore().user
  }),
  mounted () {
    useAuthStore().auth()
  }
}
</script>
