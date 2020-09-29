<template>
  <el-card>
    <h1>商品分类</h1>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="id" width="180" prop="id"> </el-table-column>

      <el-table-column
        label="分类名称"
        width="180"
        prop="cateName"
      ></el-table-column>

      <el-table-column label="是否启用">
        <template slot-scope="scope">
          <el-switch disabled v-model="scope.row.state"> </el-switch>
        </template>
      </el-table-column>
      <!-- 操作 删除数据 编辑数据 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            dialogFormVisible="true"
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
      <!-- 新增 -->
      <el-table-column align="right" width="100">
        <template slot="header">
          <el-button @click="dialogFormVisible = true">新增</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[6, 12, 18, 22]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

    <!-- 新增模态框 -->
    <div>
      <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
        <el-form>
          <el-form-item label="分类名称">
            <el-input v-model="cateName"></el-input>
          </el-form-item>
          <div>是否启用</div>
          <el-switch v-model="moduleswitch"> </el-switch>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="modificationBtn">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 编辑模态框 -->
    <el-dialog title="修改商品" :visible.sync="editmodal">
      <el-form>
        <el-form-item label="">
          <el-input v-model="editmodaldata.cateName"></el-input>
        </el-form-item>
        <el-switch v-model="editmodaldata.state"></el-switch>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editmodal = false">取 消</el-button>
        <el-button type="primary" @click="clickedit">确定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import {
  api_goodscatelist,
  api_goodsdelecate,
  api_goodsaddcate,
  api_goodseditcate,
} from "../../apis/apis";
export default {
  data() {
    return {
      // 新增模态框
      dialogTableVisible: false,
      dialogFormVisible: false,
      //编辑模态框
      editmodal: false,
      editmodaldata: [],
      // 新增分类
      cateName: "",
      moduleswitch: false,
      statee: 0,
      state: 1,
      currentPage: 1,
      pageSize: 6,
      total: 0,
      tableData: [],
    };
  },
  methods: {
    //新增确认发送接口
    modificationBtn() {
      api_goodsaddcate({
        cateName: this.cateName,
        state: this.moduleswitch,
      }).then((res) => {
        console.log(res);

        if (res.data.code == 0) {
          this.$message({
            message: "数据添加成功",
            type: "success",
          });
          this.listChange();
          this.cateName = "";
          this.moduleswitch = false;
        } else {
          this.$message({
            message: "数据添加失败，请稍后再试",
            type: "warning",
          });
        }
      });
    },

    // 新增弹出模态框
    open() {
      this.$alert(
        `<template slot-scope="scope">
          <el-switch
            :active-value="1"
            :inactive-value="0"
            v-model="scope.row.state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>`,
        {
          dangerouslyUseHTMLString: true,
        }
      );
    },

    //编辑弹出模态框
    handleEdit(row, index) {
      this.editmodal = true;
      this.editmodaldata = JSON.parse(JSON.stringify(index));

      // console.log(index);
    },

    //编辑发送数据接口
    clickedit() {
      // let {editmodaldata} =this
      api_goodseditcate(this.editmodaldata).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: "数据修改成功",
            type: "success",
          });
          this.listChange();
        } else {
          this.$message({
            message: "数据修改失败，请稍后再试",
            type: "warning",
          });
        }
      });
    },

    // 删除数据
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //发送删除接口
          api_goodsdelecate({ params: { id: row.id } }).then((res) => {
            console.log(res);
            //重新发送获取分类接口 渲染页面
            let { currentPage, pageSize } = this;
            api_goodscatelist({ params: { currentPage, pageSize } }).then(
              (res) => {
                this.total = res.data.total;
                this.tableData = res.data.data;
              }
            );
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

    //每页条数
    handleSizeChange(a) {
      this.pageSize = a;
      this.listChange();
    },

    //点击翻页
    handleCurrentChange(a) {
      this.currentPage = a;
      this.listChange();
    },

    //封装渲染列表
    listChange() {
      let { currentPage, pageSize } = this;
      api_goodscatelist({ params: { currentPage, pageSize } }).then((res) => {
        //改变switch开关的值
        for (let obj of res.data.data) {
          obj.state = obj.state == 1;
        }
        this.total = res.data.total;
        this.tableData = res.data.data;
      });
    },
  },
  created() {
    //初始化渲染列表
    this.listChange();
  },
};
</script>

<style lang="scss" scoped>
</style>