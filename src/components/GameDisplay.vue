<template>
  <div class="text-center">
    <!-- スタート前に表示される部分 -->
    <template v-if="!isActive">
      <v-btn class="mt-3" color="secondary">Hit Space to Start!</v-btn>
    </template>
    <!-- スタートしたら表示される部分 -->
    <template v-else>
      <h3 class="display-1">{{ quiz }}</h3>
      <div>
        score: <span>{{ score }}</span> miss: <span>{{ miss }}</span> time left:
        <span>{{ timer }}</span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "GameDisplay",
  data() {
    return {
      isActive: false,
      words: ["apple", "orange", "grapes"],
      quiz: "quiz",
      score: 0,
      miss: 0,
      loc: 0,
      timer: "0.00",
      timeLimit: 3 * 1000,
      startTime: ""
    };
  },
  mounted() {
    //スペースを押すとstarGameが動く
    window.addEventListener("keydown", e => {
      if (e.keyCode === 32) {
        this.startGame();
      }
    });
  },
  methods: {
    startGame() {
      if (!this.isActive) {
        this.isActive = true;
      }
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
        setTimeout(() => {
          // alert("Game Over");
          this.showResult();
        }, 100);
        this.isActive = !this.isActive;
      }
    },
    showResult() {
      const accuracy =
        this.score + this.miss === 0
          ? 0
          : (this.score / (this.score + this.miss)) * 100;
      const msg = `Score: ${this.score}, Miss: ${
        this.miss
      }, Accuary :${accuracy.toFixed(2)}%`;
      alert(msg);
    },
    makeQuiz() {
      // ランダムに単語が選ばれるようにする;
      const rnd = Math.floor(Math.random() * this.words.length);
      this.quiz = this.words[rnd];
      return this.quiz;
    },
    updateTarget() {
      //正解したもじを＿に変えていく処理
      let placeholder = "";
      for (let i = 0; i < this.loc; i++) {
        placeholder += "_";
      }
      this.quiz = placeholder + this.quiz.substring(this.loc);
    },
    typeWord() {
      // タイピング判定の処理
      window.addEventListener("keydown", e => {
        if (e.key === this.quiz[this.loc]) {
          this.loc++;
          //locがquizと同じ数になるまで進むと、次の単語になるように処理する。（合っているかチェック）
          if (this.loc === this.quiz.length) {
            this.makeQuiz();
            this.loc = 0;
          }
          this.updateTarget();
          this.score++;
        } else {
          this.miss++;
        }
      });
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
