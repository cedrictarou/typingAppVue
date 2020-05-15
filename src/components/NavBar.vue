<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">TypingApp</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <template v-if="!isAutentificated">
            <b-nav-item to="/about">About</b-nav-item>
            <b-nav-item to="/signup">Sign up</b-nav-item>
            <b-nav-item to="/login">Login</b-nav-item>
          </template>
          <template v-if="isAutentificated">
            <b-nav-item to="/">Home</b-nav-item>
            <b-nav-item to="/about">About</b-nav-item>
            <span class="logout" @click="logout()">Logout</span>
          </template>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  computed: {
    isAutentificated() {
      return this.$store.getters.idToken !== null;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style lang="scss" scoped>
.logout {
  cursor: pointer;
}
</style>
