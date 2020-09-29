<template>
  <div class="wrap">
    <!-- 标题 -->
    <h1 class="wrap-title">商品添加</h1>
    <!-- 商品信息填写 -->
    <div class="section">
      <!-- 商品名称 -->
      <el-form label-width="80px">
        <el-form-item label="商品名称">
          <el-input v-model="name"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-select v-model="category" placeholder="请选择分类">
            <el-option
              v-for="item in list"
              :key="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 商品价格 -->
        <el-form label-width="80px">
          <el-form-item label="商品价格">
            <!-- <el-input v-model="form.name"></el-input> -->
            <el-input-number
              v-model="price"
              :min="1"
              :max="100"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
        </el-form>
        <!-- 商品图片 -->
        <el-form ref="form" label-width="80px">
          <el-form-item label="商品图片">
            <!-- 图片上传 -->
            <!-- <el-input v-model="form.name"></el-input> -->
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:5000/goods/goods_img_upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="imageUrl"  :src="imageUrl" class="avatar" />
              
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <!-- 图片代码上传结束 -->
          </el-form-item>
        </el-form>
        <!-- 商品描述 -->
        <el-form-item label="商品描述">
          <el-input type="textarea" v-model="goodsDesc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">添加商品</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { api_goodscategories, api_goodsadd } from "../../apis/apis.js";
export default {
  data() {
    return {
      //分类数据
      list: [],
      // 商品分类
      category: "",
      // 商品名称
      name: "",
      // 商品描述
      goodsDesc: "",
      //图片
      imgUrl: "",
      // 
      imageUrl:"",
      // 商品价格
      price: 1,
    };
  },
  //
  methods: {
    // 提交商品
    submit() {
      let { name, category, price, imgUrl, goodsDesc } = this;
      api_goodsadd({ name, category, price, imgUrl, goodsDesc }).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: "商品上传成功",
            type: "success",
          });
          console.log(res);
        } else {
          this.$message.error("商品上传失败,请稍后再试");
        }
      });
    },
    // 图片上传
    handleAvatarSuccess(res, file) {
      file;
      this.imageUrl="http://127.0.0.1:5000/upload/imgs/goods_img/" +res.imgUrl;
      this.imgUrl =  res.imgUrl;
    },
  },
  created() {
    //初始化渲染options
    api_goodscategories().then((res) => {
      res;
      for (let obj of res.data.categories) {
        this.list.push(obj.cateName);
      }
    });
  },
};
</script>

<style lang="less" scoped>
.wrap {
  // border: 1px solid red;
  background: #fff;
  padding: 30px 0;
  .wrap-title {
    border-bottom: 1px solid #ccc;
    padding-bottom: 20px;
    text-indent: 10px;
  }
  .section {
    width: 600px;
    padding-top: 20px;
    // 图片上传
    .avatar-uploader,
    .el-upload {
      width: 178px;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      &:hover {
        border-color: #409eff;
      }
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
  }
}
</style>