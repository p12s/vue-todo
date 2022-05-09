<template>
  <v-list
    class="pa-0"
    flat
  >
    <div
      v-for="task, index in $store.state.tasks"
      :key="index"
    >
      <v-list-item 
        @click="doneTask(task.id)"
        :class="{ 'deep-orange lighten-4' : task.done }"
      >
        <template v-slot:default>
          <v-list-item-action>
            <v-checkbox
              :input-value="task.done"
              color="primary"
            ></v-checkbox>
          </v-list-item-action>
          <v-list-item-content
            :class="{ 'text-decoration-line-through' : task.done }"
          >
            <v-list-item-title>{{ task.id + '. ' + task.title }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn 
              @click.stop="deleteTask(task.id)"
              icon
            >
              <v-icon color="primary lighten-1">mdi-trash-can-outline</v-icon>
            </v-btn>
          </v-list-item-action>
        </template>
      </v-list-item>
      <v-divider></v-divider>
    </div>
  </v-list>
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