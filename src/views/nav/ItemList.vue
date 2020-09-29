<template>
  <el-card>
    <div class="wrap">
      <h2>商品列表</h2>
      <!--  -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="所属店铺">
                <span>{{ props.row.shop }}</span>
              </el-form-item>
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.shopId }}</span>
              </el-form-item>
              <el-form-item label="商品分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="name"></el-table-column>
        <el-table-column label="所属分类" prop="category"></el-table-column>
        <el-table-column label="商品价格" prop="price"></el-table-column>
        <el-table-column label="商品图片" prop="imgUrl">
          <template slot-scope="scope">
            <img :src="img + scope.row.imgUrl"  style="width:150px"/>
          </template>
        </el-table-column>
        <el-table-column label="商品 ID" prop="id"></el-table-column>
        <el-table-column label="商品 描述" prop="goodsDesc"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>

        <!-- <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="描述" prop="desc"></el-table-column> -->
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[6, 12, 15, 20]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
      <!-- 编辑模态框 -->
      <el-dialog title="收货地址" :visible.sync="moduledit">
        <!-- 商品信息填写 -->
        <div class="section">
          <!-- 商品名称 -->
          <el-form label-width="80px">
            <el-form-item label="商品名称">
              <el-input v-model="data.name"></el-input>
            </el-form-item>
            <el-form-item label="商品分类">
              <el-select v-model="selected" placeholder="请选择分类">
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
                <el-input-number
                  v-model="data.price"
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
                <el-upload
                  class="avatar-uploader"
                  action="http://127.0.0.1:5000/goods/goods_img_upload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                >
                  <img v-if="imageUrl"  :src="imageUrl" class="avatar" 
                  style="width:150px"/> 
                 
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <!-- 图片代码上传结束 -->
              </el-form-item>
            </el-form>
            <!-- 商品描述 -->
            <el-form-item label="商品描述">
              <el-input type="textarea" v-model="data.goodsDesc"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="moduledit = false">取 消</el-button>
          <el-button type="primary" @click="moudlsubmit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </el-card>
</template>

<script>
import {
  api_goodslist,
  api_goodsdel,
  api_goodscategories,
  api_goodsedit,
} from "../../apis/apis";
export default {
  data() {
    return {
      img: "http://127.0.0.1:5000/upload/imgs/goods_img/",
      //当前页
      currentPage: 1,
      pageSize: 6,
      total: 0,
      tableData: [],
      // 模态框
      moduledit: false,
      data: [],//模态框表格数据
      list: [],//模态框分类数据
      selected: "",//模态框分类选择
       imageUrl :"" //模态框图片
    };
  },
  methods: {
    // 模态框图片上传回调函数
    handleAvatarSuccess(res,file) {
      file
      this.data.imgUrl = res.imgUrl
       this.imageUrl = this.img+res.imgUrl
      console.log(this.imgUrl);
    },  

    //模态框提交
    moudlsubmit() {
      this.data.category = this.selected;
      this.data.price = this.data.price.toString()
       let { data } = this;
     api_goodsedit( data).then((res) => {
        res
          this.$message({
            message: "商品修改成功",
            type: "success",
          });
         this.listChange();
         this.imageUrl = ""
         this.data.name = ""
         this.data.price = ""
         this.selected = ""
         this.data.goodsDesc = ""
      });
  
      // api_goodsedit( {name:this.data.name,id:this.data.id,category:this.data.category,price:this.data.price,imgUrl:this.data.imgUrl,goodsDesc:this.data.goodsDesc}).then((res) => {
      //   console.log(res);
      //   this.listChange();
      // });
    },
    

    // 编辑商品弹出模态框
    handleEdit(a, obj) {
      // console.log(a);
      a
      this.moduledit = true;
      this.data = JSON.parse(JSON.stringify(obj));
      this.imageUrl =this.img+this.data.imgUrl
      // console.log(this.data);
    },
    // 删除商品
    handleDelete(a, obj) {
      console.log(obj.id);
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //发送删除商品接口
          api_goodsdel({ params: { id: obj.id } }).then((res) => {
            res;
            let { currentPage, pageSize } = this;
            //发送重新获取商品列表接口
            api_goodslist({ params: { currentPage, pageSize } }).then((res) => {
              this.total = res.data.total;
              let data = res.data.data;
              this.tableData = data;
              // console.log(this.tableData);
            });
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 每页显示条数
    handleSizeChange(a) {
      this.pageSize = a;
      this.listChange();
    },
    //点击翻页
    handleCurrentChange(a) {
      this.currentPage = a;
      this.listChange();
    },
    //渲染列表函数
    listChange() {
      let { currentPage, pageSize } = this;

      api_goodslist({ params: { currentPage, pageSize } }).then((res) => {
        this.total = res.data.total;
        let data = res.data.data;
        this.tableData = data;
        // console.log(this.tableData);
      });
    },
  },
  created() {
    // 初始化渲染列表
    this.listChange();
    //初始化获取分类
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
  // border: 1px solid #ccc;
  // padding: 20px 0;
  h2 {
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    text-indent: 10px;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand,
  .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
}
</style>