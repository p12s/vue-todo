<template>
  <v-snackbar
    v-model="$store.state.snackbar.show"
  >
    {{ $store.state.snackbar.text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        color="pink"
        text
        v-bind="attrs"
        @click="$store.state.snackbar.show = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: 'shared-snackbar'
}
</script>
<style lang="sass">
  div.v-snack:not(.v-snack--absolute)
    height: 100%
</style>