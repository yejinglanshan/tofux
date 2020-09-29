import axios from "axios"
//定义ip
axios.defaults.baseURL="http://127.0.0.1:5000"

/************************************    个人用户接口    ***************************************************/ 
//API账户登录接口
export var api_login = params=> axios.post("/users/checkLogin",params)

//API账户添加接口
export var api_addacc = params => axios.post("/users/add",params)

//API账户列表接口
export var api_acclist = params => axios.get("/users/list",params)

//API账户删除接口
export var api_userdel = params => axios.get("/users/del",params)

//API账户批量删除接口
export var api_userBatchDel = params => axios.get("/users/batchdel",params)

//API账户信息修改
export var api_userEdit = params => axios.post("/users/edit",params)

//API账户原密码匹配
export var api_usercheckoldpwd = params => axios.get("/users/checkoldpwd",params)

//API账户密码修改
export var api_usereditpwd= params => axios.post("/users/editpwd",params)

// 获取账户信息
export var api_accountinfo = params => axios.get("/users/accountinfo",params)

//API验证token
export var api_userchecktoken = params => axios.get("/users/checktoken",params)
// 头像上传

/*****************************************   商品列表      **************************************************** */
// API获取分类
export var api_goodscatelist = params =>axios.get("/goods/catelist",params)

//API修改分类
export var api_goodseditcate = params => axios.post("/goods/editcate",params)

//API删除分类
export var api_goodsdelecate = params => axios.get("/goods/delcate",params)

//API添加分类
export var api_goodsaddcate = params => axios.post("/goods/addcate",params)

//API查询所有分类
export var api_goodscategories = params => axios.get("/goods/categories",params)

//获取商品列表
export var api_goodslist = params =>axios.get("/goods/list",params)

// 添加商品
export var api_goodsadd = params => axios.post("/goods/add",params)

//API删除商品
export var api_goodsdel = params => axios.get("/goods/del",params)

//API修改商品
export var api_goodsedit = params => axios.post("/goods/edit",params)

/*******************************************     订单列表    **************************************************************/ 
//获取订单列表
export var api_orderlist = params => axios.get("/order/list",params)

//修改订单
export var api_orderedit = params => axios.post("/order/edit",params)

//查看订单
export var api_orderdetail = params => axios.get("/order/detail",params)

//获取店铺xian
export var api_shopinfo = params => axios.get("/shop/info",params)

//修改店铺
export var api_shopedit = params => axios.post("/shop/edit",params)

/***************************  报表接口 ****************************** */
//首页接口
export var api_ordertotdata = params => axios.get("/order/totaldata",params)

//订单接口
export var api_o = params => axios.get("/order/ordertotal",params)
