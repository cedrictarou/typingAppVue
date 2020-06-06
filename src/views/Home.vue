<template>
  <b-container>
    <img alt="Vue logo" src="../assets/logo.png" />
    <GameDisplay msg="Welcome to my typing App" :words="words" />
  </b-container>
</template>

<script>
import GameDisplay from "../components/GameDisplay";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    GameDisplay
  },
  data() {
    return {};
  },
  created() {
    // this.$store.dispatch("getAllData", this.idToken);
    this.$store.dispatch("getUserItems", this.idToken);
  },
  computed: {
    ...mapGetters(["idToken", "words", "currentUser"])
  }
};
</script>
