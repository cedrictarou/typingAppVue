<template>
  <div>
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
            <edit-button :index="index"></edit-button>
            <delete-button :index="index"></delete-button>
            <edit-modal
              :index="index"
              :word="word"
              :idToken="idToken"
            ></edit-modal>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import EditModal from "../components/EditModal.vue";
import DeleteButton from "../components/DeleteButton.vue";
import EditButton from "../components/EditButton.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    EditModal,
    DeleteButton,
    EditButton
  },
  computed: {
    ...mapGetters(["idToken", "words"])
  }
};
</script>

<style></style>
