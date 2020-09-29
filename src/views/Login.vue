<template>
  <div class="wrap">
    <el-card class="box-card">
      <h2>系统登录</h2>
      <!-- 登录表单 -->
      <el-input v-model="user" placeholder="请输入内容">
        <i class="el-icon-user"></i>
      </el-input>
      <!-- 密码 -->
      <el-input placeholder="请输入密码" v-model="pwd" show-password></el-input>
      <el-button class="login-btn" @click="clickLogin" type="primary">登录</el-button>
      <p v-show="isShow" style="color:red">x账号或者密码输入错误，请重新输入</p>
    </el-card>
    <div class="copy">版权所属: 四川省艾腐小吃联盟</div>
  </div>
</template>
<script>
import { api_login } from "../apis/apis";
export default {
  data() {
    return {
      user: "",
      pwd: "",
      isShow:false
    };
  },
  methods: {
    clickLogin() {
      api_login({ account: this.user, password: this.pwd }).then((res) => {
        if (res.data.code == 0) {
           localStorage.id = res.data.id
           localStorage.token = res.data.token
           localStorage.role = res.data.role
          this.$message({
            message: "小吃联盟恭喜你，登录成功",
            type: "success",
          });
          this.$router.push("/nav/main")
          localStorage.setItem("id",res.data.id)
        }else{
            this.isShow = true
        }
      
      });
    },
  },
};
</script>

<style lang="less" scoped>
@base: #545c64;
.wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: @base;
  .box-card {
    width: 360px;
    text-align: center;
    .el-input {
      margin-top: 10px;
    }
    .login-btn {
      width: 100%;
      margin-top: 20px;
      background: @base;
      color: #fff;
    }
  }
  .copy {
    position: fixed;
    bottom: 0;
    color: #fff;
  }
}
</style>