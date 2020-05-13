<template>
  <b-container>
    <h2>Sing up</h2>
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

    <b-button type="submit" variant="primary" @click="register()"
      >登録</b-button
    >
    <b-button type="reset" variant="danger" class="ml-2" @click="reset()"
      >リセット</b-button
    >
  </b-container>
</template>

<script>
import axios from "../axios-auth.js";
export default {
  name: "SignUp",
  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    register() {
      axios
        .post("/accounts:signUp?key=AIzaSyCCthIGG3XeQ-uoM6W0w9Ee1i4cjy6iWUM", {
          email: this.form.email,
          password: this.form.password,
          returnSecureToken: true
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
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
