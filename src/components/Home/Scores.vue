<template>
  <div>
    score:
    <span>{{ scores.score }}</span> miss: <span>{{ scores.miss }}</span> time left:
    <span>{{ timer }}</span>
  </div>
</template>

<script>
export default {
  props: {
    timer: String,
    scores: {
      type: Object
    }
  }
};
</script>
