/* eslint-disable prettier/prettier */
<template>
  <div class="home" v-title data-title="学习vue页面">
    <header></header>
    <main>
      <div id="nav">
        <el-col :span="12" style="width:100%">
          <el-menu
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :router="true"
            :default-active="this.$route.path"
          >
            <div v-for="(item, index) in navList" :key="index">
              <el-submenu v-if="item.children && item.children.length > 0">
                <el-menu-item :index="item.path ? item.path : index">{{
                  item.name
                }}</el-menu-item>
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span>{{ item.name }}</span>
                </template>
                <el-submenu
                  :index="v.path"
                  v-for="(v, vIndex) in item.children"
                  :key="vIndex + index"
                >
                  <template slot="title">{{ v.name }}</template>
                  <el-menu-item
                    :index="v.path"
                    :route="{ path: '/home/first' }"
                    >{{ v.name }}</el-menu-item
                  >
                </el-submenu>
              </el-submenu>
              <el-menu-item :index="item.path" v-else>
                <i class="el-icon-menu"></i>
                <span slot="title">{{ item.name }}</span>
              </el-menu-item>
            </div>
          </el-menu>
        </el-col>
      </div>
      <router-view />
    </main>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  data() {
    return {
      navList: [
        {
          name: "首页",
          icon: "el-icon-s-home",
          path: "home",
          children: [
            {
              name: "子选项一",
              icon: "el-icon-s-home",
              path: "home/first",
            },
          ],
        },
        {
          name: "导航一",
          icon: "el-icon-s-release",
        },
        {
          name: "导航二",
          icon: "el-icon-s-ticket",
        },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style scoped>
/*修改滚动条样式*/
div::-webkit-scrollbar {
  width: 2px;
  height: 10px;
  /**/
}
div::-webkit-scrollbar-track {
  background: rgb(239, 239, 239);
  border-radius: 2px;
}
div::-webkit-scrollbar-thumb {
  background: #bfbfbf;
  border-radius: 10px;
}
div::-webkit-scrollbar-thumb:hover {
  background: #333;
}
div::-webkit-scrollbar-corner {
  background: #179a16;
}
/* 导航 */
#nav {
  width: 200px;
  height: 100%;

  overflow: auto;
}
/* 头部 */
header {
  width: 100%;
  height: 40px;
  background-color: rgb(64, 158, 255);
  position: fixed;
  z-index: 1000;
}
/* 内容区域 */
main {
  display: flex;
  padding-top: 40px;
}
</style>
