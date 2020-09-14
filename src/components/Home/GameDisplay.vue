<template>
  <div>
    <!-- スタート前に表示される部分 -->
    <template v-if="!isActive">
      <TypingAnimation @startButtonClicked="startGame()" />
      <Buttons v-if="!isAutentificated" />
    </template>
    <!-- スタートしたら表示される部分 -->
    <template v-else>
      <!-- countdownModal -->
      <Modal v-if="countdownModal">
        <template #header>
          <h3 class="lead">Ready?</h3>
        </template>
        <template #body>
          <p class="h2">{{ sec }}</p>
        </template>
        <template #footer></template>
      </Modal>

      <span>Quiz{{ quizNum }}</span>
      <h2 class="quiz">{{ quiz }}</h2>
      <Scores :timer="timer" :scores="{score, miss}" />
      <transition
        name="custom-classes-transition"
        enter-active-class="animate__animated animate__rubberBand"
        leave-active-class="animate__animated animate__fadeOut"
      >
        <p v-if="isBonus" :class="{ bonusEffect: isBonus }">+{{ (bonusTime / 1000).toFixed(2) }}</p>
      </transition>
    </template>

    <!-- resultModal -->
    <div class="example-modal-window">
      <Modal @close="closeResultModal" v-if="resultModal">
        <template #header>
          <h3>Your Result</h3>
        </template>
        <template #body>
          <p>Accuracy: {{ accuracy.toFixed(2) }} %</p>
          <p>Miss: {{ miss }}</p>
          <p>Time: {{ timer }}</p>
          <p>Do you want to play again?</p>
        </template>
        <template #footer>
          <b-button variant="info" @click="restartGame()">Play</b-button>
          <b-button variant="info" class="ml-3" @click="closeResultModal()">Close</b-button>
        </template>
      </Modal>
    </div>
  </div>
</template>

<script>
import { timeLimit, timer, bonusTime } from "@/plugins/definitions";
import TypingAnimation from "@/components/Home/TypingAnimation.vue";
import Buttons from "@/components/Home/Buttons.vue";
import Scores from "@/components/Home/Scores.vue";
import Modal from "@/components/Home/Modal.vue";
export default {
  name: "GameDisplay",
  props: {
    words: Array
  },
  components: {
    TypingAnimation,
    Buttons,
    Scores,
    Modal
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
      testQs: [
        "apple",
        "orange",
        "grape",
        "I work hard.",
        "You can do more than that."
      ],
      resultModal: false,
      countdownModal: false,
      sec: 5 //countdownの時間
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
  computed: {
    isAutentificated() {
      return this.$store.getters.idToken !== null;
    },
    accuracy() {
      const accuracy =
        this.score + this.miss === 0
          ? 0
          : (this.score / (this.score + this.miss)) * 100;
      return accuracy;
    },
    rnd() {
      let rnd = Math.floor(Math.random() * this.words.length);
      return rnd;
    }
  },
  methods: {
    init() {
      this.loc = 0;
      this.score = 0;
      this.miss = 0;
      this.isClear = false;
    },
    async startGame() {
      this.init();
      this.isActive = true;
      this.openCountdownModal();
      //スタートするまでに時間を作る
      this.makeQuiz();
      await this.countdown();
      this.closeCountdownModal();
      //クリックしたときの時間を保持する
      this.startTime = Date.now();
      this.updateTimer();
      this.typeWord();
    },
    restartGame() {
      this.closeResultModal();
      location.reload();
    },
    updateTimer() {
      let timeLeft;
      timeLeft = this.timeLimit - (Date.now() - this.startTime);
      this.timer = (timeLeft / 1000).toFixed(2);
      const timeoutId = setTimeout(() => {
        this.updateTimer();
      }, 10);
      //ゲームオーバーの設定
      if (timeLeft < 0 || !this.unsolvedQs.length) {
        clearTimeout(timeoutId);
        // this.timer = "0.00";
        this.quizNum = "";
        // timeLeftの値を0.00がになってからshowResultになってほしいので単純にタイミングをずらす。
        setTimeout(() => {
          this.showResult();
        }, 100);
      }
    },

    addBonusTime() {
      //問題をクリアするとボーナスタイムを加える処理
      this.isBonus = true;
      this.timeLimit = this.timeLimit + this.bonusTime;
    },
    showResult() {
      this.openResultModal();
    },
    makeQuiz() {
      // ランダムに単語が選ばれるようにする;
      if (!this.isAutentificated) {
        //ログインされていなければテスト用の問題を出す。
        this.words = this.testQs;
        this.quiz = this.words[this.rnd];
      } else {
        //IdTokenがあれば
        this.quiz = this.words[this.rnd].document.fields.sentence.stringValue;
      }
      this.unsolvedQs = this.words;
    },
    solvedQs() {
      //クリアした問題は配列から削る
      this.unsolvedQs.splice(this.rnd, 1);
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
          this.solvedQs(this.rnd);
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
    },
    openResultModal() {
      this.resultModal = true;
    },
    closeResultModal() {
      this.resultModal = false;
    },
    openCountdownModal() {
      this.countdownModal = true;
    },
    closeCountdownModal() {
      this.countdownModal = false;
    },
    async countdown() {
      await this.countdownTimer();
    },
    countdownTimer() {
      return new Promise(resolve => {
        this.sec -= 1;
        const timeId = setTimeout(async () => {
          await this.countdownTimer();
          resolve();
        }, 1000);
        if (this.sec === 0) {
          clearTimeout(timeId);
          resolve();
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
// タイピング文字のスタイル
.vue-typer {
  font-family: "Courier New", monospace;
}
.vue-typer .custom.char.typed {
  color: #607d8b;
}
.typer-height {
  height: 4rem;
}
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
