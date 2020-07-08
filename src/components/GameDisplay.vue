<template>
  <div>
    <!-- スタート前に表示される部分 -->
    <template v-if="!isActive">
      <h2>{{ msg }}</h2>
      <h3>
        <b-badge variant="info">Press Space to Start!</b-badge>
      </h3>
    </template>
    <!-- スタートしたら表示される部分 -->
    <template v-else>
      <h2 class="quiz">{{ quiz }}</h2>
      <div>
        score: <span>{{ score }}</span> miss: <span>{{ miss }}</span> time left:
        <span class="bonusEffect">{{ timer }}</span>
      </div>
         </template>
  </div>
</template>

<script>
import { timeLimit, timer, bonusTime } from "../plugins/definitions";
export default {
  name: "GameDisplay",
  props: {
    msg: String,
    words: Array
  },
  data() {
    return {
      isActive: false,
      quiz: "quiz",
      score: 0,
      miss: 0,
      loc: 0,
      timer,
      timeLimit,
      bonusTime,
      startTime: "",
      isClear: false
    };
  },
  mounted() {
    window.addEventListener("keydown", e => {
      if (e.keyCode === 32) {
        //isActiveがtrueのとき処理はしない
        if (this.isActive) {
          return;
        }
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
      let timeLeft;
      timeLeft = this.timeLimit - (Date.now() - this.startTime);
      this.timer = (timeLeft / 1000).toFixed(2);
      const timeoutId = setTimeout(() => {
        this.updateTimer();
      }, 10);

      //ゲームオーバーの設定
      if (timeLeft < 0) {
        clearTimeout(timeoutId);
        this.timer = "0.00";
        // timeLeftの値を0.00がになってからshowResultになってほしいので単純にタイミングをずらす。
        setTimeout(() => {
          this.showResult();
          this.retry();
        }, 100);
      }
    },
    addBonusTime() {
      //問題をクリアするとボーナスタイムを加える処理
      this.timeLimit = this.timeLimit + this.bonusTime; 
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
      this.quiz = this.words[rnd].document.fields.sentence.stringValue;
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
        this.isClear = false;
        //locがquizと同じ数になるまで進むと、次の単語になるように処理する。
        if (this.loc === this.quiz.length) {
          this.makeQuiz();
          this.loc = 0;
          this.isClear = true;
          //正解していると時間を追加して上げる。
          this.addBonusTime();
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
.quiz {
  font-family: "Courier New", monospace;
  letter-spacing: 0.05em;
}
.bonusEffect {
  color:chocolate;
}
</style>
