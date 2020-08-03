<template>
  <b-container>
    <h2>This is an edit page</h2>
    <p>You can edit your words and sentences here.</p>
    <hr />
    <h2>User Profile</h2>
    <p>user_id: {{ currentUser.id }}</p>
    <p>user_email: {{ currentUser.email }}</p>
    <add-button></add-button>
    <add-modal></add-modal>
    <items-table></items-table>
  </b-container>
</template>

<script>
import AddButton from "../components/AddButton.vue";
import AddModal from "../components/AddModal.vue";
import ItemsTable from "../components/ItemsTable.vue";
import { mapGetters } from "vuex";

export default {
  name: "Edit",
  components: {
    AddButton,
    AddModal,
    ItemsTable
  },
  created() {
    // ログインした時にuserIdのデータを取得する
    this.$store.dispatch("getUserItems", this.idToken);
  },
  computed: {
    ...mapGetters(["idToken", "words", "currentUser"])
  }
};
</script>

<style></style>
