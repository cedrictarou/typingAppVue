<template>
  <div>
    <!-- スタート前に表示される部分 -->
    <template v-if="!isActive">
      <h2>{{ msg }}</h2>
      <h3>
        <b-badge
          @click="startGame"
          variant="info"
          class="startEffect"
        >Press Space or Click to Start!</b-badge>
      </h3>
    </template>
    <!-- スタートしたら表示される部分 -->
    <template v-else>
      <span>Quiz{{quizNum}}</span>
      <h2 class="quiz">{{ quiz }}</h2>
      <div>
        score:
        <span>{{ score }}</span> miss:
        <span>{{ miss }}</span> time left:
        <span>{{ timer }}</span>
        <transition
          name="custom-classes-transition"
          enter-active-class="animate__animated animate__rubberBand"
          leave-active-class="animate__animated animate__fadeOut"
        >
          <p v-if="isBonus" :class="{ bonusEffect: isBonus }">+{{(bonusTime/1000).toFixed(2)}}</p>
        </transition>
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
      isBonus: false,
      startTime: "",
      isClear: false,
      quizNum: 1,
      unsolvedQs: [],
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
      this.isClear = false;
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
          // this.retry();
        }, 100);
      }
    },
    addBonusTime() {
      //問題をクリアするとボーナスタイムを加える処理
      this.isBonus = true;
      this.timeLimit = this.timeLimit + this.bonusTime;
    },
    showResult() {
      const msg = "Do you want to try again?";
      const accuracy =
        this.score + this.miss === 0
          ? 0
          : (this.score / (this.score + this.miss)) * 100;
      const result = `Score: ${this.score}, Miss: ${
        this.miss}, Accuary :${accuracy.toFixed(2)}? \n${msg}`;
      alert(result);
      location.reload();
    },
    makeQuiz() {
      // ランダムに単語が選ばれるようにする;
      const rnd = Math.floor(Math.random() * this.words.length);
      this.unsolvedQs = this.words;
      this.quiz = this.words[rnd].document.fields.sentence.stringValue;
      console.log(this.unsolvedQs);
      //unsolvedQsから外される処理。
      this.solvedQs(rnd);
      //問題をすべてクリアすると結果を表示する処理。
      if(this.unsolvedQs.length === 0 ) {
        const msg = "Nice work!!";
        alert(msg);
        this.showResult();
      }
      return this.quiz;
    },
    solvedQs(index) {
      //クリアした問題は配列から削る
      this.unsolvedQs.splice(index,1);
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
      this.isBonus = false;
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
          //正解しているとquizNumを増やす
          this.quizNum += 1;
          //isSuccesseをtrueにするためのエミット
          this.$emit("turnVue");
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
.startEffect {
  cursor: pointer;
  animation: pulse;
  animation-duration: 2s;
  animation-iteration-count: infinite;
}
.quiz {
  font-family: "Courier New", monospace;
  letter-spacing: 0.05em;
}
.bonusEffect {
  color: chocolate;
  animation-duration: 2s;
  transition: all 1s linear 0s;
}
.animate__wobble {
  animation-delay: 2s;
}
@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
