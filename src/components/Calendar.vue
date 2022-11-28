<template>
  <div class="calendar">
    <div class="calendar-header">
      <div class="calendar-header-arrow" @click="decreaseMonth">
        <img src="@/assets/icons/chevron_left.svg">
      </div>
      <p class="calendar-header-text">{{ month }}&nbsp;{{ year }}</p>
      <div class="calendar-header-arrow" @click="increaseMonth">
        <img src="@/assets/icons/chevron_right.svg">
      </div>
    </div>
    <table>
      <tr>
        <th v-for="day in days" :key="day">{{ day.substring(0,3) }}</th>
      </tr>
      <tbody>
        <tr v-for="(arr, index) in daysAsWeeks" :key="index">
          <td v-for="item in arr" :key="item" :class="item.class">{{ item.dayShort }}</td>
        </tr>
      </tbody>
    </table>
  </div> 
</template>

<script>
export default {
  data() {
    return {
      date: new Date(),
      locale: 'en-US'
    }
  },
  computed: {
    months() {
      let dates = []
      let date = new Date('2022-01-01')
      for (let i = 0; i <= 11; i++) {
        dates.push(date.toLocaleDateString(this.locale, { month: 'long' }))
        date = new Date(date.setMonth(date.getMonth() + 1))
      }
      return dates
    },
    days() {
      let days = []
      let day = new Date('2022-11-21')
      for (let i = 0; i <= 6; i++) {
        days.push(day.toLocaleDateString(this.locale, { weekday: 'long' }))
        day = new Date(day.setDate(day.getDate() + 1))
      }
      return days
    },
    month() {
      return this.date.toLocaleDateString(this.locale, { month: 'long' })
    },
    year() {
      return this.date.toLocaleDateString(this.locale, { year: 'numeric' })
    },
    daysInMonth() {
      let firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1)
      const lastDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0)
      const idx = this.days.indexOf(firstDay.toLocaleDateString(this.locale, { weekday: 'long' }))
      const daysNum = 42

      let days = []
      if (idx > 0) {
        for (let i = 0; i > -idx; i--) {
          let date = new Date(this.date.getFullYear(), this.date.getMonth(), i)
          days.unshift({ 
            value: date, 
            dayShort: date.getDate(), 
            class: 'calendar-days-secondary' 
          })
        }
      }
      for (let i = firstDay.getDate(); days.length < daysNum; i++) {
        days.push({ 
          value: firstDay, 
          dayShort: firstDay.getDate(), 
          class: firstDay < lastDay ? 'calendar-days-primary' : 'calendar-days-secondary' 
        })
        firstDay = new Date(firstDay.setDate(firstDay.getDate() + 1))
      }
      return days
    },
    daysAsWeeks() {
      let weeks = this.daysInMonth
      let zmienna = []
      while(weeks.length) {
        zmienna.push(weeks.splice(0,7))
      }
      return zmienna
    }
  },
  methods: {
    decreaseMonth() {
      this.date = new Date(this.date.setMonth(this.date.getMonth() - 1))
    },
    increaseMonth() {
      this.date = new Date(this.date.setMonth(this.date.getMonth() + 1))
    }
  },
}
</script>

<style scoped lang="scss">
  .calendar {
    background: var(--calendar-dark-gray);
    padding: 10px;
    border-radius: 4px;

    box-shadow: 6px 6px 10px 1px rgb(121, 121, 121);

    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0 16px 0;
      
      &-arrow {
        width: 20px;
        height: 20px;
        img {
          width: inherit;
          height: inherit;
          filter: invert(80%);
        }
      }
      p {
        font-size: 14px;
        color: var(--calendar-white)
      }
    }

    table {
      border-collapse: collapse;
      text-align: center;

      th {
        font-weight: 500;
        font-size: 12px;
        color: #ffffff;
        text-decoration: none;

        padding: 12px 6px;
        width: 40px;
      }
      td {
        color: var(--calendar-white);
        padding: 4px 6px;
        position: relative;
        vertical-align: middle;

      }
      td.calendar-days-secondary {
        color: var(--calendar-light-gray);
      }

    }
  }
</style>