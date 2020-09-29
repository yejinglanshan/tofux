<template>
  <el-container>
    <el-aside width="200px">
      <!-- 右边导航树菜单 -->
      <el-menu
        router
        :default-active="localhash"
        unique-opened
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <div v-for="(item, index) in list" :key="index">
          <!-- 一级标题带下拉菜单 -->
          <el-submenu :index="item.index" v-if="item.children">
            <template slot="title">
              <i :class="item.i"></i>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                :index="child.index"
                v-for="child in item.children"
                :key="child.index"
                >{{ child.name }}</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <!-- 一级标题 -->
          <el-menu-item :index="item.index" v-else>
            <i :class="item.i"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </div>
      </el-menu>
    </el-aside>
    <!-- 左边 -->
    <el-container>
      <el-header>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/nav' }"
            >后台首页</el-breadcrumb-item
          >
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 头像 -->
        <div>
          <span @click="clickIndex">{{ name }}</span>

          <img :src="headersrc" alt="" @click="goUserInfo" />
        </div>
      </el-header>
      <el-main>
        <!-- 出口二级路由 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { api_accountinfo, api_userchecktoken } from "../apis/apis";
export default {
  data() {
    return {
      localhash: "",
      name: "请登录",
      headersrc: "",
      list: [
        {
          index: "/nav/main",
          i: "el-icon-s-home",
          name: "后台首页",
          userGroup: ["super", "normal"],
        },
        {
          index: "/nav/order",
          i: "el-icon-s-order",
          name: "订单管理",
          userGroup: ["super", "normal"],
        },
        {
          index: "3",
          i: "el-icon-s-goods",
          name: "商品管理",
          children: [
            {
              index: "/nav/itemList",
              i: "el-icon-location",
              name: "商品列表",
            },
            { index: "/nav/itemAdd", i: "el-icon-location", name: "商品添加" },
            { index: "/nav/itemSort", i: "el-icon-location", name: "商品分类" },
          ],
          userGroup: ["super"],
        },
        {
          index: "/nav/StoreManagement",
          i: "el-icon-s-shop",
          name: "店铺管理",
          userGroup: ["super", "normal"],
        },
        {
          index: "5",
          i: "el-icon-s-custom",
          name: "账号管理",
          children: [
            {
              index: "/nav/accountList",
              i: "el-icon-location",
              name: "账号列表",
            },
            {
              index: "/nav/accountAdd",
              i: "el-icon-location",
              name: "添加账号",
            },
            {
              index: "/nav/accountPassword",
              i: "el-icon-location",
              name: "修改密码",
            },
          ],
          userGroup: ["super"],
        },
        {
          index: "6",
          i: "el-icon-s-data",
          name: "销售统计",
          children: [
            {
              index: "/nav/commodityStatistics",
              i: "el-icon-location",
              name: "商品统计",
            },
            {
              index: "/nav/orderStatistics",
              i: "el-icon-location",
              name: "订单统计",
            },
          ],
          userGroup: ["super"],
        },
      ],
    };
  },
  methods: {
    //点击头像去个人信息
    goUserInfo() {
      if (this.$route.path == "/nav/Accinfo") return false;
      this.$router.push("/nav/Accinfo");
    },
    // 点击登录首页
    clickIndex() {
      if (!(this.name == localStorage.name)) this.$router.push("/");
    },
  },
  created() {
    // 刷新当前高亮修复
    this.localhash = this.$route.path;
    console.log(this.$route.path);

    //接受bus通知
    this.$bus.on("xxx", (imgSrc) => {
      let img = this.headersrc.substring(
        0,
        this.headersrc.lastIndexOf("/") + 1
      );
      this.headersrc = img + imgSrc;
      console.log(this.headersrc);
      console.log(img + imgSrc);
    });
    //得到用户信息
    api_accountinfo({ params: { id: localStorage.id } }).then((res) => {
      //报存数据渲染个人中心信息页面
      localStorage.name = res.data.accountInfo.account;
      localStorage.userGroup = res.data.accountInfo.userGroup;
      localStorage.ctime = this.$moment( res.data.accountInfo.ctime).format("YYYY-MM-DD HH:mm:ss");
      //更换用户头像
      this.headersrc = res.data.accountInfo.imgUrl;
    });

    //判断token是否过期
    api_userchecktoken({ params: { token: localStorage.token } }).then(
      (res) => {
        if (res.data.code == 0) this.name = localStorage.name;
      }
    );

    //权限管理  初始化根据管理员渲染列表 记得带返回值
    this.list = this.list.filter((obj) =>
      obj.userGroup.includes(localStorage.role)
    );
  },
};
</script>

<style lang="less" scoped>
@base: "#D3DCE6";
.el-container {
  height: 100%;
}
.el-header {
  background-color: #fff;
  color: #333;
  display: flex;
  justify-content: space-between;
  div {
    img {
      width: 50px;
      border-radius: 50%;
    }
  }
}

.el-aside {
  background-color: #545c64;
  color: #333;
  .el-menu {
    border: none;
  }
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
</style>