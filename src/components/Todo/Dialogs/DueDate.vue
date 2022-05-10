<template>
  <v-dialog
    ref="dialog"
    :value="true"
    :return-value.sync="date"
    persistent
    width="290px"
  >
    <v-date-picker
      v-model="date"
      scrollable
    >
      <v-spacer></v-spacer>
      <v-btn
        text
        color="primary"
        @click="$emit('close')"
      >
        Cancel
      </v-btn>
      <v-btn
        text
        color="primary"
        @click="saveTask"
      >
        OK
      </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
export default {
  props: ['task'],
  data: () => ({
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
  }),
  mounted() {
    if (this.task.dueDate) {
      this.date = this.task.dueDate
    }
  },
  methods: {
    saveTask() {
      const payload = {
        id: this.task.id,
        dueDate: this.date
      }
      this.$store.dispatch('updateTaskDueDate', payload)
      this.$emit('close')
    }
  }
}
</script>

<style>

</style>