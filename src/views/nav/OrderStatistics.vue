<template>
  <div>
    <el-card>
      订单统计
      <div class="block">
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
        <el-button @click="c"></el-button>
      </div>
      <div id="myecharts" style="width: 100%; height: 500px;margin-top:50px"></div>
    </el-card>
  </div>
</template>

<script>
import { api_o } from "../../apis/apis";
import echarts from "echarts";
export default {
  data() {
    return {
      value1: [new Date("2019-11-17"), new Date()],
      value2: "",
      data: [],
      money: [],
    };
  },
  methods: {
    c() {
      console.log(this.value2);
    },
  },
  mounted() {
    this.value2 = JSON.stringify([
      this.$moment(this.value1[0]).format("YYYY-MM-DD HH:mm:ss"),
      this.$moment(this.value1[1]).format("YYYY-MM-DD HH:mm:ss"),
    ]);
    var eobj = echarts.init(document.querySelector("#myecharts"),"light");

    api_o({ params: { date: this.value2 } }).then((res) => {
      this.data = res.data.data.map((obj) => {
        return (obj.orderTime = this.$moment(obj.orderTime).format("MM-DD  "));
      });
      this.money = res.data.data.map((obj) => {
        return obj.orderAmount;
      });
      var option = {
        title: {
          text: "订单统计报表",
          left:'left'
        },
         legend: {
        data: ['金额',"日期"],
       
    },
        xAxis: {
          name:"日期",
          type: "category",
          data: this.data,
        },
        yAxis: {
          type: "value",
        },
        tooltip : {      
            axisPointer: {
              label: {
                backgroundColor: '#6a7985'
              }
            },
          },

        series: [
          {
            name:"金额",
            data: this.money,
            type: "bar",
            showBackground: true,
            backgroundStyle: {
             color: 'rgba(220, 220, 220, 0.8)'
            },
            
          },
        ],
      };
      eobj.setOption(option);
    });
  },
};
</script>

<style lang="scss" scoped>
</style>