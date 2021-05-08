<template>
  <div id="app">
    <div class="layout">
      <div class="header">
        <div class="logo"></div>
        <div
          v-for="item in navList"
          :key="item.id"
          class="item"
          :class="{ item_active: header.currentId === item.id }"
          @click="header.currentId = item.id"
        >
          <div style="width: 100px">
            <router-link :to="item.path"> {{ item.title }}</router-link>
          </div>
          <div class="arrow"></div>
        </div>
      </div>
      <div class="header-bottom"></div>
      <div class="container">
        <router-view />
      </div>
      <div class="footer">
        <div class="middle">底部</div>
      </div>
      <div class="broadcast">
        <div class="broadcast-container"></div>
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
          path: "findMusic",
        },
        { id: 1, title: "我的音乐", path: "myMusic" },
        { id: 2, title: "朋友", path: "friend" },
        { id: 3, title: "商城", path: "shop" },
        { id: 4, title: "音乐人", path: "musicPerosn" },
        { id: 5, title: "下载客户端", path: "download" },
      ],
      /**
       * 头部
       */
      header: {
        currentId: 0,
      },
    };
  },
  created() {
    console.log(sessionStorage.getItem("store"));
    // if (sessionStorage.getItem("store")) {
    //   this.$store.replaceState(
    //     Object.assign(
    //       {},
    //       this.$store.state,
    //       JSON.parse(sessionStorage.getItem("store"))
    //     )
    //   );
    //   sessionStorage.removeItem("store");
    // }
  },
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  outline: none;
}

a {
  text-decoration: none;
  color: #cccccc;
}
html,
body {
  height: 100%;
  overflow: hidden;
  background-color: #f5f5f5;
}
#app {
  width: 100%;
  height: 100%;
  .layout {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    & > .header {
      height: 70px;
      background-color: #242424;
      display: flex;
      align-items: center;
      .logo {
        height: 100%;
        width: 170px;
        background: url("./assets/topbar.png");
      }
      .item {
        width: 90px;
        height: 100%;
        color: #cccccc;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        text-align: center;
      }
      .item:hover {
        background-color: #000;
      }
      .item_active {
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
    & > .container {
      height: 100%;
      width: 100%;
    }
    .header-bottom {
      background-color: #c20c0c;
      height: 34px;
    }
    .footer {
      height: 170px;
      border-top: 1px solid #d3d3d3;
      .middle {
        text-align: center;
      }
    }
    .broadcast {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 50px;
      width: 100%;
      .broadcast-container {
        background: url("assets/playbar.png");
        display: none;
        height: 100%;
      }
    }
    .broadcast:hover {
      .broadcast-container {
        display: block;
      }
    }
  }
}
</style>
