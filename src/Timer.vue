<script>
export default {
    props: {
        time: {
            type: Object,
            required: true
        }
    },
    methods: {
        displaydigit(t) {
        let dt1 = Math.floor(t / 10)
        let dt2 = t % 10
        return dt1 + '' + dt2
        },
    }
}
</script>
<template>
  <p id="timer">
    {{ displaydigit(time.hour) }}
    <span>:</span>{{ displaydigit(time.minute) }} <span>:</span>{{ displaydigit(time.second) }}
  </p>
</template>
<style lang="scss">
@import './themegray.scss';
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
</style>