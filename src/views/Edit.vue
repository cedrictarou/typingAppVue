<template>
  <b-container>
    <h2>this is an edit page</h2>
    <p>You can edit your words here.</p>
    <div class="text-right mb-3">
      <b-button variant="outline-info" class="h2 mb-0" v-b-modal.modal-add-form>
        <b-icon-plus-circle></b-icon-plus-circle>
      </b-button>
    </div>
    <b-modal id="modal-add-form" title="Add new word">
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
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Sentence</th>
          <th>編集・削除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(word, index) in words" :key="word.name">
          <td>{{ index + 1 }}</td>
          <td>{{ word.fields.sentence.stringValue }}</td>
          <td>
            <b-button
              variant="outline-info"
              @click="$bvModal.show(`bv-modal-${index}`)"
              >編集</b-button
            >
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
            <b-button
              class="ml-2"
              variant="outline-danger"
              @click="deleteItem(index)"
              >削除</b-button
            >
          </td>
        </tr>
      </tbody>
    </table>
  </b-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Edit",
  data() {
    return {
      newSentence: ""
    };
  },
  created() {
    this.$store.dispatch("getAllData", this.idToken);
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
    addWord() {
      const newItem = {
        fields: {
          sentence: { stringValue: this.newSentence }
        }
      };
      axios
        .post("/words", newItem, {
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
    },
    editItem(index) {
      //docIdを指定するのに必要な処理
      const name = this.words[index].name;
      const targetUrl = name.replace(
        "projects/typing-app-f08b8/databases/(default)/documents/words/",
        ""
      );
      const editedItem = {
        fields: {
          sentence: {
            stringValue: this.words[index].fields.sentence.stringValue
          }
        }
      };
      axios
        .patch(`words/${targetUrl}`, editedItem, {
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
    },
    deleteItem(index) {
      //docIdを指定するのに必要な処理
      const name = this.words[index].name;
      const targetUrl = name.replace(
        "projects/typing-app-f08b8/databases/(default)/documents/words/",
        ""
      );

      axios
        .delete(`words/${targetUrl}`, {
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
