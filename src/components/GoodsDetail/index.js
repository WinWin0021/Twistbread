import React,{Component} from "react";
import axios from 'axios'
import  './GoodsDetail.scss'

class GoodsDetail extends Component{
	constructor(props){
		super(props);
		this.state = {
			videoUrl:null,
			index :0,
			goodsInfo:null,
			count:1
		}
	}
	render(){
		return <div id="GoodsDetail">
		{	this.state.videoUrl?
			<div className = 'hm-content'>
				<div className = 'hm-left'>
					<div className = 'hm-screen'>
						<video className = 'hm-video1 hm-video' src={this.state.videoUrl[this.state.index].video_url } controls></video>
					</div>
					<div className = 'hm-videoimg'>
						<div className = 'hm-imginner'>
						{this.state.videoUrl.map((item,index)=>{
							return (
								<div  key = {item.video_id} className = 'hm-imgitem'>
								<img onClick = {this.changeViedo.bind(this,index)} src={item.image_url} alt=""/>
								<span className = 'hm-videotext'>{item.video_type_cn}</span>	
								</div>
								)
						})}
						</div>
					</div>
				</div>
				<div className = 'hm-mid'>
					<div className = 'hm-midtop'>
						<p className = 'hm-title'>{this.state.goodsInfo.goods_desc}</p>
						<p className = 'hm-goodname'>{this.state.goodsInfo.goods_name}</p>
						<p className = 'hm-good-detail'>
							<span  className = 'hm-current-price'>{this.state.goodsInfo.current_price_txt}</span>
							<span className = 'hm-goodprice'>￥{this.state.goodsInfo.goods_price}</span>
							<span className = 'hm-markprice'>市场价 {this.state.goodsInfo.goods_marketprice}</span>
						</p>
						<p className = 'hm-goodspec'>规格  {this.state.goodsInfo.goods_spec}</p>
					</div>
					<div className = 'hm-buttongroup'>
						<div className ='hm-count'>
							<button onClick = {this.minus.bind(this)} className = 'hm-minus hm-button'>-</button>
							<span  ref='count' className = 'hm-number'>{this.state.count}</span>
							<button onClick = {this.add.bind(this)} className = 'hm-add hm-button'>+</button>
						</div>
						<div className = 'hm-cartgroup'>	
							<button className = 'hm-addcart'>加入购物车</button>
						</div>
						<div className = 'hm-collection'>
							<i></i><span>收藏</span>
						</div>
					</div>
				</div>
				<div className = 'hm-hongren'></div>
			</div>
			:null
		}
			hahahahahahahah!!!!!
			气死刘海敏!!!!!!!!
		</div>
	}

	componentDidMount(){
		axios.get('/pc/goods/getGoodsDetail?goods_id=1321481').then(res=>{
			console.log()
			this.setState({
				videoUrl : res.data.videos,
				goodsInfo :res.data.goodsInfo
			})
			console.log(this.state.videoUrl[0].video_url)
		})
	}

	changeViedo(index){
		console.log(index)
			this.setState({
				index:index
			})
	}

	minus(){
		if (this.state.count === 1) {
			console.log(1)
		}else{
			this.setState({
				count:this.state.count - 1 
			})
		}
	}

	add(){
		this.setState({
			count:this.state.count + 1
		})
	}

	
}


export default GoodsDetail;