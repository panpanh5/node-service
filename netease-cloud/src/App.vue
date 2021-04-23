<template>
  <div id="app">
    <div class="layout">
      <div class="header">
        <div v-for="item in navList" :key="item.id" class="item">
          <div>
            {{ item.title }}
          </div>
          <div class="arrow"></div>
        </div>
      </div>
      <div class="header-bottom"></div>
      <div class="container">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      navList: [
        {
          id: 0,
          title: "发现音乐",
          routerLink: "findMusic",
        },
        { id: 1, title: "我的音乐", routerLink: "myMusic" },
        { id: 2, title: "朋友", routerLink: "friend" },
        { id: 3, title: "商城", routerLink: "shop" },
        { id: 4, title: "音乐人", routerLink: "musicPerosn" },
        { id: 5, title: "下载客户端", routerLink: "download" },
      ],
    };
  },
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
#app {
  width: 100%;
  height: 100%;
  .layout {
    width: 100%;
    .header {
      height: 70px;
      background-color: #242424;
      display: flex;
      align-items: center;
      .item {
        width: 90px;
        height: 100%;
        color: #cccccc;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      }
      .item:hover {
        background-color: #000;
        .arrow {
          display: block;
        }
      }
      .arrow {
        border: 5px solid transparent;
        border-bottom-color: #c20c0c;
        width: 0px;
        height: 5px;
        position: absolute;
        bottom: 0;
        display: none;
      }
    }
    .header-bottom {
      background-color: #c20c0c;
      height: 5px;
    }
  }
}
</style>
