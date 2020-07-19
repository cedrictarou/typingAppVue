<template>
  <b-container>
    <div :class="{ successEffect: isSuccessed }">
      <img alt="Vue logo" src="../assets/logo.png" />
    </div>
    <GameDisplay @turnImg="changeStatus" msg="Welcome to my typing App" :words="words" />
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
    return {
      isSuccessed: false,
    };
  },
  created() {
    this.$store.dispatch("getUserItems", this.idToken);
  },
  computed: {
    ...mapGetters(["idToken", "words", "currentUser"])
  },
  methods: {
    //isSuccessedをtrueにするファンクションを書く
    async changeStatus() {
      if(this.isSuccessed === true) {
        //すでにtrueなら一度falseにする
        this.isSuccessed = false;
      }
        this.isSuccessed = true;
    },
  }
};
</script>
<style lang="scss" scoped>
.successEffect {
  animation: flip;
  animation-duration: 2s;
}
</style>