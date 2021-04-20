class Vue {
    constructor(options) {
        // super()
        this.$options = options;
        this.complie();
        this.observe()
    }
    complie() {
        let el = document.querySelector(this.$options.el);
        console.log(el);
        this.complieNode(el);
    }
    complieNode(el) {
        let childNodes = el.childNodes;
        console.log(childNodes)
        childNodes.forEach(node => {
            switch (node.nodeType) {
                case 1:
                    // 标签节点
                    this.labelNode(node)
                    break;
                case 2:
                    // 属性节点
                    break;
                case 3:
                    // 文本节点
                    this.textNode(node)
                    break;
                default:
                    break;
            }
        });
        // 标签


    }
    // 标签
    labelNode(node) {
        //    判断是否有自定义指令
        if (node.childNodes.length > 0) {
            this.complieNode(node)
        }
        if (node.attributes.length > 0) {
            this.isCustom(node)
        }
    }
    /**
     * 判断是否有自定义指令
     */
    isCustom(node) {
        let nodeAttrs = node.attributes;
        [...nodeAttrs].forEach(element => {
            if (element.name.indexOf('v-') > -1) {
                switch (element.name) {
                    case 'v-html':
                        this.operate(node, element.value)
                        break;
                    default:
                        break;
                }
            }
        });
    }
    /**
     * 具体判断是那种
     */
    operate(node, value) {
        node.value = this.$options.data[value]
    }
    // 文本---文本节点中判断是否有指令
    textNode(node) {
        let reg = /\{\{\s*(\S+)\s*\}\}/g;
        if (reg.test(node.textContent)) {
            let $1 = RegExp.$1;
            node.textContent = node.textContent.replace(reg, this.$options.data[$1]);
            console.log(node.textContent)
        }
    }
    // 数据劫持看数据是否改变
    observe() {
        let nodes = Object.keys(this.$options.data);
        nodes.forEach(v => {
            this.nodeChange(this.$options.data, v, this.$options.data[v])
        })
    }
    /**
     * 劫持数据
     */
    nodeChange(node, key, val) {
        console.log(val)
        Object.defineProperty(node, key, {
            configurable: true,
            enumerable: true,
            get() {
                return value
            },
            set(value) {
                console.log(value);
                val = value
            }
        });
    }
}
