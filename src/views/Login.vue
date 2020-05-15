<template>
  <b-container>
    <h2>Login</h2>
    <b-form-group label="Your email:" label-for="input-email">
      <b-form-input
        id="input-email"
        v-model="form.email"
        required
        placeholder="Enter your email"
      ></b-form-input>
    </b-form-group>

    <b-form-group label="Password:" label-for="input-password">
      <b-form-input
        id="input-password"
        v-model="form.password"
        type="password"
        required
        placeholder="Enter your password"
      ></b-form-input>
    </b-form-group>

    <b-button type="submit" variant="primary" @click="login()"
      >ログイン</b-button
    >
    <b-button type="reset" variant="danger" class="ml-2" @click="reset()"
      >リセット</b-button
    >
  </b-container>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      console.log(this.form.email);
      this.$store.dispatch("login", {
        email: this.form.email,
        password: this.form.password
      });
      this.reset();
    },
    reset() {
      this.form.email = "";
      this.form.password = "";
    }
  }
};
</script>

<style></style>
