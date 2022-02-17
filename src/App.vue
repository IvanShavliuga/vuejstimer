<script>
import Timer from './Timer.vue'
import Add from './Add.vue'
import List from './List.vue'
import Pages from './Pages.vue'
export default {
  components: {
    appList: List,
    appTimer: Timer,
    appAdd: Add,
    appPages: Pages
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
      pagination: {
        length: 0,
        position: 0,
      },
    }
  },
  computed: {
    tasksFilter() {
      const flt = [...this.tasks]
      return flt.splice(this.pagination.position * 5, 5)
    }
  },
  created() {
    setInterval(() => {
      this.now()
    }, 1000)
    this.now()
    this.tasks = []
    for (let i = 0; i < 15; i++) {
      const { hour, minute, second } = this.time
      this.tasks.push({
        hour: ((minute + i * 10) < 49 ? hour : hour + 1),
        minute: ((minute + i * 10) < 49 ? minute + i * 10 : (i % 6) * 10),
        second,
        title: `I am new timer ${i}`,
        message: 'Hello world',
        id: i
      })
    }
    this.pagination.length = ~~(this.tasks.length / 5)
    this.pagination.position = 0
  },
  methods: {
    addClick(t) {
      if (!this.tasks) {
        this.tasks = []
      }
      t.id = this.tasks.length
      this.tasks.push(t)
      this.pagination.length = ~~(this.tasks.length / 5)
    },
    now() {
      let d = new Date()
      this.time.hour = d.getHours()
      this.time.minute = d.getMinutes()
      this.time.second = d.getSeconds()
      const $title = document.querySelector('title')
      $title.innerText = `IvTimer -- ${this.time.hour}:${this.time.minute}:${this.time.second}`
    },
    
    elfilter() {
      return this.elements.filter((i) => {
        return i !== -1
      })
    },
    nextClick() {
      if (this.pagination.position < this.pagination.length) {
        this.pagination.position++
      }
    },
    prevClick() {
      if (this.pagination.position > 0) {
        this.pagination.position--
      }
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
    <section class="content">
      <div class="logo">
        <span>My</span>task.com
      </div>
      <h1>Наш сервис контроля вашего времени</h1>
      <p>
        Вы можете добавить любую задачу на сегодняшний день и дождаться сигнала.
      </p>
      <app-timer :time="time" />
      <app-add
        @add="addClick"
        @clear="clear"
      />
      <app-list
        :pagination="pagination"
        :tasks="tasksFilter"
        :time="time"
      />
      <app-pages
        :pagination="pagination"
        @next="nextClick"
        @prev="prevClick"
      />
    </section>
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

#home {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: $background-container;
  height: 100vh;
  padding: 15px 0;
}
.content {
  flex-grow: 1;
}
.footer {
  height: 35px;
  a {
    color: $link-color;
    font-weight: bold;
    text-decoration: underline;
  }
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

/*===================================================================================*/
/*=============== Откомментируй любой из способов приклейки футера ==================*/
/*===================================================================================*/
/*============ Способ 1 - абсолютное позиционирование =============*/
/*body {
    position: relative;
    padding-bottom: 58px;
    box-sizing: border-box;
}
.footer {
    position: absolute;
    bottom: 0;
    height: 58px;
}*/
/*============ Способ 2 - при помощи псевдоэлемента :after =============*/
/*.content {
    min-height: calc(100% - 58px);
    margin-bottom: -58px;
}
.content:after {
    content: '';
    display: block;
}
.content:after, .footer {
    height: 58px;
}/*
/*============ Способ 3 - Flexbox =============*/
/* body {
    display: flex;
    flex-direction: column;
}
.content {
    flex-grow: 1;
} */

</style>

