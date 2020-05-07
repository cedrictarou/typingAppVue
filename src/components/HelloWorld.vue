<template>
  <div>
    <!-- スタート前に表示される部分 -->
    <template v-if="!isActive">
      <button @click="start()">Click to Start!</button>
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
  name: "HelloWorld",
  data() {
    return {
      isActive: false,
      words: ["apple", "orange", "grapes"],
      quiz: "",
      typingText: "",
      loc: 0,
      score: 0,
      miss: 0
    };
  },
  computed: {},
  mounted() {
    // タイピングされたキーの検知
    window.addEventListener("keydown", e => {
      if (e.key == this.quiz[this.loc]) {
        this.loc++;
        this.score++;
        this.updateTarget();
      } else {
        this.miss++;
      }
    });
  },
  methods: {
    start() {
      window.addEventListener("click", () => {
        this.isActive = true;
        if (this.isActive) {
          this.makingQuiz();
        }
      });
    },
    makingQuiz() {
      this.quiz = this.words[Math.floor(Math.random() * this.words.length)];
      return this.quiz;
    },
    // 正解した文字を＿にしていく
    updateTarget() {
      let placeholder = "";
      for (let i = 0; i < this.loc; i++) {
        placeholder += "_";
      }
      this.quiz = placeholder + this.quiz.substring(this.loc);
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
