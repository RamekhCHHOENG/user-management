<template>
  <h3> {{ value }} </h3>
</template>

<script>

export default {
  name: 'NAppTitleCard',
  props: {
    value: {
      type: String,
      default: () => ''
    }
  },
  data () {
    return {

    }
  }
}
</script>
