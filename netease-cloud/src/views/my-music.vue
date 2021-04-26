<template>
  <div class="my-music">
    <div v-if="isLogin">1</div>

    <!-- <div v-else class="empty_login">
      <div class="go_login">
        <a @click="login" hidefocus="true"></a>
      </div>
    </div> -->
    <!-- 登录弹出层 -->
    <template>
      <div class="popup" v-show="isShowLogin">
        <div
          class="header"
          @mousedown.stop="mousedown($event)"
          @mouseup.stop="mouseup()"
          @mouseleave="mouseleave()"
        >
          <div class="right" @click="isShowLogin = !isShowLogin">X</div>
        </div>
        <div class="container">
          <img src="../assets/qr_guide.png" alt="" />
          <div><el-button round>选择其他登录方式登录</el-button></div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
/**
 * 取缓存
 */
function localStorage() {
  let usr = window.localStorage.getItem("user");
  this.isLogin = Boolean(usr);
  console.log(this.isLogin);
}
// 应该是在缓存中判断有没有登录过，没有显示登录界面，登录了显示我的音乐界面
export default {
  // 变量数据
  data() {
    return {
      isLogin: false,
      isShowLogin: true,
    };
  },
  // 方法数据
  methods: {
    localStorage,
    login: function () {
      this.isShowLogin = true;
    },
    mousedown: function (event) {
      let orginX = event.x - event.offsetX;
      let orginY = event.y - event.offsetY;
      document.querySelector(".header").onmousemove = ($event) => {
        let diffX = $event.x - event.x;
        let diffY = $event.y - event.y;
        document.querySelector(".popup").style.top = orginY + diffY + "px";
        document.querySelector(".popup").style.left = orginX + diffX + "px";
      };
    },
    mouseup: function () {
      document.querySelector(".header").onmousemove = false;
    },
    mouseleave: function () {
      document.querySelector(".header").onmousemove = false;
    },
  },
  created() {},
  mounted() {
    this.localStorage();
  },
};
</script>

<style scoped lang="scss">
.my-music {
  height: 100%;
  width: 100%;
  position: relative;
  .empty_login {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .go_login {
      height: 270px;
      width: 800px;
      background: url("../assets/mymusic.png") no-repeat;
      background-position: 0 0;
      position: relative;
      & > a {
        display: inline-block;
        width: 170px;
        height: 50px;
        position: absolute;
        bottom: 20px;
        right: 150px;
      }
    }
  }
}
// 弹出层
.popup {
  width: 530px;
  height: 370px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: calc(50% - 250px);
  .header {
    background-color: #333;
    height: 40px;
    position: relative;
    cursor: move;
    & > .right {
      position: absolute;
      top: 10px;
      right: 5px;
      color: #fff;
      cursor: pointer;
    }
  }
  .container {
    & > img {
      height: 220px;
    }
  }
}
</style>
