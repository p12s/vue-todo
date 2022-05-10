<template>
  <div>
    <v-list-item 
      @click="doneTask(task.id)"
      :class="{ 'deep-orange lighten-4' : task.done }"
      class="white"
      :ripple="false"
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
        
        <v-list-item-action v-if="task.dueDate">
          <v-list-item-action-text>
            <v-icon small>mdi-calendar</v-icon>
            {{ task.dueDate | niceDate }}
          </v-list-item-action-text>
        </v-list-item-action>

        <v-list-item-action>
          <task-menu :task="task"/>
        </v-list-item-action>

        <v-list-item-action 
          v-if="$store.state.sorting"
          class="handle"
        >
          <v-btn icon>
            <v-icon>mdi-drag-horizontal-variant</v-icon>
          </v-btn>
        </v-list-item-action>
      </template>
    </v-list-item>
    <v-divider></v-divider>
  </div>
</template>

<script>
import { format } from 'date-fns'

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
  },
  filters: {
    niceDate(value) {
      return format(new Date(value), 'MMM dd')
    }
  }
}
</script>

<style lang="sass">
  .sortable-ghost
    opacity: 0
  .sortable-drag
    box-shadow: 0 0 10px rgba(0,0,0,.3)
</style>
