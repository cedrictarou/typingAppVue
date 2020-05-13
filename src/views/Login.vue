<template>
  <b-container>
    <h2>Login</h2>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-name"
        label="Your Name:"
        label-for="input-name"
      >
        <b-form-input
          id="input-name"
          v-model="form.name"
          required
          placeholder="Enter your name"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-passowrd"
        label="Password:"
        label-for="input-password"
      >
        <b-form-input
          id="input-password"
          v-model="form.password"
          type="password"
          required
          placeholder="Enter your password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Login</b-button>
      <b-button type="reset" variant="danger" class="ml-2">リセット</b-button>
    </b-form>
  </b-container>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        name: "",
        password: ""
      },
      show: true
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.name = "";
      this.form.password = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>

<style></style>
