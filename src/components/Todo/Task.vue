<template>
  <div>
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
          <task-menu :task="task"/>
        </v-list-item-action>
      </template>
    </v-list-item>
    <v-divider></v-divider>
  </div>
</template>

<script>
export default {
  name: 'todo-task',
  props: ['task'],
  methods: {
    doneTask(id) {
      this.$store.dispatch('doneTask', id)
    }
  },
  components: {
    'task-menu': require('@/components/Todo/TaskMenu.vue').default,
  }
}
</script>