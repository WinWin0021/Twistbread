import React,{Component} from "react";
import css from "./index.module.scss";
import axios from "axios";
import {NavLink} from "react-router-dom"

class Category extends Component{
	constructor(props){
		super(props);
		this.state={
			alllist:[],
			goodlist:[],
			current:0,
			offset:0,
			goodscount:0

		}
	}


	render(){
		return <div className={css.Category}>
		{ /*列表头*/ }
			<div className={css.categorylist}>
			<div className={css.categorylist2}>品类</div>
				<ul>
					<li className={css.categorylist1}  onClick={this.handleClick1.bind(this)}><span>全部</span></li>
					{	this.state.alllist.map((item,index)=>
							<li key={item.gc_id} onClick={this.handleClick.bind(this,index)}>
								<span>{item.gc_name}</span>
							</li>
						)
				
					}
				</ul>
			</div>

			<div className={css.goods}>
				<ul>

					{this.state.goodlist.map((item,index)=>
						<li key={item.goods_id}>
							<div className={css.imgdiv}>
								<img src={item.goods_image}/>
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
			</div>


		</div>
	}
	handleClick1(){
		axios.get("/pc/goods/gcGoods?gc_id=9&limit=15&offset=0").then(res=>{
			//console.log(res.data.goods_info)
			this.setState({
				goodlist:res.data.goods_info,
				goodscount:res.data.allCount

			})
		})

	}
	

	handleClick(index){
		//console.log(this.state.alllist[index].gc_id)
		/*点击发送Ajax请求详细的一列*/


		axios.get(`/pc/goods/gcGoods?gc_id=${this.state.alllist[index].gc_id}&limit=15&offset=0`).then(res=>{
				this.setState({
					goodlist:res.data.goods_info,
					goodscount:res.data.allCount
				})
				//console.log(res.data)
		})

		this.setState({
			current:index
		})
		//console.log(this.state.current)
	}


	componentDidMount(){
		window.onscroll=()=>{
			
			console.log(this.state.goodscount)
			console.log(this.state.offset)
			console.log(this.state.alllist[])
			/*懒加载*/
			
			
			if(this.state.goodscount>=this.state.offset){
			if((window.innerHeight+document.documentElement.scrollTop)>=document.documentElement.scrollHeight){
				this.setState({
					offset:this.state.offset+15
				})

				axios.get(`/pc/goods/gcGoods?gc_id=9&limit=15&offset=${this.state.offset}`).then(res=>{
					this.setState({
						goodlist:[...this.state.goodlist,...res.data.goods_info]
					})
				})
			}
				
				}
		
		 	
			
		}


		/*上面的每个列表页home 配饰 护肤*/
		axios.get("/pc/pcIndex/class").then(res=>{
			this.setState({
				alllist:res.data.goodsClass[0].children
			})
		})

		/*一进入到页面，加载全部*/
		axios.get("/pc/goods/gcGoods?gc_id=9&limit=15&offset=0").then(res=>{
			//console.log(res.data.goods_info)
			this.setState({
				goodlist:res.data.goods_info,
				goodscount:res.data.allCount

			})
		})

	}

}


export default Category;

//https://www.huajuanmall.com/pc/goods/gcGoods?gc_id=9&limit=15&offset=15
//https://www.huajuanmall.com/pc/goods/gcGoods?gc_id=9&limit=15&offset=30

//https://www.huajuanmall.com/pc/goods/gcGoods?gc_id=9&limit=15&offset=45

//https://www.huajuanmall.com/pc/goods/gcGoods?gc_id=1&limit=15&offset=0
//https://www.huajuanmall.com/pc/goods/gcGoods?gc_id=1&limit=15&offset=15