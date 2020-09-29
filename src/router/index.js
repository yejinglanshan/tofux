import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import moment from "moment";
// import { api_userchecktoken } from "../apis/apis";
// import { format } from "core-js/fn/date";
Vue.prototype.$moment = moment;
Vue.use(VueRouter);

const routes = [
  //一级路由-登录
  {
    path: "/",
    name: "login",
    component: Login,
  },
  //二级路由-导航
  {
    path: "/nav",
    name: "nav",
    component: () => import(/* webpackChunkName: "about" */ "../views/Nav.vue"),
    children: [
      //三级路由
      //导航-首页
      {
        path: "/nav/Main",
        name: "main",
        component: () => import("../views/nav/Main.vue"),
      },
      //导航-订单管理
      {
        path: "/nav/Order",
        name: "order",
        component: () => import("../views/nav/Order.vue"),
      },
      //导航-商品列表
      {
        path: "/nav/itemList",
        name: "itemList",
        component: () => import("../views/nav/ItemList.vue"),
      },

      //导航-商品添加
      {
        path: "/nav/itemAdd",
        name: "itemAdd",
        component: () => import("../views/nav/ItemAdd.vue"),
      },
      //导航-商品分类
      {
        path: "/nav/itemSort",
        name: "itemSort",
        component: () => import("../views/nav/ItemSort.vue"),
      },
      {
        path: "/nav/StoreManagement",
        name: "StoreManagement",
        component: () => import("../views/nav/StoreManagement.vue"),
      },
      //导航-账号列表
      {
        path: "/nav/accountList",
        name: "accountList",
        component: () => import("../views/nav/AccountList.vue"),
      },
      //导航-账号添加
      {
        path: "/nav/accountAdd",
        name: "accountAdd",
        component: () => import("../views/nav/AccountAdd.vue"),
      },
      //导航-修改密码
      {
        path: "/nav/accountPassword",
        name: "accountPassword",
        component: () => import("../views/nav/AccountPassword.vue"),
      },
      //导航-销售统计
      {
        path: "/nav/commodityStatistics",
        name: "commodityStatistics",
        component: () => import("../views/nav/CommodityStatistics.vue"),
      },
      //导航-订单统计
      {
        path: "/nav/orderStatistics",
        name: "OrderStatistics",
        component: () => import("../views/nav/OrderStatistics.vue"),
      },
      //个人信息
      {
        path: "/nav/Accinfo",
        name: "Accinfo",
        component: () => import("../views/nav/Accinfo"),
      },
    ],
  },
];

const router = new VueRouter({
  // mode: 'history',//历史模式化   ，hash模式
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.path === '/') return next ()
  const tokenStr = localStorage.token
  if(!tokenStr) return next('/')
  next()
});
export default router;
