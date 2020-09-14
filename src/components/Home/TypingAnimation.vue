<template>
  <div>
    <div>
      <div class="lead typer-height">
        <vue-typer
          :text="[
            'Type your favorite words.',
            'And try \n how fast you can type.',
            'Without knowing, \n you will remember.',
          ]"
          :repeat="Infinity"
          :shuffle="false"
          initial-action="typing"
          :pre-type-delay="70"
          :type-delay="70"
          :pre-erase-delay="2000"
          :erase-delay="250"
          erase-style="select-all"
          :erase-on-complete="false"
          caret-animation="expand"
        ></vue-typer>
      </div>
      <b-button variant="info" @click="startGame()" class="startEffect mt-1">Press Space or Click to Start!</b-button>
    </div>
  </div>
</template>
<script>

export default {
  methods: {
    startGame() {
      this.$emit("startButtonClicked");
    }
  }
};
</script>