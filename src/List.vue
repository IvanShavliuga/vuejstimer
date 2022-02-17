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
    data: () => ({
        empty: []
    }),
}
</script>

<template>
  <table class="tasks__list">
    <caption>
      Task
      <span title="position">{{ pagination.position + 1 }}</span>
      of Tasks
      <span title="length">{{ pagination.length }}</span>
    </caption>
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