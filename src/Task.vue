<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
    current: {
      type: Object,
      required: true,
    },
  },
  methods: {
    active() {
      let tt =
        this.task.hour * 60 * 60 + this.task.minute * 60 + this.task.second
      let d =
        this.current.hour * 60 * 60 +
        this.current.minute * 60 +
        this.current.second
      let def = tt - d
      if (def > 0) return 'future '
      else if (def === 0) return 'now '
      else return 'present '
    },
  },
}
</script>
<template>
  <tr class="task">
    <td
      class="task__title"
      title="title"
    >
      #{{ task.id + 1 }} {{ task.title }}
    </td>
    <td
      class="task__message"
      title="message"
    >
      {{ task.message }}
    </td>
    <td class="task__status">
      <span
        class="task__time"
        title="time"
      >
        {{ task.hour + ':' + task.minute + ':' + task.second }}
      </span>
      <span
        :class="'task__active ' + active()"
        title="status "
      >
        {{ active() }}
      </span>
    </td>
  </tr>
</template>
<style lang="scss">
@import './themegray.scss';
.task {
  tr {
    height: 60px;
  }
  td {
    border-bottom: 1px solid black;
    vertical-align: bottom;
    height: 60px;
    font-family: $task-font;
  }
  &__title {
    padding: 10px;
    color: black;
    font-weight: bold;
  }
  &__message {
    padding: 10px;
    text-align: justify;
    color: black;
  }
  &__status {
    padding: 10px;
    .task__active {
      color: black;
    }
  }
  &__time {
    color: #de54de;
  }
}
.future {
  color: green !important;
  margin-left: 5px;
}
.now {
  color: #dd0 !important;
  margin-left: 5px;
}
.present {
  color: red !important;
  margin-left: 5px;
}
@media screen and (min-width: 300px) and (max-width: 489px) {
  .task {
    font-size: 0.7em;
  }
}
</style>

