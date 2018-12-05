import React,{Component} from "react";
import css from './header.module.scss';
import '../../App.css';
import {NavLink} from 'react-router-dom';
class Head extends Component{
	render(){
		return <div id={css.Head}>
			<div id={css.headtop} >
				<div className="container">
					<p><NavLink to="/home" className={css.home}><span className="iconfont icon-shouye"></span>首页</NavLink></p>
					<ul>
						<li className={css.color}>Hi! 花卷商城欢迎你~</li>
						<li ><NavLink to="/login" replace>登陆</NavLink></li>
						<li className="line">|</li>
						<li><a href="https://m.huajuanmall.com/"><span className="iconfont icon-shouji01 color"></span>花卷app下载</a></li>
					</ul>
				</div>
			</div>
			<div id={css.box}>
				<div className="container">
					<a href="#" className={css.logo}>
						<img src="/headerimg/logo.jpg"/>
						<p className={css.logo}>花卷</p>
						<p className={css.text}>红人视频购物商城</p>
					</a>
					<div className={css.input}>
						<input placeholder="请输入想找的红人或商品" />
						<span className="iconfont icon-sousuo"></span>
					</div>
					<div className={css.cart}>
						<NavLink to="/cart" replace><span className="iconfont icon-ai-cart"></span>我的购物车</NavLink>
					</div>
				</div>
			</div>
		</div>
	}
}


export default Head;