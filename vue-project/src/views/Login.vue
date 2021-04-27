<template>
  <div id="login">
    <div class="container">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="55px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model.number="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passWord">
          <el-input
            type="password"
            v-model="ruleForm.passWord"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
          <el-button @click="resetForm('ruleForm')">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import encryptByDESModeCBC from "../util/loginEncrype";
import login from "../api/login/login";
export default {
  name: "Login",
  data() {
    var checkUseName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      callback();
    };

    return {
      ruleForm: {
        passWord: "",
        userName: "",
      },
      rules: {
        passWord: [{ validator: validatePass, trigger: "blur" }],
        userName: [{ validator: checkUseName, trigger: "blur" }],
      },
    };
  },
  watch: {
    change: () => {
      console.log(this.ruleForm.userName);
    },
    // $route: (to, from) => {
    //   console.log("$route");
    // },
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = encryptByDESModeCBC({
            userName: this.ruleForm.userName,
            passWord: this.ruleForm.passWord,
          });
          console.log(params);
          const data = login(params);
          console.log(data);
          //   encrypeMethod.encryptByDESModeCBC()
          //   this.axios.post("/api/login", { data: params }).then((res) => {
          //     console.log();
          //     this.$message(res.data.message);
          //   });
          //   this.axios.get("/api/items").then((res) => {
          //     console.log(res);
          //   });
          //   this.axios.post("/api/add").then((res) => {
          //     console.log(res);
          //   });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
#login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../assets/loginbg.png");
}
.container {
  width: 350px;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}
</style>
