<template>
  <v-row justify="center">
    <div>
      <h2 class="text-center font-weight-bold">
        Welcome to my typing App
      </h2>
      <GameDisplay />
    </div>
  </v-row>
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
