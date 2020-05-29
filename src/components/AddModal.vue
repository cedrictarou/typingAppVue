<template>
  <div>
    <b-modal id="modal-add-form" title="Add new word or sentence">
      <b-input v-model="newSentence"></b-input>
      <template v-slot:modal-footer="{ cancel, hide }">
        <b-button
          size="sm"
          variant="outline-info"
          @click="
            {
              addWord(), hide();
            }
          "
        >
          追加
        </b-button>
        <b-button size="sm" variant="outline-danger" @click="cancel()">
          キャンセル
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["idToken", "words"])
  },
  data() {
    return {
      newSentence: ""
    };
  },
  methods: {
    addWord() {
      const newItem = {
        fields: {
          sentence: { stringValue: this.newSentence }
        }
      };
      const targetUrl =
        "projects/typing-app-f08b8/databases/(default)/documents/words/";
      axios
        .post(targetUrl, newItem, {
          headers: {
            Authorization: `Bearer ${this.idToken}`
          }
        })
        .then(res => {
          console.log(res);
          this.$store.dispatch("getAllData", this.idToken);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style></style>
