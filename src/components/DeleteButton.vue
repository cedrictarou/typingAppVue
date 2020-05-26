<template>
  <b-button class="ml-2" variant="outline-danger" @click="deleteItem(index)"
    >削除</b-button
  >
</template>

<script>
import axios from "axios";
export default {
  props: {
    index: Number
  },
  computed: {
    idToken() {
      return this.$store.getters.idToken;
    },
    words() {
      return this.$store.getters.words;
    }
  },
  methods: {
    deleteItem(index) {
      //docIdを指定するのに必要な処理
      const targetUrl = this.words[index].name;
      axios
        .delete(targetUrl, {
          headers: {
            Authorization: `Bearer ${this.idToken}`
          }
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
      //画面上ですぐに消してあげる処理
      this.words.splice(index, 1);
    }
  }
};
</script>

<style></style>
