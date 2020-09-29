<template>
  <div>
    <el-card>
      <el-table :data="tableData">

        <el-table-column label="管理员信息" prop="name" width="100">  </el-table-column>
        <el-table-column label="" prop="id">  </el-table-column>
      </el-table>

      <el-upload
      class="avatar-uploader"
        action="http://127.0.0.1:5000/users/avatar_upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :data="userid"
      >
        <img v-if="userImg" :src="userImg" class="avatar" />
     
        <i    v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-card>
  </div>
</template>

<script>
import {api_accountinfo} from "../../apis/apis"
export default {
  data() {
    return {
      userImg: "",
      userid: { id: localStorage.id },
        name:"",
        id:"",
        time:"",
        userGroup:"",

      //表格数据
      tableData: [
       
      ],
    };
  },
  methods: {
    //待修改提示     上传成功返回图片后缀，发送通知nav组件刷新页面
    handleAvatarSuccess(res) {
      let img = 'http://127.0.0.1:5000/upload/imgs/acc_img/'
      this.userImg =img+ res.imgUrl;
          this.$message({
          message: '头像更换成功',
          type: 'success'
        });
      //发出通知
      this.$bus.emit("xxx", res.imgUrl);
    },
    beforeAvatarUpload() {},
  },
  created(){
       api_accountinfo({ params: { id: localStorage.id } }).then((res) => {
          this.name = res.data.accountInfo.account;
          this.id = res.data.accountInfo.id;
          this.userGroup = res.data.accountInfo.userGroup;
          this.time = this.$moment( res.data.accountInfo.ctime).format("YYYY-MM-DD HH:mm:ss")
          //this.$moment( res.data.accountInfo.ctime).format("YYYY-MM-DD HH:mm:ss")
          this.tableData= [
        {
          name: "管理员ID ：",
          id: this.id
        },
        {
          name: "账号 ：",
          id:this.name
        },
        {
          name: "用户组 ：",
          id:this.userGroup
        },
         {
          name: "创建时间 ：",
          id:this.time
        },
      ]
      //报存数据渲染个人中心信息页面
    //   localStorage.name = res.data.accountInfo.account;
    //   localStorage.userGroup = res.data.accountInfo.userGroup;
    //   localStorage.ctime = this.$moment( res.data.accountInfo.ctime).format("YYYY-MM-DD HH:mm:ss");
    //   //更换用户头像
    //   this.headersrc = res.data.accountInfo.imgUrl;
    });
  }
};
</script>

<style lang="less" scoped>
 .avatar-uploader, .el-upload {
     margin-top: 20px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
     width: 178px;
  }
  .avatar-uploader ,.el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>