<template>
  <b-container>
    <img alt="Vue logo" src="../assets/logo.png" />
    <GameDisplay msg="Welcome to my typing App" :words="words" />
  </b-container>
</template>

<script>
import GameDisplay from "../components/GameDisplay";
import axios from "axios";

export default {
  name: "Home",
  components: {
    GameDisplay
  },
  data() {
    return {
      words: []
    };
  },
  created() {
    axios
      .get("/words", {
        headers: {
          Authorization: `Bearer ${this.idToken}`
        }
      })
      .then(res => {
        this.words = res.data.documents;
      })
      .catch(err => {
        console.log(err);
      });
  },
  computed: {
    idToken() {
      return this.$store.getters.idToken;
    }
  }
};
</script>
