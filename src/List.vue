<script>
import Task from './Task.vue'

export default {
    components: {
        appTask: Task,
    },
    props: {
        pagination: {
            type: Object,
            required: true
        },
        tasks: {
            type: Array,
            required: true
        },
        time: {
            type: Object,
            required: true
        }
    },
    computed: {
      empty() {
        return this.tasks.length >= 5 ? 0 : 5 - this.tasks.length 
      }
    }
}
</script>

<template>
  <table class="tasks__list">
    <tbody v-if="tasks.length === 0">
      <tr>
        <td>Tasks is not found</td>
      </tr>
    </tbody>
    <tbody>
      <app-task
        v-for="(t, k) in tasks"
        :key="k"
        :task="t"
        :current="time"
      />
    </tbody>
    <tbody v-if="empty">
      <tr
        v-for="e in empty"
        :key="e"
      >
        <td />
      </tr>
    </tbody>
  </table>
</template>
<style lang="scss">
@import './themegray.scss';
.tasks__list {
  width: 80%;
  height: 300px;
  vertical-align: top;
  margin: 30px auto;
  border-collapse: collapse;
  caption {
    font-size: 20px;
    font-weight: bold;
    span {
      color: $link-color;
    }
  }
  tbody {
    td {
      height: 60px;
    }
  }
}
@media screen and (min-width: 300px) and (max-width: 489px) {
 .tasks__list {
    width: 90% !important;
  }
}
</style>