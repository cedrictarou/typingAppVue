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
          <!-- <td>{{ word.name }}</td> -->
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
                      edit(index), hide();
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
      newSentence: "",
      items: []
    };
  },
  created() {
    this.$store.dispatch("getAllData", this.idToken);
    setTimeout(() => {
      console.log(this.words);
    }, 100);
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
      axios
        .post(
          "/words",
          {
            fields: {
              sentence: { stringValue: this.newSentence }
            }
          },
          {
            headers: {
              Authorization: `Bearer ${this.idToken}`
            }
          }
        )
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
      //画面上では追加されたように表示するための処理
    },
    deleteItem(index) {
      const targetUrl = "1Arp71Xz7iUCgrgjnkGz";
      const targetSentence = this.words[index].fields.sentence.stringValue;
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
      console.log(targetSentence);
      this.words.splice(index, 1);
    }
  }
};
</script>

<style></style>
