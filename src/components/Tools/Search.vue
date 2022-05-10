<template>
  <v-text-field
    v-model="$store.state.search"
    @input="$store.commit('setSearch', $event)"
    @focus="searchClosed = false"
    @blur="searchClosed = true"
    class="expanding-search mt-1"
    :class="{ 'closed' : searchClosed && !$store.state.search }"
    :disabled="$store.state.sorting"
    placeholder="Search"
    dense
    filled
    clearable
    prepend-inner-icon="mdi-magnify"
  ></v-text-field>
</template>

<script>
export default {
  name: 'tools-search',
  data() {
    return {
      searchClosed: true
    }
  }
}
</script>

<style lang="sass">
  .expanding-search
    transition: max-width .5s
    .v-input__slot
      cursor: pointer !important
      &:before, &:after
        border-color: transparent !important
    &.closed
      max-width: 45px
      .v-input__slot
        background: transparent !important
</style>