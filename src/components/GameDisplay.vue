<template>
  <div>
    <!-- スタート前に表示される部分 -->
    <template v-if="!isActive">
      <h1>{{ msg }}</h1>
      <div>Press Space to Start!</div>
    </template>
    <!-- スタートしたら表示される部分 -->
    <template v-else>
      <h1>{{ quiz }}</h1>
      <div>
        score: <span>{{ score }}</span> miss: <span>{{ miss }}</span> time left:
        <span>{{ timer }}</span>
      </div>
    </template>
  </div>
</template>

<script>
import { timeLimit, timer } from "../plugins/definitions";
export default {
  name: "GameDisplay",
  props: {
    msg: String
  },
  data() {
    return {
      isActive: false,
      words: ["apple", "orange", "grapes"],
      quiz: "quiz",
      score: 0,
      miss: 0,
      loc: 0,
      timer,
      timeLimit,
      startTime: ""
    };
  },
  mounted() {
    window.addEventListener("keydown", e => {
      if (e.keyCode === 32) {
        //isActiveがtrueのとき処理はしない
        if (this.isActive) {
          return;
        }
        //checkAnwerの初期化したいけどうまく動かない
        // window.removeEventListener("keydown", e => {
        //   this.checkAnswer(e);
        // });
        //isActiveがfalseときはゲームをスタートする
        this.startGame();
      }
    });
  },
  methods: {
    init() {
      this.loc = 0;
      this.score = 0;
      this.miss = 0;
    },
    startGame() {
      this.init();
      this.isActive = true;
      //クリックしたときの時間を保持する
      this.startTime = Date.now();
      this.updateTimer();
      this.makeQuiz();
      this.typeWord();
    },
    updateTimer() {
      const timeLeft = this.startTime + this.timeLimit - Date.now();
      this.timer = (timeLeft / 1000).toFixed(2);
      const timeoutId = setTimeout(() => {
        this.updateTimer();
      }, 10);

      //ゲームオーバーの設定
      if (timeLeft < 0) {
        clearTimeout(timeoutId);
        this.timer = "0.00";
        // timeLeftの値を0.00がになってからshowResultになってほしいので単純にタイミングをずらしました。
        setTimeout(() => {
          this.showResult();
          this.retry();
        }, 100);
      }
    },
    showResult() {
      const accuracy =
        this.score + this.miss === 0
          ? 0
          : (this.score / (this.score + this.miss)) * 100;
      const result = `Score: ${this.score}, Miss: ${
        this.miss
      }, Accuary :${accuracy.toFixed(2)}%`;
      alert(result);
    },
    retry() {
      const msg = "Try again?";
      const reply = confirm(msg);
      if (reply) {
        this.init();
        this.isActive = false;
        //強制的にリロードさせる
        location.reload();
      }
    },
    makeQuiz() {
      // ランダムに単語が選ばれるようにする;
      const rnd = Math.floor(Math.random() * this.words.length);
      this.quiz = this.words[rnd];
      return this.quiz;
    },
    updateTarget() {
      //正解した文字を＿に変えていく処理
      let placeholder = "";
      for (let i = 0; i < this.loc; i++) {
        placeholder += "_";
      }
      this.quiz = placeholder + this.quiz.substring(this.loc);
    },
    typeWord() {
      //ゲームが始まっていなかったら処理しない
      if (!this.isActive) {
        return;
      }
      //ゲームが始まっていたら、ボタンを認識する
      window.addEventListener("keydown", e => {
        this.checkAnswer(e);
      });
    },
    checkAnswer(e) {
      // タイピング判定の処理
      if (e.key === this.quiz[this.loc]) {
        this.loc++;
        //locがquizと同じ数になるまで進むと、次の単語になるように処理する。
        if (this.loc === this.quiz.length) {
          this.makeQuiz();
          this.loc = 0;
        }
        this.updateTarget();
        this.score++;
      } else {
        this.miss++;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
