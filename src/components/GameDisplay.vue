<template>
  <div>
    <!-- スタート前に表示される部分 -->
    <template v-if="!isActive">
      <h1>{{ msg }}</h1>
      <button @click="startGame()">Click to Start!</button>
    </template>
    <!-- スタートしたら表示される部分 -->
    <template v-else>
      <h1>{{ quiz }}</h1>
      <div>
        score:<span>{{ score }}</span> miss:<span>{{ miss }}</span>
      </div>
    </template>
  </div>
</template>

<script>
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
      loc: 0
    };
  },
  computed: {
    // quiz() {
    //   // qmakeQuiz()の値からquizを作って表示させる
    //   return this.makeQuiz();
    // }
    // quiz: {
    //   // getter 関数
    //   get: function() {
    //     return this.makeQuiz;
    //   },
    //   // setter 関数
    //   set: function(newValue) {
    //     var names = newValue.split(" ");
    //     this.firstName = names[0];
    //     this.lastName = names[names.length - 1];
    //   }
    // }
  },
  mounted() {},
  methods: {
    startGame() {
      if (this.isActive === false) this.isActive = true;
      this.makeQuiz();
      this.typeWord();
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
