<template>
  <div class="text-subtitle-1">
    {{ date }}
  </div>
</template>

<script>
import { format } from 'date-fns'

export default {
  name: 'live-date-time',
  data: () => ({ 
    date: ''
  }),
  methods: {
    getDate() {
      this.date = format(new Date(), 'MMMM dd yyy, EEEE HH:mm:ss')
      setTimeout(this.getDate, 1000)
    }
  },
  mounted() {
    this.getDate()
  }
}
</script>
