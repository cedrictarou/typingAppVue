<template>
  <b-container>
    <h2>タイピングアプリの遊び方</h2>
    <div role="tablist">
      <!-- howToPlayComponent -->
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-1 variant="info">ゲームの遊び方</b-button>
        </b-card-header>
        <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
          <b-list-group class="text-left">
            <b-list-group-item>1. Homeページに移動する。</b-list-group-item>
            <b-list-group-item>2. スペースボタンを押すか、クリックしてスタートする。</b-list-group-item>
            <b-list-group-item>3. 時間内に出題される単語をタイプする。</b-list-group-item>
            <b-list-group-item>4. クリアするとボーナスタイム（2秒）が追加される</b-list-group-item>
            <b-list-group-item>5. 時間が0になると正解数やミスタイプ率が表示される。</b-list-group-item>
            <b-list-group-item>6. Editページでは好きな単語を登録したり、編集、削除することができる。</b-list-group-item>
          </b-list-group>
        </b-collapse>
      </b-card>

      <!-- aimOfAppComponent -->
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-2 variant="info">このアプリの目的</b-button>
        </b-card-header>
        <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
          <b-card-text class="text-left m-3">
            英語（外国語）を勉強するためのサポートとしてタイピングが良いと思った。
            すでにiKnowというアプリがあるが自由度が低いので自分で作れるものにした。
            将来の学校教育ではこういったものが求められそう。高機能なものはいらない。
            さっとできるものが良い。
            ブラウザで完結できる方が導入しやすい。
          </b-card-text>
        </b-collapse>
      </b-card>

      <!-- pointsOfAppComponent -->
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-3 variant="info">作る際に工夫したポイント</b-button>
        </b-card-header>
        <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
          <b-list-group class="text-left">
            <b-list-group-item>アカウントによって出題される問題が違うところ</b-list-group-item>
            <b-list-group-item>自分で単語の登録や編集、削除ができるところ</b-list-group-item>
            <b-list-group-item>デザインをシンプルにし、直感的に操作方法がわかるようにしたこと</b-list-group-item>
          </b-list-group>
        </b-collapse>
      </b-card>

      <!-- skillsOfAppComponent -->
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-4 variant="info">使っている技術</b-button>
        </b-card-header>
        <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
          <b-list-group class="text-left">
            <b-list-group-item>"animate.css": "^4.1.0",</b-list-group-item>
            <b-list-group-item>"bootstrap": "^4.5.0",</b-list-group-item>
            <b-list-group-item>"bootstrap-vue": "^2.14.0",</b-list-group-item>
            <b-list-group-item>"vue": "^2.6.11",</b-list-group-item>
            <b-list-group-item>"vue-router": "^3.1.6",</b-list-group-item>
            <b-list-group-item>"vuex": "^3.1.3"</b-list-group-item>
            <b-list-group-item>"axios": "^0.19.2",</b-list-group-item>
          </b-list-group>
        </b-collapse>
      </b-card>
    </div>
  </b-container>
</template>

<script>
export default {
  name: "About"
};
</script>
