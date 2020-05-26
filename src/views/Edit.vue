<template>
  <b-container>
    <h2>this is an edit page</h2>
    <p>You can edit your words and sentences here.</p>
    <add-button></add-button>
    <add-modal></add-modal>
    <items-table></items-table>
  </b-container>
</template>

<script>
import AddButton from "../components/AddButton.vue";
import AddModal from "../components/AddModal.vue";
import ItemsTable from "../components/ItemsTable.vue";

export default {
  name: "Edit",
  components: {
    AddButton,
    AddModal,
    ItemsTable
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
  }
};
</script>

<style></style>
