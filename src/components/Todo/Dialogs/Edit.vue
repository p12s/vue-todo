<template>
  <v-dialog
    :value="true"
    persistent
    max-width="290"
  >
    <v-card>
      <v-card-title class="text-h5">
        Edit task?
      </v-card-title>
      <v-card-text>I'd prefer to delete them, but ok</v-card-text>
      <v-text-field 
        v-model="taskTitle"
        @keyup.enter="saveTask"
        class="ma-6"
      />
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          @click="$emit('close')"
          text
        >
          Cancel
        </v-btn>
        <v-btn
          @click="saveTask"
          :disabled="!taskTitle.length || taskTitle === task.title"
          text
        >
          Save new
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'todo-edit',
  props: ['task'],
  data() {
    return {
      taskTitle: ''
    }
  },
  mounted() {
    this.taskTitle = this.task.title
  },
  methods: {
    saveTask() {
      const payload = {
        id: this.task.id,
        title: this.taskTitle
      }
      this.$store.dispatch('updateTaskTitle', payload)
      this.$emit('close')
      this.$vuetify.goTo(0, { duration: 0 })
    }
  }
}
</script>