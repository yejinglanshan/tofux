<template>
  <el-card>
    <div class="wrap">
      <h2>添加账号</h2>
      <label for="user">
        <span>账号</span>
         <el-input id="user" v-model="user" placeholder="用户名"></el-input>
      </label>
     <label for="pwd">
       <span>密码</span>
      <el-input id="pwd" v-model="pwd" placeholder="密码"></el-input>
     </label>
     <label for="selected">
       <span>用户组</span>
        <el-select v-model="select" >
        <el-option v-for="item in options" :key="item.value" :value="item"></el-option>
      </el-select>
     </label>
     
      <div>
        <el-button type="success" @click="clickAdd">提交</el-button>
        <el-button  @click="clickRemove">重置</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import {api_addacc} from "../../apis/apis"

export default {
  data() {
    return {
      user: "",
      pwd: "",
      select: "超级管理员",
      options: ["超级管理员", "普通管理员"],
    };
  },
  methods: {
    // 账号添加
    clickAdd() {
      api_addacc({
        account: this.user,
        password: this.pwd,
        userGroup: this.select,
      }).then( res=>{
        console.log(res);
        if(res.data.code==0){
          this.$message({
            message: "账号添加成功",
            type: "success",
          });
          this.user="",
          this.pwd="",
          this.select = "超级管理员"
        }else{
          alert("账号添加失败")
        }
      });
    },
    // 账号重置
    clickRemove(){
      this.user="",
      this.pwd="",
      this.select="超级管理员"
    }
  },
 
};
</script>

<style lang="less" scoped>
.wrap {
  background: #fff;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  h2 {
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }
  label{
    span{
      width: 60px;
      display: inline-block;
    }
  }
  .el-input {
    width: 300px;
    margin: 10px 0;
  }
  .el-select {
    width: 300px;
  }
  .el-button {
    width: 100px;
    margin-top: 10px;
  }
}
</style>