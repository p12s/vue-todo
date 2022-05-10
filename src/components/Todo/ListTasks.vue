<template>
  <v-list
    class="pa-0"
    flat
  >
    <draggable 
      v-model="tasks"
      handle=".handle"
    >      
      <task
        v-for="task, index in tasks"
        :key="index"
        :task="task"
      />
    </draggable>
  </v-list>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'list-task',
  components: {
    draggable,
    'task': require('@/components/Todo/Task.vue').default,    
  },
  computed: {
    tasks: {
        get() {
            return this.$store.getters.tasksFiltered
        },
        set(value) {
            this.$store.dispatch('setTasks', value)
        }
    }
  }
}
</script>
