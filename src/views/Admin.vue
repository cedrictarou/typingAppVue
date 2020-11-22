<template>
  <b-container>
    <h2>Admin page</h2>
    <div>
      <b-tabs content-class="mt-3">
        <b-tab title="各種設定" active>
          <div class="tab-pane fade show active">
            <!-- 各種セッティング画面 -->
            <Setting />
          </div>
        </b-tab>
        <b-tab title="ユーザー管理">
          <div class="tab-pane">
            <!-- ユーザー管理画面 -->
            <SettingUsers />
          </div>
        </b-tab>
      </b-tabs>
    </div>

    <div class="tab-content" id="myTabContent"></div>
  </b-container>
</template>

<script>
import Setting from "@/components/Admin/Setting.vue";
import SettingUsers from "@/components/Admin/SettingUsers.vue";
export default {
  name: "Admin",
  components: {
    Setting,
    SettingUsers,
  },
};
</script>

<style></style>
