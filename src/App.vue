<template>
  <div id="app">
    <NavBar />
    <header>
    </header>
    <div class="mt-3">
      <transition mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>
<script>
import NavBar from "./components/Navigation/NavBar";
export default {
  components: {
    NavBar
  }
};
</script>
script
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 4rem;
}
//ページ遷移のアニメーション
.v-enter {
  transform: translate(-100px, 0);
  opacity: 0;
}
.v-enter-to {
  opacity: 1;
}
.v-enter-active {
  transition: all 1s 0s ease;
}
.v-leave {
  transform: translate(0, 0);
  opacity: 1;
}
.v-leave-to {
  transform: translate(100px, 0);
  opacity: 0;
}
.v-leave-active {
  transition: all .5s 0s ease;
}
</style>
