<template>
  <v-list
    class="pa-0"
    flat
  >
    <task
      v-for="task, index in $store.state.tasks"
      :key="index"
      :task="task"
    />
  </v-list>
</template>

<script>
export default {
  components: {
    'task': require('@/components/Todo/Task.vue').default
  }
}
</script>
