<template>
  <div class="home pa-0">
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
    <v-list
      flat
      class="pa-0"
    >
      <div
        v-for="task, index in tasks"
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
  </div>
</template>

<script>
  export default {
    name: 'Todo',
    data() {
      return {
        tasks: [
          {
            id: 1,
            title: 'Sleep, Neo',
            done: true
          },
          {
            id: 2,
            title: 'Give Morpheus',
            done: false
          },
          {
            id: 3,
            title: 'Get out of the car',
            done: false
          }
        ],
        newTaskTitle: ''
      }
    },
    methods: {
      doneTask(id) {
        let task = this.tasks.filter(task => task.id === id)[0]
        task.done = !task.done
      },
      deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id)
      },
      addTask() {
        let max = {
          id: 0
        }
        if (this.tasks.length > 0) {
          max = this.tasks.reduce(function(prev, current) {
            return (prev.id > current.id) ? prev : current
          })
        }

        let newTask = {
          id: max.id + 1, // Date.now(),
          title: this.newTaskTitle,
          done: false
        }
        this.tasks.push(newTask)
        this.newTaskTitle = ''
      }
    }
  }
</script>
