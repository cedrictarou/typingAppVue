<template>
  <b-container>
    <img alt="Vue logo" src="../assets/logo.png" />
    <GameDisplay msg="Welcome to my typing App" :words="words" />
  </b-container>
</template>

<script>
import GameDisplay from "../components/GameDisplay";

export default {
  name: "Home",
  components: {
    GameDisplay
  },
  data() {
    return {};
  },
  created() {
    //wordsにgetしたデータをわたしたい
    this.$store.dispatch("getAllData", this.idToken);
  },
  computed: {
    idToken() {
      return this.$store.getters.idToken;
    },
    words() {
      return this.$store.getters.words;
    }
  }
};
</script>
