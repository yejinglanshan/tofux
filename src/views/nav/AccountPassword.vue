<template>
  <div class="wrap">
    <h2>修改密码</h2>
    <!-- 表单 -->
    <el-form label-width="100px" class="demo-ruleForm">
      <el-form-item label="原密码密码">
        <el-input
          @blur="passBlur"
          type="password"
          v-model="pass"
          autocomplete="off"
          :suffix-icon="e"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input
          type="password"
          v-model="checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认新密码">
        <el-input v-model="cpwd" type="password" @blur="cpwdBlur"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit" :disabled="on">提交</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { api_usercheckoldpwd, api_usereditpwd } from "../../apis/apis";

export default {
  data() {
    return {
      pass: "",
      checkPass: "",
      cpwd: "",
      e: "false",
      on:true,
      id: JSON.parse(localStorage.getItem("id")),
    };
  },
  methods: {
    submit() {
      api_usereditpwd({ newPwd: this.cpwd, id: this.id }).then((res) => {
        console.log(res);
      });
      console.log(this.pass, this.checkPass, this.cpwd);
    },

    //验证旧密码
    passBlur() {
      if (this.pass.length == 0) return false;
      let { pass, id } = this;
      api_usercheckoldpwd({ params: { id: id, oldPwd: pass } }).then((res) => {
        if (res.data.code == 0) {
          this.e = "el-icon-check";
          this.$message("密码正确");
        
          console.log(this.on);
        } else {
          this.$message.error("密码错误！");
        }
      });
    },

    //确认密码
    cpwdBlur() {
      if (this.checkPass == this.cpwd) {
        this.$message("两次密码一致");
          this.on = false
      } else {
        this.$message.error("两次密码不一致！");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.wrap {
  border: 1px solid #ccc;
  background: #fff;
  padding: 20px 0;
  text-indent: 10px;
  h2 {
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }
  .el-form {
    padding-top: 20px;
    width: 400px;
  }
}
</style>