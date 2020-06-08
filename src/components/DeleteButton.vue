<template>
  <b-button class="ml-2" variant="outline-danger" @click="deleteItem(index)"
    >削除</b-button
  >
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  props: {
    index: Number
  },
  computed: {
    ...mapGetters(["idToken", "words"])
  },
  methods: {
    deleteItem(index) {
      //docIdを指定するのに必要な処理
      const targetUrl = this.words[index].document.name;
      console.log(targetUrl);
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
