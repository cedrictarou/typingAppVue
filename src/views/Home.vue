<template>
  <b-container>
    <div :class="{ turnEffect: isTurn }">
      <img alt="Vue logo" src="../assets/logo.png" />
    </div>
    
    <GameDisplay @turnVue="toggleIsTurn" :words="words" />
    <b-modal></b-modal>
  </b-container>
</template>

<script>
import GameDisplay from "@/components/Home/GameDisplay";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    GameDisplay,
  },
  data() {
    return {
      //vueアイコンの動きを制御する
      isTurn: false,
    };
  },
  created() {
    this.$store.dispatch("getUserItems", this.idToken);
  },
  computed: {
    ...mapGetters(["idToken", "words", "currentUser"]),
  },
  methods: {
    //isTurnをtrueにするファンクションを書く
    async toggleIsTurn() {
      if (this.isTurn) {
        //すでにtrueなら一度falseにする
        this.isTurn = false;
      }
      //成功するとVueアイコンが２秒かけてターンする。
      this.isTurn = true;
      //2秒待つ
      await this.wait(2);
      //2秒後にfalseに切り替える必要がある。
      this.isTurn = false;
    },
    wait(sec) {
      return new Promise((resolve) => {
        setTimeout(resolve, sec * 1000);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.turnEffect {
  animation: flip;
  animation-duration: 2s;
}
</style>
