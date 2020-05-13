<template>
  <b-container>
    <img alt="Vue logo" src="../assets/logo.png" />
    <GameDisplay msg="Welcome to my typing App" />
  </b-container>
</template>

<script>
// @ is an alias to /src
import GameDisplay from "@/components/GameDisplay.vue";

export default {
  name: "Home",
  components: {
    GameDisplay
  }
};
</script>
