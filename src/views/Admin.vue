<template>
  <b-container>
    <h2>Admin page</h2>
    <div>
      <b-tabs content-class="mt-3">
        <b-tab title="各種設定" active>
          <div class="tab-pane fade show active">
            <form class="mt-4">
              <div class="form-group">
                <label for="formControlRange">タイマー設定:</label>
                <span> {{ timeLimit / 1000 }}秒</span>
                <input
                  type="range"
                  v-model="timeLimit"
                  min="0"
                  max="10000"
                  step="1000"
                  class="form-control-range"
                  id="formControlRange"
                />
              </div>
              <div class="form-group">
                <label for="formControlRange">ボーナスタイム設定:</label>
                <span> {{ bonusTime / 1000 }}秒</span>
                <input
                  type="range"
                  v-model="bonusTime"
                  min="0"
                  max="10000"
                  step="1000"
                  class="form-control-range"
                  id="formControlRange"
                />
              </div>
            </form>
          </div>
        </b-tab>
        <b-tab title="ユーザー管理">
          <div class="d-flex justify-content-end">
            <form class="form-inline my-2 my-lg-0">
              <input
                class="form-control mr-sm-2"
                type="search"
                placeholder="ユーザー検索"
                aria-label="Search"
              />
              <button
                class="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
          <div class="mt-3">
            <form class="form-inline">
              <input
                type="email"
                class="form-control col-9"
                id="addNewUserEmail"
                placeholder="新しいユーザーemailを追加できます。"
                v-model="userEmail"
              />
              <b-button
                @click="addNewUser()"
                class="ml-2"
                variant="outline-info"
                >新規登録</b-button
              >
            </form>
          </div>
          <div class="mt-3">
            <table class="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>メールアドレス</th>
                  <th>編集・削除</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(user, index) in users" :key="user.name">
                  <td>{{ index + 1 }}</td>
                  <td>{{ user.email }}</td>
                  <td>
                    <b-button variant="outline-info" @click="doChange(index)"
                      >編集</b-button
                    >
                    <b-button
                      class="ml-2"
                      variant="outline-danger"
                      @click="doRemove(index)"
                      >削除</b-button
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-tab>
      </b-tabs>
    </div>

    <div class="tab-content" id="myTabContent"></div>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Admin",
  components: {},
  created() {
    // ユーザー全員のデータを取ってくるようにする。
    // this.$store.dispatch("getUserItems", this.idToken);
  },
  data() {
    return {
      userEmail: "",
      users: [
        { id: 1, email: "user1@email.com" },
        { id: 2, email: "user2@email.com" },
        { id: 3, email: "user3@email.com" },
        { id: 4, email: "user4@email.com" },
      ],
    };
  },
  computed: {
    ...mapGetters(["idToken"]),
    timeLimit: {
      get() {
        return this.$store.getters.timeLimit;
      },
      set(value) {
        this.$store.dispatch("updateTimeLimit", value);
      },
    },
    bonusTime: {
      get() {
        return this.$store.getters.bonusTime;
      },
      set(value) {
        this.$store.dispatch("updateBonusTime", value);
      },
    },
  },
  methods: {
    validation(email) {
      const reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
      if (reg.test(email)) {
        // validationに問題なかったら
        return true;
      } else {
        //validationに引っかかったら
        alert("emailアドレスを正しく入力してください");
        return false;
      }
    },
    pushEmail(email) {
      const newEmail = email;
      this.users.push({
        id: this.users.id++,
        email: newEmail,
      });
    },
    addNewUser() {
      const newUser = this.userEmail;
      if (this.validation(newUser)) {
        this.pushEmail(newUser);
        this.userEmail = "";
      }
    },
    doRemove(item) {
      // 削除する前に確認ダイアログを出す
      const result = confirm("Are you sure?");
      if (result) {
        this.users.splice(item, 1);
      }
    },
    doChange(item) {
      const oldEmail = this.users[item].email;
      const message = "新しいemailを入力してください";
      const editedEmail = prompt(message, `${oldEmail}`);
      if (!editedEmail) {
        return;
      } else {
        // バリデーションをかける
        if (this.validation(editedEmail)) {
          this.users[item].email = editedEmail;
        }
      }
    },
  },
};
</script>

<style></style>
