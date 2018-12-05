import React,{Component} from "react";
import css from "./index.module.scss";
import axios from "axios";
import {NavLink} from "react-router-dom"
import {connect} from 'react-redux';

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
		

		</div>
	}
	handleClick1(){

		axios.get(`/pc/goods/gcGoods?gc_id=${this.props.lrx}&limit=15&offset=0`).then(res=>{
			this.setState({
				goodlist:res.data.goods_info,
				goodscount:res.data.allCount

			})
		})

	}
	

	handleClick(index){
		/*点击发送Ajax请求详细的一列*/
		axios.get(`/pc/goods/gcGoods?gc_id=${this.state.alllist[index].gc_id}&limit=15&offset=0`).then(res=>{
				this.setState({
					goodlist:res.data.goods_info,
					goodscount:res.data.allCount
				})
				
		})

		this.setState({
			current:index
		})
		
	}
	componentWillReceiveProps(nextprops){
		// console.log(nextprops)
		axios.get(`/pc/goods/gcGoods?gc_id=${nextprops.lrx}&limit=15&offset=0`).then(res=>{
			// console.log(this.state.goodlist)
			this.setState({
				goodlist:res.data.goods_info,
				goodscount:res.data.allCount

			})
			// }
		})
	}
	



	componentDidMount(){
		window.onscroll=()=>{
			/*懒加载*/
			if(this.state.goodscount>=this.state.offset){
			if((window.innerHeight+document.documentElement.scrollTop)>=document.documentElement.scrollHeight){
				this.setState({
					offset:this.state.offset+15
				})

				axios.get(`/pc/goods/gcGoods?gc_id=${this.props.lrx}&limit=15&offset=${this.state.offset}`).then(res=>{
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
				alllist:res.data.goodsClass
			})
			// console.log(this.state.alllist)
			
		})

		/*一进入到页面，加载全部*/
		axios.get(`/pc/goods/gcGoods?gc_id=${this.props.lrx}&limit=15&offset=0`).then(res=>{
			this.setState({
				goodlist:res.data.goods_info,
				goodscount:res.data.allCount

			})
		})

	}

}





export default connect((state)=>{

	//console.log(state.NavListidReducer)
	return {
		lrx:state.NavListidReducer
	}
})(Category);

