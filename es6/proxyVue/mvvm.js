// Proxy对象代理，基本数据的拦截
class Vue extends EventTarget {
    constructor(options) {
        super()
        this.$options = options;
        this.complie();
        this.observe(this.$options.data)
    }
    complie() {
        let el = document.querySelector(this.$options.el);
        console.log(el);
        this.complieNode(el);
    }
    complieNode(el) {
        let childNodes = el.childNodes;
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
            this.addEventListener($1, e => {
                // 重新渲染视图；
                let oldValue = this.$options.data[$1];
                console.log(oldValue)
                // let reg = /oldValue/g
                // oldValue变量
                let reg = new RegExp(oldValue);
                node.textContent = node.textContent.replace(reg, e.detail);
            })
        }
    }
    // 数据劫持看数据是否改变
    observe(data) {
        // let nodes = Object.keys(data);
        // nodes.forEach(v => {
        //     this.nodeChange(data, v, data[v])
        // })
        let _this = this
        this.$options.data = new Proxy(data, {
            get(data, key) {
                console.log(data, data[key])
                return data[key]
            },
            set(data, key, value) {
                console.log(data, key, value)
                let event = new CustomEvent(key, {
                    detail: value
                })
                console.log(this)
                _this.dispatchEvent(event)
                return data[key] = value
            }
        })
    }
    /**
     * 劫持数据
     */
    nodeChange(node, key, val) {
        const _this = this
        Object.defineProperty(node, key, {
            configurable: true,
            enumerable: true,
            get() {
                return val
            },
            set(newValue) {
                // node.textContent = node.textContent.replace(reg, e.detail);
                // 设置自定义事件
                let event = new CustomEvent(key, {
                    detail: newValue
                });
                // 自定义事件的触发
                _this.dispatchEvent(event);
                //数据劫持将新的值赋值给旧值---如果在自定义事件触发之前--则自定义事件拿不到原来的值，拿到的将是设置后的新值
                val = newValue
            }
        });
    }
}
