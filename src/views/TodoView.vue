<template>
  <div class="home pa-0">
    <field-add-task/>
    <list-tasks
      v-if="$store.state.tasks.length"
    />
    <div
      v-else
      class="no-tasks text-h5 pa-3"
    >
      <v-icon large color="lighten-1">mdi-smoking</v-icon>
      Cool! The work is done
    </div>
  </div>
</template>

<script>
  import FieldAddTask from '@/components/Todo/FieldAddTask.vue'
  import ListTasks from '@/components/Todo/ListTasks.vue'

  export default {
    name: 'Todo',
    components: {
      'field-add-task': FieldAddTask,
      'list-tasks': ListTasks,
    }
  }
</script>

<style lang="sass">
.no-tasks
  position: absolute
  left: 50%
  top: 60%
  transform: translate(-50%, -50%)
  opacity: .5
</style>