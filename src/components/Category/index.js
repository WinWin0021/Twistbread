import React,{Component} from "react";
import css from "./index.module.scss";
import axios from "axios";
import {NavLink} from "react-router-dom"
import {connect} from 'react-redux';
import action from './action.js'

class Category extends Component{
	constructor(props){
		super(props);
		this.state={
			
			goodlist:[],
			current:0,
			offset:0,
			goodscount:0,
			allgoodslist:[],
			towcurrent:0,
			twolist:null	
		}
	}

	render(){
		return<div className={css.Category}>
			<div className={css.categorylist}>
				<div className={css.categorylist2}>品类</div>
				<ul>
					<li className={css.categorylist1}  onClick={this.handleClick1.bind(this)}><span>全部</span></li>
					
					{
						this.props.lrx.children!==0?
						this.props.lrx.children.map((item,index)=>
							<li key={item.gc_id} onClick={this.handleClick.bind(this,index)}>
								<span>{item.gc_name}</span>
							</li>		
						):this.state.twolist?
						this.state.twolist.map((item,index)=>
							<li key={item.gc_id} onClick={this.handleClick.bind(this,index)}>
								<span>{item.gc_name}</span>
							</li>		
						):null
					}
					
				</ul>
			</div>
			<div className={css.goods}>
				<ul>
					{this.state.goodlist.map((item,index)=>
						<li key={item.goods_id}>
							<div className={css.imgdiv}>
								<img onClick = {this.toDetail.bind(this,item.goods_id)} src={item.goods_image}/>
								<div className={css.goodspan}>{item.goods_desc}</div>
								<div className={css.goodspan1}>{item.goods_name}</div>
								<div className={css.price}>
									<span className={css.price1}>￥{item.goods_price}</span>
									{
										item.goods_marketprice===null?
										<span className={css.price2}>￥{(item.goods_price/(item.goods_discount/10))}</span>
										:<span className={css.price2}>￥{item.goods_marketprice}</span>
									}
								</div>
							</div>
						</li>
					)}
				</ul>

				<p className={css.moredata}>没有更多数据了</p>
			</div>
		</div>
	}
	handleClick1(){
		axios.get(`/pc/goods/gcGoods?gc_id=${this.props.lrx.id}&limit=15&offset=0`).then(res=>{
			this.setState({
				goodlist:res.data.goods_info,
				goodscount:res.data.allCount

			})
		})

	}

	toDetail(id){
		this.props.history.push('goods/detail')
		this.props.toDetailReducer(id)
	}
	

	handleClick(index){
		/*点击发送Ajax请求详细的一列*/

		if(this.props.lrx.children===0){

			axios.get(`/pc/goods/gcGoods?gc_id=${this.state.twolist[index].gc_id}&limit=15&offset=0`).then(res=>{
				this.setState({
					goodlist:res.data.goods_info,
					goodscount:res.data.allCount,
					current:index
				})
				
		})


			
		}else{
			axios.get(`/pc/goods/gcGoods?gc_id=${this.props.lrx.children[index].gc_id}&limit=15&offset=0`).then(res=>{
				this.setState({
					goodlist:res.data.goods_info,
					goodscount:res.data.allCount,
					current:index
				})
				
		})

		}
		
		
	}

	componentWillReceiveProps(nextprops){
		/*懒加载*/
		window.onscroll=()=>{
			if(this.state.goodscount>=this.state.offset){
			if((window.innerHeight+document.documentElement.scrollTop)>=document.documentElement.
				scrollHeight){
				this.setState({
					offset:this.state.offset+15
				})


				if(this.props.lrx.children!==0){
				axios.get(`/pc/goods/gcGoods?gc_id=${nextprops.lrx.id}&limit=15&offset=${this.state.offset}`)
				.then(res=>{
					this.setState({
						goodlist:[...this.state.goodlist,...res.data.goods_info]
						})
					})
				}else{
					axios.get(`/pc/goods/gcGoods?gc_id=${nextprops.lrx.parentId}&limit=15&offset=${this.state.offset}`)
					.then(res=>{
					this.setState({
						goodlist:[...this.state.goodlist,...res.data.goods_info]
							})
						})
					}
				}
			}
		}


		


		
		if(nextprops.lrx.children!==0){
			
			axios.get(`/pc/goods/gcGoods?gc_id=${nextprops.lrx.id}&limit=15&offset=0`).then(res=>{
			this.setState({
				goodlist:res.data.goods_info,
				goodscount:res.data.allCount
			})
		})}else{
				axios.get(`/pc/goods/gcGoods?gc_id=${nextprops.lrx.parentId}&limit=15&offset=0`).then(res=>{
			this.setState({
				goodlist:res.data.goods_info,
				goodscount:res.data.allCount

			})
		})
			axios.get("/pc/pcIndex/class").then(res=>{
			this.setState({
				allgoodslist:res.data.goodsClass
			})

			let secondlsit = this.state.allgoodslist.find((item)=>{
				return item.gc_id === this.props.lrx.selfId
			})

			this.setState({
				twolist :secondlsit.children
			})
			console.log(this.state.twolist)
			})

		}
		




	}

	componentWillMount(){
		 this.props.hidenave();

	}
	componentDidMount(){

		/*懒加载*/
		window.onscroll=()=>{
			if(this.state.goodscount>=this.state.offset){
			if((window.innerHeight+document.documentElement.scrollTop)>=document.documentElement.
				scrollHeight){
				this.setState({
					offset:this.state.offset+15
				})


				if(this.props.lrx.children!==0){
				axios.get(`/pc/goods/gcGoods?gc_id=${this.props.lrx.id}&limit=15&offset=${this.state.offset}`)
				.then(res=>{
					this.setState({
						goodlist:[...this.state.goodlist,...res.data.goods_info]
						})
					})
				}else{
					axios.get(`/pc/goods/gcGoods?gc_id=${this.props.lrx.parentId}&limit=15&offset=${this.state.offset}`)
					.then(res=>{
					this.setState({
						goodlist:[...this.state.goodlist,...res.data.goods_info]
							})
						})
					}
				}
			}
		}


		/*一进入到页面，加载全部*/
		if(this.props.lrx.children!==0){
			/*点一级*/
			
			axios.get(`/pc/goods/gcGoods?gc_id=${this.props.lrx.id}&limit=15&offset=0`).then(res=>{
			this.setState({
				goodlist:res.data.goods_info,
				goodscount:res.data.allCount

			})
		})
		}else{


			/*请求二级菜单*/
			axios.get("/pc/pcIndex/class").then(res=>{
			this.setState({
				allgoodslist:res.data.goodsClass
			})

			let secondlsit = this.state.allgoodslist.find((item)=>{
				return item.gc_id === this.props.lrx.selfId
			})

			this.setState({
				twolist :secondlsit.children
				})
			})
			axios.get(`/pc/goods/gcGoods?gc_id=${this.props.lrx.parentId}&limit=15&offset=0`).then(res=>{
			this.setState({
				goodlist:res.data.goods_info,
				goodscount:res.data.allCount

			})

		})	
		}	

	}

}
export default connect((state)=>{
	
	return {
		lrx:state.NavListidReducer
	}
},action)(Category);

