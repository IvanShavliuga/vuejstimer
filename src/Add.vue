<script>
export default {
    emits: ['add', 'clear'],
    data: () => ({
        task: {
            hour: 8,
            minute: 0,
            second: 0,
            title: 'New timer',
            message: 'Text for timer'
        }
    }),
    methods: {
        add() {
            this.$emit('add',  {
                hour: this.task.hour,
                minute: this.task.minute,
                second: this.task.second,
                message: this.task.message,
                title: this.task.title,
            })
        },
        curr() {
            let d = new Date()
            this.task.hour = d.getHours()
            this.task.minute = d.getMinutes()
            this.task.second = d.getSeconds()
        },
        onKeyup(e) {
            if (e.ctrlKey && e.keyCode === 13) this.add()
            else if (e.keyCode === 13) this.curr()
        }
    }
}
</script>
<template>
  <div>
    <div class="add">
      <input
        v-model="task.hour"
        type="text"
        title="hour"
        class="add__time"
      />
      <span
        class="separator"
        @keyup="onKeyup"
      >:</span>
      <input
        v-model="task.minute"
        type="text"
        title="minute"
        class="add__time"
      />
      <span
        class="separator"
        @keyup="onKeyup"
      > :</span>
      <input
        v-model="task.second"
        type="text"
        title="second"
        class="add__time"
        @keyup="onKeyup"
      />
      <input
        v-model="task.title"
        type="text"
        title="title"
        @keyup="onKeyup"
      />
      <input
        v-model="task.message"
        type="text"
        title="message"
        @keyup="onKeyup"
      />
    </div>
    <div class="add__buttons">
      <button
        title="add task"
        role="button"
        @click="add"
      >
        Добавить ctrl+Enter
      </button>
      <button
        title="add current time"
        role="button"
        @click="curr"
      >
        Текущее время Enter
      </button>
      <button
        title="Clear tasks list"
        role="button"
        @click="$emit('clear')"
      >
        Очистить список
      </button>
    </div>
  </div>
</template>
<style lang="scss">
@import './themegray.scss';
.add {
  margin: 20px auto;
  width: 460px;
  color: red;
  padding: 5px;
  border-bottom: 1px solid red;
  &__time {
    width: 32px!important;
  }
  input {
    background-color: transparent;
    font-family: $task-font;
    border: none;
    color: red;
    margin: 0;
    width: 160px;
    font-size: 23px;
  }
  span {
    font-size: 16px;
  }
}

</style>