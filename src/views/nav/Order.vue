<template>
  <div class="wrap">
    <el-card>
      <label for="number">
        <span>订单号</span>
        <el-input id="number" v-model="orderNo" placeholder="订单号"></el-input>
      </label>
      <label for=" consignee">
        <span>收货人</span>
        <el-input v-model="consignee" placeholder="收货人"></el-input>
      </label>
      <label for=" phone">
        <span>手机号</span>
        <el-input v-model="phone" placeholder="手机号"></el-input>
      </label>
      <label for=" active">
        <span>订单状态</span>
        <el-select placeholder="订单状态" v-model="selected">
          <el-option
            v-for="(item, index) in options"
            :key="index"
            v-model="options[index]"
          ></el-option>
        </el-select>
      </label>
      <br />
      <label for="active">
        <span>选择时间</span>
        <el-date-picker
          v-model="value1"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </label>
      <el-button type="primary" @click="search">查询</el-button>
      <el-button type="primary" @click="searchr">查</el-button>
      <!-- 表格 -->
      <div>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column fixed prop="orderNo" label="订单号" width="150">
          </el-table-column>
          <el-table-column
            fixed
            prop="deliveryTime"
            label="下单时间"
            width="150"
          >
          </el-table-column>
          <el-table-column prop="phone" label="手机号" width="120">
          </el-table-column>
          <el-table-column prop="consignee" label="收货人" width="120">
          </el-table-column>
          <el-table-column prop="deliverAddress" label="配送地址" width="300">
          </el-table-column>
          <el-table-column prop="orderTime" label="送达时间" width="120">
          </el-table-column>
          <el-table-column prop="remarks" label="用户备注" width="120">
          </el-table-column>
          <el-table-column prop="orderAmount" label="订单金额" width="120">
          </el-table-column>
          <el-table-column prop="orderState" label="订单状态" width="120">
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >编辑</el-button
              >
              <el-button @click="handleLook(scope.row)" type="text" size="small"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <!-- 分页 -->
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
      </div>
      <!-- 编辑模态框 -->
      <el-dialog title="收货地址" :visible.sync="moduledit">
        <span>订单号</span>
        <el-input v-model="moduleDate.orderNo"></el-input>
        <span>下单时间</span>
        <el-input v-model="moduleDate.deliveryTime"></el-input>
        <span>手机号</span>
        <el-input v-model="moduleDate.phone"></el-input>
        <span>收货人</span>
        <el-input v-model="moduleDate.consignee"></el-input>
        <span>配送地址</span>
        <el-input v-model="moduleDate.deliverAddress"></el-input>
        <span>送达时间</span>
        <el-input v-model="moduleDate.orderTime"></el-input>
        <span>用户备注</span>
        <el-input v-model="moduleDate.remarks"></el-input>
        <span>订单金额</span>
        <el-input v-model="moduleDate.consignee"></el-input>
        <span>订单状态</span>
        <el-input v-model="moduleDate.orderState"></el-input>

        <div slot="footer" class="dialog-footer">
          <el-button @click="moduledit = false">取 消</el-button>
          <el-button type="primary" @click="moudlsubmit">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 查看模态框 -->
      <el-dialog title="收货地址" :visible.sync="modulLook">
       <div style="width:200px" v-for="(item,index) in look" :key="index"> 
         <span style="width:100px;display:inline-block">ID</span>
         <span style="width:100px;display:inline-block">{{item.id}}</span>
         <span style="width:100px;margin-right:50px">姓名</span>
         <span style="width:100px">{{item.consignee}}</span>
          <span style="width:100px;margin-right:50px">订单</span>
         <span style="width:100px">{{item.orderNo}}</span>
          <span style="width:100px;margin-right:50px">电话</span>
         <span style="width:100px">{{item.phone}}</span>
          <span style="width:100px;margin-right:50px">地址</span>
         <span style="width:100px">{{item.deliverAddress}}</span>
          <span style="width:100px;margin-right:50px">备注</span>
         <span style="width:100px">{{item.remarks}}</span>
          <span style="width:100px;margin-right:50px">订单状态</span>
         <span style="width:100px">{{item.orderState}}</span>
       </div>
        <!-- <div slot="footer" class="dialog-footer">
          <el-button @click="moduledit = false">取 消</el-button>
          <el-button type="primary" @click="moudlsubmit">确 定</el-button>
        </div> -->
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { api_orderlist, api_orderedit, api_orderdetail } from "../../apis/apis";
export default {
  data() {
    return {
      modulLook: false, //查看模态框
      moduledit: false, //编辑模态框
      // 分页
      currentPage: 1,
      pageSize: 6,
      total: 0,
      value1: [new Date(2019, 9, 10, 8, 40), new Date(2020, 9, 10, 9, 40)],

      // 表单数据
      tableData: [],
      moduleDate: [], //模态框数据
      //时间
      date: [],
      // 订单号
      orderNo: "",
      //收货人
      consignee: "",
      // 手机号
      phone: "",
      //选中
      selected: "",
      //订单状态
      options: ["已受理", "派送中", "已完成"],
      //编辑数据
      data: [],
      //查看数据
      look: [],
      keys:[]
    };
  },
  methods: {
    // 查看模态框
    handleLook(index) {
      this.modulLook = true;
      api_orderdetail({ params: { id: index.id } }).then((res) => {
        // for(let obj in res.data.data){
        //  this.look.push(res.data.data[obj])
        //  this.keys.push(obj)
        // }
      
         this.look.push(res.data.data)
        res
      });
   
    },
    //模态框确定
    moudlsubmit() {
      let { moduleDate } = this;
      console.log(moduleDate);
      console.log(moduleDate.orderTime);
      // this.$moment( moduleDate.orderTime).format("YYYY-MM-DD HH:mm:ss")
      api_orderedit(moduleDate).then((res) => {
        console.log(res);
      });
    },
    //编辑模态框
    handleClick(index) {
      this.moduleDate = JSON.parse(JSON.stringify(index));
      this.moduledit = true;
    },
    searchr() {
      console.log(this.datalook);
      this.date = JSON.stringify([
        this.$moment(this.value1[0]).format("YYYY-MM-DD HH:mm:ss"),
        this.$moment(this.value1[1]).format("YYYY-MM-DD HH:mm:ss"),
      ]);
    },

    //搜索数据
    search() {
      //解构
      let {orderNo,consignee,phone,selected} = this
      let newtime = JSON.stringify([
        this.$moment(this.value1[0]).format("YYYY-MM-DD HH:mm:ss"),
        this.$moment(this.value1[1]).format("YYYY-MM-DD HH:mm:ss"),
      ]);
      this.listchange({
        orderNo:orderNo,
consignee:consignee,
phone:phone,
selected:selected,
date:newtime
      })
      // api_orderlist({
      //   params: {
      //     pageSize: this.pageSize,
      //     currentPage: this.currentPage,
      //     orderNo: this.orderNo,
      //     consignee: this.consignee,
      //     phone: this.phone,
      //     orderState: this.selected,
      //     date: this.date,
      //   },
      // }).then((res) => {
      //   for (let obj of res.data.data) {
      //     obj.orderTime = this.$moment(obj.orderTime).format(
      //       "YYYY-MM-DD HH:mm:ss"
      //     );
      //     obj.deliveryTime = this.$moment(obj.deliveryTime).format(
      //       "YYYY-MM-DD HH:mm:ss"
      //     );
      //   }
      //   this.total = res.data.total;
      //   this.tableData = res.data.data;
      // });
    },

    // 分页-跳转当前页
    handleCurrentChange(index) {
      this.currentPage = index;
      this.listchange();
    },

    //分页-每页条数
    handleSizeChange(index) {
      this.pageSize = index;
      this.listchange();
    },

    //初始化渲染列表  发生接口获取列表转换时间格式
    listchange(obj={}) {
      let { pageSize, currentPage } = this;
      api_orderlist({ params: { pageSize, currentPage ,...obj} }).then((res) => {
        for (let obj of res.data.data) {
          obj.orderTime = this.$moment(obj.orderTime).format(
            "YYYY-MM-DD  HH:mm:ss"
          );
          obj.deliveryTime = this.$moment(obj.deliveryTime).format(
            "YYYY-MM-DD  HH:mm:ss"
          );
        }
        this.total = res.data.total;
        this.tableData = res.data.data;
      });
    },
  },
  created() {
    //初始化渲染列表
    this.listchange();
  },
};
</script>

<style lang="less" scoped>
.wrap {
  label {
    span {
      margin-right: 10px;
    }
    .el-input {
      margin: 10px;
      width: 260px;
      #active {
        width: 400px;
      }
    }
  }
}
</style>