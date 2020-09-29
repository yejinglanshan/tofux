<template>
  <div>
    <header>
      <el-card class="head-data">
        <img src="../../assets/imgs/order.png" alt="" />
        <div>
          <p>总订单</p>
          <p>{{ data.totalOrder }}</p>
        </div>
      </el-card>
      <el-card class="head-data">
        <img src="../../assets/imgs/moneys.png" alt="" />
        <p>总销售额</p>
        <p>{{ data.totalAmount }}</p>
      </el-card>
      <el-card class="head-data">
        <img src="../../assets/imgs/totalorder.png" alt="" />
        <p>今日订单数</p>
        <p>{{ data.todayOrder }}</p>
      </el-card>
      <el-card class="head-data">
        <img src="../../assets/imgs/money.png" alt="" />
        <p>今日销售额</p>
        <p>{{ data.totayAmount }}</p>
      </el-card>
    </header>
    <section>
      <el-card>
        <div id="main" style="width: 100%; height: 400px"></div>
      </el-card>
    </section>
  </div>
</template>

<script>
import echarts from "echarts";
import { api_ordertotdata } from "../../apis/apis";
export default {
  data() {
    return {
      data: [],
      todayOrder: "",
    };
  },
  methods: {
    c() {
      console.log(this.data);
    },
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));
    //防止网卡加载动画
    myChart.showLoading();
    setTimeout(() => {
      api_ordertotdata().then((res) => {
        this.data = res.data;
        console.log(this.data);
        var option = {
          title: {
            text: "小吃联盟订单报表",
          },
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: ["金额数据", "订单数据"],
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: res.data.xData,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: "金额数据",
              type: "line",
              stack: "总量",
              data: res.data.amountData,
            },
            {
              name: "订单数据",
              type: "line",
              stack: "总量",
              data: res.data.orderData,
            },
          ],
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      });
      myChart.hideLoading();
    }, 2000);
  },
};
</script>

<style lang="less" scoped>
header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
  .head-data {
    width: 22%;
    // height: 200px;
    background-origin: 1px solid pink;
    text-align: center;
    // display: flex;
  }
}
</style>