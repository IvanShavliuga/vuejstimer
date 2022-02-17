<script>

import Add from './Add.vue'
import List from './List.vue'
export default {
  components: {
    appList: List,
    appAdd: Add
  },
  data() {
    return {
      time: {
        hour: 0,
        minute: 0,
        second: 0,
      },
      st: 0,

      tasks: [],
      empty: [],
      elements: [0, 1, 2, 3, 4],
      restore: [0, 0, 0, 0, 0],
      task: {
        hour: 0,
        minute: 0,
        second: 0,
        message: 'Сообщение',
        title: 'Заголовок',
        status: '',
        id: 0,
      },
      pagination: {
        length: 0,
        position: 0,
      },
    }
  },
  created() {
    setInterval(() => {
      this.now()
    }, 1000)
    this.now()
    this.tasks = []
    for (let i = 0; i < 15; i++) {
      let t = {
        id: 0,
        hour: 0,
        minute: 0,
        second: 0,
        message: '',
        title: '',
      }
      if (this.time.minute + i < 59) {
        t.hour = this.time.hour
        t.minute = this.time.minute + i
      } else {
        t.hour = /*(this.tasks[0].hour>23)?(0):(this.tasks[0].hour)*/ +21
        t.minute = i
      }
      t.second = i * 3
      t.message = 'Test timer systems ' + t.minute
      t.title = 'timer (' + Math.floor(Math.random() * 1000) + ')'
      t.id = i
      this.tasks.push(t)
    }
    this.pagination.length = this.tasks.length
    this.pagination.position = 0
  },
  methods: {
    addClick(t) {
      if (!this.tasks) {
        this.tasks = []
      }
      t.id = this.tasks.length
      this.tasks.push(t)
      this.pagination.length = this.tasks.length
      let offset = this.tasks.length - this.pagination.position
      if (this.tasks.length <= 5) {
        this.elements[this.tasks.length - 1] = t.id
        this.empty.length--
      } else if (offset <= 5 && offset > 0) {
        this.elements[offset - 1] = t.id
        this.empty.length--
      }
    },
    now() {
      let d = new Date()
      this.time.hour = d.getHours()
      this.time.minute = d.getMinutes()
      this.time.second = d.getSeconds()
    },
    
    elfilter() {
      return this.elements.filter((i) => {
        return i !== -1
      })
    },
    next() {
      this.pagination.position += 5
      let offset = this.tasks.length - this.pagination.position
      this.st = offset
      this.empty = []
      if (offset >= 5) for (let i = 0; i < 5; i++) this.elements[i] += 5
      else {
        //this.elements=[];
        for (let i = 0; i < offset; i++)
          this.elements[offset - i - 1] = this.tasks.length - i - 1
        for (let j = 0; j < 5 - offset; j++) {
          this.empty.push(j)
          this.elements[j + offset] = -1
        }
      }
    },
    prev() {
      this.st = this.pagination.position
      let offset = this.tasks.length - this.pagination.position
      if (offset < 5) {
        //this.elements=[0,0,0,0,0];
        this.empty = []
        for (let i = 0; i < 5; i++) {
          this.elements[4 - i] = -(offset - this.tasks.length) - i - 1
        }
      } else if (
        this.pagination.position < this.pagination.length &&
        this.pagination.position > 0
      )
        for (let i = 0; i < 5; i++) {
          this.elements[i] -= 5
        }
      this.pagination.position -= 5
    },
    
    displaypages() {
      return Math.floor(this.pagination.length / 5)
    },
    displaydigit(t) {
      let dt1 = Math.floor(t / 10)
      let dt2 = t % 10
      return dt1 + '' + dt2
    },
    clear() {
      console.log('clear')
      this.tasks = []
      this.elements = [-1, -1, -1, -1, -1]
      this.empty = [0, 1, 2, 3, 4]
      this.pagination.length = 0
      this.pagination.position = 0
    },
  },
}
</script>
<template>
  <div id="home">
    <div class="logo">
      <span>My</span>task.com
    </div>
    <h1>Наш сервис контроля вашего времени</h1>
    <p>
      Вы можете добавить любую задачу на сегодняшний день и дождаться сигнала.
    </p>
    <p id="timer">
      {{ displaydigit(time.hour) }}
      <span>:</span>{{ displaydigit(time.minute) }} <span>:</span>{{ displaydigit(time.second) }}
    </p>
    <app-add
      @add="addClick"
      @clear="clear"
    />
    <app-list
      :pagination="pagination"
      :tasks="tasks"
      :time="time"
    />
    <button
      v-if="
        pagination.position < pagination.length && pagination.position > 0
      "
      role="button"
      @click="prev()"
    >
      Prev
    </button>
    <button
      v-if="pagination.position < pagination.length - 5"
      role="button"
      @click="next()"
    >
      Next
    </button>
    <div class="footer">
      &copy; 13.04.2020
      <a href="https://github.com/IvanShavliuga">Ivan Shavliuga (Ivanov)</a>,
      Belarus, Novopolotsk. License
      <a
        href="https://github.com/IvanShavliuga/vuejstimer/blob/master/LICENSE"
      >MIT</a>
    </div>
  </div>
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
#timer {
  color: rgb(255, 80, 190);
  transform: scaleY(1.8);
  font-size: 2.5em;
  font-family: $timer-font;
  margin: 20px 20px;
  span {
    margin-left: 5px;
    margin-right: 5px;
  }
}

.footer a {
  color: $link-color;
  font-weight: bold;
  text-decoration: underline;
}

@media screen and (min-width: 300px) and (max-width: 489px) {
  div#home {
    width: 100%;
    h1,
    p {
      font-size: 0.9em !important;
    }
    #timer {
      font-size: 1.7em !important;
    }
    div.add {
      margin: 15px auto;
      padding: 0;
      width: 90%;
      .add__time {
        width: 15px !important;
      }
      input {
        font-size: 0.8em !important;
        width: calc(90% / 3) !important;
      }
    }
    button {
      font-size: 0.7em !important;
      margin-left: 15px;
    }
  }
  .tasks__list {
    width: 90% !important;

    .task {
      font-size: 0.7em;
    }
  }
}

@media screen and (max-width: 299px) {
  div#home {
    width: 100%;
    h1,
    p {
      font-size: 0.9em !important;
    }
    #timer {
      font-size: 1.7em !important;
    }
    div.add {
      margin: 15px 0;
      padding: 0;
      width: 100%;
      .add__time {
        width: 15px !important;
      }
      input {
        font-size: 0.8em !important;
        width: calc(90% / 3) !important;
      }
    }
    button {
      font-size: 0.7em !important;
    }
  }
  .tasks__list {
    width: 100% !important;
    .task {
      font-size: 0.7em;
    }
  }
}
@media screen and (max-width: 800px) and (min-width: 485px) {
  div#home {
    width: 100%;

    h1,
    p {
      font-size: 0.9em !important;
    }
    #timer {
      font-size: 1.7em !important;
    }
    div.add {
      margin: 15px auto;
      padding: 0;
      width: 80%;
      .add__time {
        width: 15px !important;
      }
      input {
        font-size: 0.9em !important;
        width: calc(90% / 3) !important;
      }
    }
  }
  .tasks__list {
    width: 90% !important;
    .task {
      font-size: 1.1em;
    }
  }
}
</style>

