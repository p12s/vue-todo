<template>
  <div class="home pa-0">
    <field-add-task/>
    <v-list
      v-if="$store.state.tasks.length"
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

  export default {
    name: 'Todo',
    components: {
      'field-add-task': FieldAddTask
    },
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

<style lang="sass">
.no-tasks
  position: absolute
  left: 50%
  top: 60%
  transform: translate(-50%, -50%)
  opacity: .5
</style>