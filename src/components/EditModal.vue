<template>
  <div>
    <b-modal :id="`bv-modal-${index}`" title="編集">
      <b-input v-model="word.fields.sentence.stringValue"></b-input>
      <template v-slot:modal-footer="{ cancel, hide }">
        <b-button
          size="sm"
          variant="outline-info"
          @click="
            {
              editItem(index), hide();
            }
          "
        >
          確定
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
export default {
  props: {
    index: Number,
    word: Object
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
    editItem(index) {
      //docIdを指定するのに必要な処理
      const targetUrl = this.words[index].name;
      const editedItem = {
        fields: {
          sentence: {
            stringValue: this.words[index].fields.sentence.stringValue
          }
        }
      };
      axios
        .patch(targetUrl, editedItem, {
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
      console.log("changed", index);
    }
  }
};
</script>

<style></style>
