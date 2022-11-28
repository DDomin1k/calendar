<template>
  <div class="home">
    <!-- <Calendar msg="Welcome to Your Vue.js App"/> -->
    <Calendar />
  </div>
</template>

<script>
import Calendar from '@/components/Calendar.vue'

export default {
  name: 'HomeView',
  components: {
    Calendar
  }
}
</script>