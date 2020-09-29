<template>
  <el-card>
    <div class="wrap">
      <h2>店铺管理</h2>
      <label for="phone">
        <span>店铺名称</span>
        <el-input id=" 店铺名称" v-model="data.name"></el-input>
      </label>
      <label for="店铺公告">
        <span>店铺公告</span>
        <el-input :rows="4" type="textarea" v-model="data.bulletin"></el-input>
      </label>
      <!--店铺头像  -->
      <div class="store-img">
        <span>店铺头像</span>
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:5000/shop/upload/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>

      <!-- 店铺照片 -->
      <div class="store-img">
        <span>店铺照片</span>
        <el-upload
          action="http://127.0.0.1:5000/shop/upload"
          list-type="picture-card"
          :on-remove="handleRemove"
          :file-list="storeimg"
          :on-success="handleAvatarSucce"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog>
          <!-- :visible.sync="dialogVisible" -->
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </div>
      <!-- 配送费 -->
      <label for="phone">
        <span>配送费</span>
        <el-input v-model="data.deliveryPrice"></el-input>
      </label>
      <!-- 配送时间 -->
      <label for="phone">
        <span>配送时间</span>
        <el-input v-model="data.deliveryTime"></el-input>
      </label>
      <!-- 配送描述 -->
      <label for="phone">
        <span>配送描述</span>
        <el-input v-model="data.description"></el-input>
      </label>
      <!-- 店铺评分 -->
      <label for="phone">
        <span>店铺评分</span>
        <el-input v-model="data.score"></el-input>
      </label>
      <!-- 销量 -->
      <label for="销量">
        <span>销量</span>
        <el-input v-model="data.sellCount"></el-input>
      </label>
      <!-- 多选活动组 -->
      <el-input v-model="value"></el-input>
      <el-button @click="clickValue">添加新活动</el-button>
      <el-checkbox-group v-model="newCheckList" @change="clickChecked">
        <el-checkbox
          :label="item"
          v-for="item in checkList"
          :key="item"
        ></el-checkbox>
      </el-checkbox-group>
      <!-- 日期 -->
      <div class="store-img">
        <span>营业时间</span>
        <el-time-picker
          @change="timeDate"
          is-range
          v-model="value1"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        >
        </el-time-picker>
      </div>
      <el-button @click="clickSave">保存修改</el-button>
    </div>
  </el-card>
</template>

<script>
import { api_shopinfo, api_shopedit } from "../../apis/apis.js";
export default {
  data() {
    return {
      storeimg: [], //店铺图片
      value1: [new Date(2016, 9, 10, 8, 0), new Date(2016, 9, 10, 10, 30)], //日期
      imageUrl: "", //店铺头像
      dialogImageUrl: "", //照片墙
      value: "",
      checkList: [],
      newCheckList: [],
      data: [],
    };
  },
  methods: {
    //保存店铺修改
    clickSave() {
      let { data } = this;
      if (typeof data.supports == "string") {
        console.log();
      } else {
        data.supports = JSON.stringify(data.supports);
      }
      if (typeof data.pics == "string") {
        console.log();
      } else {
        data.pics = JSON.stringify(data.pics);
      }
      if (typeof data.date == "string") {
        console.log();
      } else {
        data.date = JSON.stringify(data.date);
      }

      //更改店铺信息接口
      api_shopedit(data).then((res) => {
        res;
      });
    },
    //营业时间
    timeDate(time) {
      this.data.date = [
        this.$moment(time[0]).format("YYYY-MM-DD HH:mm:ss"),
        this.$moment(time[1]).format("YYYY-MM-DD HH:mm:ss"),
      ];
    },
    //check选项组发生改变 重新赋值
    clickChecked(item) {
      this.data.supports = item;
    },
    //添加新活动
    clickValue() {
      this.checkList.push(this.value);
    },
    //店铺头像 回填数据
    handleAvatarSuccess(res) {
      this.imageUrl = "http://127.0.0.1:5000/upload/shop/" + res.imgUrl;
      this.data.avatar = res.imgUrl;
    },

    // 删除店铺图片
    handleRemove(res, file) {
      console.log(res);
      console.log(file);

      /**老师的方法 */
      let img = res.response?res.response.imgUrl:res.name
      this.data.pics=this.data.pics.filter(name=>img!=name)

      /*第一种方法*/ 
    //   this.data.pics = file.map(file => file.name);

    /*过滤剔除* */
    // this.storeimg=this.storeimg.filter(obj => obj.name!=res.name)
    /**循环删除 */
      // for (let i = 0; i < this.storeimg.length; i++) {
      //   console.log(this.storeimg[i].name);
      //   if (this.storeimg[i].name == res.name) {
      //     this.storeimg.splice(i, 1);
      //   }
      // }
      console.log(this.storeimg + "删除省下的回填");
    },
    // 新增店铺图片回调
    handleAvatarSucce(res) {
      console.log(this.data.pics);
      this.data.pics.push(res.imgUrl);

      //第一种方法，回填墙保持格式 需要过滤图片回填数组和原始数组
      // this.storeimg.push({
      //   name: res.imgUrl,
      //   url: "http://127.0.0.1:5000/upload/shop/" + res.imgUrl,
      // });

      //第二种方式
      this
    },
  },
  created() {
    //初始化获取数据

    api_shopinfo().then((res) => {
      this.data = res.data.data;
      this.checkList = [...this.checkList, ...res.data.data.supports];
      //回填选中活动
      this.newCheckList = res.data.data.supports;

      res.data;
      //回填店铺头像
      this.imageUrl = "http://127.0.0.1:5000/upload/shop/" + this.data.avatar;
      //回填店铺图片
      this.storeimg = this.data.pics.map((obj) => {
        return { name: obj, url: "http://127.0.0.1:5000/upload/shop/" + obj };
      });
    });
  },
};
</script>

<style lang="less" scoped>
.wrap {
  width: 400px;
  /deep/.el-upload-list--picture-card,
  /deep/.el-upload-list__item,
  /deep/.el-upload-list__item-actions {
    transition: none !important;
  }
  .store-img {
    display: flex;
    span {
      width: 80px;
      margin-right: 10px;
    }
  }
  label {
    display: inline-block;
    margin: 20px 0;
    span {
      display: inline-block;
      width: 80px;
      text-align: right;
      margin-right: 10px;
      vertical-align: top;
    }
    .el-input {
      width: 300px;
    }
    .el-textarea {
      width: 300px;
    }
  }

  .avatar-uploader,
  .el-upload {
    width: 178px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader,
  .el-upload:hover {
    border-color: #409eff;
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
  .demo-image__placeholder {
    .el-image {
      width: 200px;
    }
  }
}
</style>