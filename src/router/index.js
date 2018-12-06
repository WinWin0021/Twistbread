import { HashRouter as Router, Route ,Redirect,Switch } from "react-router-dom";
import React from "react";

//最外层App的容器
import App from "../App";
//首页路由
import Home from "../components/Home" ;
//种类路由
import Category from "../components/Category";
//化妆教学页路由
import ChargeTutoria from "../components/ChargeTutoria";
//视频详情页路由
import VideoDetail from "../components/VideoDetail";
//商品详情页路由
import GoodsDetail from "../components/GoodsDetail";
//购物车路由
import Cart from "../components/Cart";
//购物车下面的俩个路由
import Coulist from "../components/Cart/Coulist"
import Step2 from "../components/Cart/Step2"
//订单页路由 
import Order from "../components/Order";
//订单页下面有三个二级路由 nopayList payList goodsSendList
import NopayList from "../components/Order/GoodsSendList";//待收货
import PayList from "../components/Order/NopayList";//代付款
import GoodsSendList from "../components/Order/PayList";//代发货

//客服服务页路由
import Service from "../components/Service";
//红人页路由
import Hongren from "../components/Hongren";
//红人下面的二级路由
import List from "../components/Hongren/List";
//个人中心页路由
import User from "../components/User";
//个人中心下面有三个二级路由
import AddAddressView from "../components/User/AddAddressView";//收货地址
import Follow from "../components/User/Follow";//我的关注
import Coupon from "../components/User/Coupon";//优惠券
//搜索页路由
import SearchResult from "../components/SearchResult";
//登录页路由
import Login from "../components/Login";
import store from '../store/';
import {Provider} from 'react-redux';
const router = (
	<Provider store = {store}>
	<Router>
		<App>
			<Switch>
				<Route path="/home" component ={Home}/>
				<Route path="/category" component ={Category}/>
				<Route path="/chargeTutoria" component ={ChargeTutoria}/>
				<Route path="/video/detail" component ={VideoDetail}/>
				<Route path="/goods/detail" component ={GoodsDetail}/>
				<Route path="/cart" render={(props)=>
					<Cart {...props}>
						<Switch>
							<Route path="/cart/coulist" component ={Coulist}/>
							<Route path="/cart/step2" component ={Step2}/>
						</Switch>
					</Cart>
				}/>
				<Route path="/order"  render={(props)=>
					<Order {...props}>
						<Switch>
							<Route path="/order/nopayList" component ={NopayList}/>
							<Route path="/order/payList" component ={PayList}/>
							<Route path="/order/goodsSendList" component ={GoodsSendList}/>
						</Switch>
					</Order>
				}/>
				<Route path="/service" component ={Service}/>
				<Route path="/hongren" render={(props)=>
					<Hongren {...props}>
						<Switch>
							<Route path="/hongren/list" component ={List}/>
						</Switch>
					</Hongren>
					}/>
				<Route path="/user" render={(props)=>
					<User {...props}>
						<Switch>
							<Route path="/user/addAddressView" component ={AddAddressView}/>
							<Route path="/user/follow" component ={Follow}/>
							<Route path="/user/coupon" component ={Coupon}/>
						</Switch>
					</User>
				}/>
				<Route path="/login" component ={Login}/>
				<Route path="/search/result" component ={SearchResult}/>

				<Redirect from="/" to="/home"/>
			</Switch>
		</App>
	</Router>
	</Provider>
)




export default router;