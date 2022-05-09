<template>
  <v-text-field
    v-model="newTaskTitle"
    @click:append="addTask"
    @keyup.enter="addTask"
    class="pa-3"
    outlined
    label="No more tasks, please!"
    append-icon="mdi-plus"
    hide-details
    clearable
  ></v-text-field>
</template>

<script>
export default {
  data() {
    return {
      newTaskTitle: ''
    }
  },
  methods: {
    doneTask(id) {
      this.$store.commit('doneTask', id)
    },
    deleteTask(id) {
      this.$store.commit('deleteTask', id)
    },
    addTask() {
      this.$store.commit('addTask', this.newTaskTitle)
      this.newTaskTitle = ''
    }
  }
}
</script>

<style>

</style>