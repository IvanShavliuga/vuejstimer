<script>
export default {
    props: {
        pagination: {
            type: Object,
            requred: true
        }
    },
    emits: ['next', 'prev'],
}
</script>
<template>
  <div class="pages">
    <div
      v-if="pagination.length"
      class="pages__block"
    >
      <p class="pages__counters">
        Page
        <span title="position">{{ pagination.position + 1 }}</span>
        of Pages
        <span title="length">{{ pagination.length }}</span>
      </p>
    </div>
    <div class="pages__block">
      <button
        v-if="
          pagination.position < pagination.length && pagination.position > 0
        "
        role="button"
        @click="$emit('prev')"
      >
        Prev
      </button>
      <button
        v-if="pagination.position < pagination.length - 1"
        role="button"
        @click="$emit('next')"
      >
        Next
      </button>
    </div>
  </div>
</template>
<style lang="scss">
.pages {
    margin: 15px auto;
    &__block {
        width: 100%;
        margin: 15px 0;
    }
    &__counters {
        span {
            color: #de33de;
        }
    }
}
</style>