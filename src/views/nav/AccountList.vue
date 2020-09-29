<template>
  <el-card>
    <div class="wrap">
      <h2>账号列表</h2>
      <!-- 表格 -->
      <el-table
        :data="tableData"
        @selection-change="handleSelectionChange"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="账号" prop="account"></el-table-column>
        <el-table-column label="用户组" prop="userGroup"></el-table-column>
        <el-table-column label="创建时间" prop="ctime"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="
                handleEdit(scope.$index, scope.row);
                dialogFormVisible = true;
              "
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
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3, 6, 9, 15]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <el-button type="danger" @click="clickRemove">批量删除</el-button>
    <el-button type="primary">取消选择</el-button>
    <!-- 编辑账号 -->
    <div>
      <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
        <el-form>
          <el-form-item label="活动名称">
            <el-input v-model="name"></el-input>
          </el-form-item>
          <label for="selected">
            <span>用户组</span>
            <el-select v-model="select">
              <el-option
                v-for="item in options"
                :key="item.value"
                :value="item"
              ></el-option>
            </el-select>
          </label>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="modificationBtn">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <el-button @click="c">1</el-button>
  </el-card>
</template>

<script>
import {
  api_addacc,
  api_acclist,
  api_userdel,
  api_userBatchDel,
  api_userEdit,
} from "../../apis/apis";

export default {
  data() {
    return {
      // 表格数据
      tableData: [],
      total: 0,
      //当前页
      currentPage: 1,
      //条数
      pageSize: 3,
      //批量删除
    

      // 编辑账号
        id: [],
      select: "超级管理员",
      options: ["超级管理员", "普通管理员"],
      dialogTableVisible: false,
      dialogFormVisible: false,
      amend: "",//保存的id值
      name: "",//保存的名字
    };
  },
  methods: {
    // 编辑 修改信息--待优化，验证input不为空在发送
    modificationBtn() {
      console.log(this.name, this.select, this.amend);
      let { name, select, amend } = this;
      api_userEdit({ id: amend, account: name, userGroup: select }).then(
        (res) => {
          if (res.data.code == 0) {
            this.$message({
              message: "账号修改成功",
              type: "success",
            });
            this.listchange();
          }
        }
      );
    },
    // 返回表格选中状态的数据
    handleSelectionChange(index) {
      let id = index.map((index) => index.id);
      this.id = JSON.stringify(id);
    },
    // 批量删除
    clickRemove() {
      let { id } = this;
      api_userBatchDel({ params: { ids: id } }).then((res) => {
        console.log(res.data.code);
        this.listchange();
      });
    },
    c() {
      for (let i = 0; i < 300; i++) {
        api_addacc({
          account: "路飞" + i,
          password: "123" + i,
          userGroup: i % 2 == 0 ? "超级管理员" : "普通管理员",
        });
      }
    },
    //渲染表格
    listchange() {
      let { currentPage, pageSize } = this;
      api_acclist({ params: { currentPage, pageSize } }).then((res) => {
        this.total = res.data.total;
        //改变时间格式
        let data = res.data.data;
        //遍历
        for (let obj of data) {
          let date = new Date(obj.ctime);
          obj.ctime =
            date.getFullYear() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getDate() +
            "-" +
            date.getHours() +
            ":" +
            date.getMinutes() +
            ":" +
            date.getSeconds();
        }
        this.tableData = res.data.data;
      });
    },
    //编辑事件，获取ID传入this 给接口当参数
    handleEdit(c, d) {
      this.amend = d.id;
    },

    //删除事件
    handleDelete(a, user) {
      api_userdel({ params: { id: user.id } }).then((res) => {
        if (res.data.code == 0) {
          this.listchange();
          this.$message({
            message: "账号删除成功",
            type: "success",
          });
        } else {
          this.$message({
            message: "账号删除失败",
            type: "success",
          });
        }
      });
    },
    // 分页器 条数
    handleSizeChange(num) {
      this.pageSize = num;
      this.listchange();
    },
    // 分页器 当前页
    handleCurrentChange(index) {
      this.currentPage = index;
      this.listchange();
    },
  },
  created() {
    //初始化渲染
    this.listchange();
  },
};
</script>

<style lang="less" scoped>
.wrap {
  padding-bottom: 20px;
  h2 {
    border-bottom: 1px solid #ccc;
    padding-bottom: 20px;
  }
}
</style>