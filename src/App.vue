<template>
  <div id="app">
    <img width="200"
         height="200"
         src="./assets/dog.jpg" />
    <div class="作者">

      <label>chentong:</label>
      <a href="https://github.com/gnotnehc/BullshitGenerator-English">
        https://github.com/gnotnehc/BullshitGenerator-English
      </a>
      <br />
      <label>{{i18n.原作者}}:</label>
      <a href="https://github.com/gnotnehc/BullshitGenerator-English">
        https://github.com/menzi11/BullshitGenerator
      </a>

    </div>
    <div class="文章生成器">{{i18n.文章生成器}}</div>
    <div class="主题">{{i18n.主题Label}}
      <input class="输入框"
             v-model="value" />
    </div>
    <div class="输入框-容器">
      {{i18n.字数}}
      <input class="输入框2"
             v-model="count" />
    </div>
    <!-- <button @click="changeLanguage">切换语言</button> -->
    <button class="按钮"
            @click="生成文章()">{{i18n.生成}}</button>
    <div class="论文"
         v-html="innerHTML">

    </div>

  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      value: '',
      innerHTML: '',
      名人名言: '',
      前面垫话: '',
      后面垫话: '',
      论述: '',
      主题: '',
      文章: [],
      排版: '',
      count: 6000
    }
  },
  mounted () {
    this.value = this.i18n.主题
    this.名人名言 = this.i18n.名人名言
    this.前面垫话 = this.i18n.前面垫话
    this.后面垫话 = this.i18n.后面垫话
    this.论述 = this.i18n.论述
    this.主题 = this.i18n.主题
  },
  components: {

  },
  computed: {
    i18n () {
      return this.$t('app')
    }
  },
  methods: {
    changeLanguage () {
      let locale = this.$i18n.locale
      locale === 'zh' ? this.$i18n.locale = 'en' : this.$i18n.locale = 'zh'
      this.名人名言 = this.i18n.名人名言
      this.前面垫话 = this.i18n.前面垫话
      this.后面垫话 = this.i18n.后面垫话
      this.论述 = this.i18n.论述
      this.主题 = this.i18n.主题
    },
    随便取一句 (列表) {
      let 坐标 = Math.floor(Math.random() * 列表.length)
      return 列表[坐标]
    },

    随便取一个数 (最小值 = 0, 最大值 = 100) {
      let 数字 = Math.random() * (最大值 - 最小值) + 最小值
      return 数字
    },
    来点名人名言 () {
      let 名言 = this.随便取一句(this.名人名言)
      名言 = 名言.replace(this.前面垫话[0], this.随便取一句(this.前面垫话))
      名言 = 名言.replace(this.后面垫话[0], this.随便取一句(this.后面垫话))
      return 名言
    },

    来点论述 () {
      let 句子 = this.随便取一句(this.论述)
      句子 = 句子.replace(RegExp(this.i18n.输入主题, 'g'), this.主题)
      return 句子
    },

    增加段落 (章节) {
      if (章节[章节.length - 1] === ' ') {
        章节 = 章节.slice(0, -2)
      }
      return '　　' + 章节 + '。 '
    },

    生成文章 () {
      this.主题 = this.value
      this.文章 = []

      let 章节 = ''
      let 章节长度 = 0
      while (章节长度 < this.count) {
        let 随机数 = this.随便取一个数()
        if (随机数 < 5 && 章节.length > 200) {
          章节 = this.增加段落(章节)
          this.文章.push(章节)
          章节 = ''
        } else if (随机数 < 20) {
          let 句子 = this.来点名人名言()
          章节长度 = 章节长度 + 句子.length
          章节 = 章节 + 句子
        } else {
          let 句子 = this.来点论述()
          章节长度 = 章节长度 + 句子.length
          章节 = 章节 + 句子
        }
      }
      章节 = this.增加段落(章节)
      this.文章.push(章节)

      this.排版 = '<div>' + this.文章.join('</div><div>') + '</div>'
      this.innerHTML = this.排版
    }

  }
}
</script>

<style lang="stylus">
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin-top: 60px
  border: 10px solid #2c3e50
  padding: 50px
  .作者
    margin-bottom: 20px
  img
    margin-top: 20px
    margin-bottom: 20px
    border-radius: 50%
  .文章生成器
    text-align: center
    color: red
    margin-bottom: 10px
  .主题
    padding: 20px
    .输入框
      margin-top: 30px
      margin-left: 20px
      width: 50vh
  .输入框-容器
    margin-bottom: 20px
    .输入框2
      margin-top: 30px
      margin-left: 20px
      width: 50vh
  .按钮
    margin-bottom: 20px
    border: none
    padding: 10px 20px
    vertical-align: top
    font-size: 1.8rem
    background: #454545
    color: #efefef
</style>
