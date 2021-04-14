class Vue {
  constructor(options) {
    // super()
    this.$options = options;
    this.complie();
  }
  complie() {
    let el = document.querySelector(this.$options.el);
    console.log(el);
    this.complieNode(el);
  }
  complieNode(el) {
    // 标签
    // 文本
  }
}
