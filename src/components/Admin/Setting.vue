<template>
  <form class="mt-4">
    <div class="form-group">
      <label for="formControlRange">タイマー設定:</label>
      <span> {{ timeLimit / 1000 }}秒</span>
      <input
        type="range"
        v-model="timeLimit"
        min="0"
        max="10000"
        step="1000"
        class="form-control-range"
        id="formControlRange"
      />
    </div>
    <div class="form-group">
      <label for="formControlRange">ボーナスタイム設定:</label>
      <span> {{ bonusTime / 1000 }}秒</span>
      <input
        type="range"
        v-model="bonusTime"
        min="0"
        max="10000"
        step="1000"
        class="form-control-range"
        id="formControlRange"
      />
    </div>
  </form>
</template>

<script>
export default {
  name: "Setting",
  computed: {
    timeLimit: {
      get() {
        return this.$store.getters.timeLimit;
      },
      set(value) {
        this.$store.dispatch("updateTimeLimit", value);
      },
    },
    bonusTime: {
      get() {
        return this.$store.getters.bonusTime;
      },
      set(value) {
        this.$store.dispatch("updateBonusTime", value);
      },
    },
  },
};
</script>

<style></style>
