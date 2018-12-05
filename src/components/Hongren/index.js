import React,{Component} from "react";
import css from "./index.module.scss";
import axios from "axios";
import Swiper from "Swiper";
import "swiper/dist/css/swiper.css";
class Hongren extends Component{
	constructor(props){
		super(props);
		this.state={
			user_sex:null,
			hot_video:[],
			hot_goods:[],
			hongrenInfo:null,
			class_info:[],
			brand_info:[],
			isShow:false,
			goods_info:[]
		}
	}
	render(){
		return <div id={css.Hongren}>
			{
				this.state.user_sex?
					<div className={css.hongrenHead}>
						<div className={css.hongrenHeadBackground}>
							<div className={css.hongrenAvatar}>
								<img src={this.state.user_sex.user_avatar}/>
							</div>
							<div className={css.hongrenInfo}>
								<div className={css.hongrenItem1}>
									<div className={css.hongrenName}>{this.state.user_sex.user_name}</div>
									<div className={css.hongrenAttention}>+关注</div>
								</div>
								<div className={css.hongrenItem2}>
									<div className={css.hongrenStore}>小铺号：{this.state.user_sex.hongren_number}</div>
									<div className={css.fansNum}>粉丝：{this.state.user_sex.fcount}</div>
								</div>
							</div>
						</div>
					</div>
				:null
			}
				<div className={css.mainBody}>
					<div className={css.hotSeries1}>
						<h3>热门视频</h3>
						<div className={css.hotVideoList}>
						{
							this.state.hot_video.map(item=>
								<div className={css.hotVideoItem} key={item.video_id}>
									<a>
										<img src={item.image_url} alt=""/>
										<div className={css.icon}>
											<span>{item.video_length}</span>
										</div>
									</a>
									<div className={css.hotVideoName}>{item.video_title}</div>
									<div className={css.relatedProducts}>相关商品：{item.video_goods_num}</div>
								</div>
							)
						}	
						</div>	
					</div>
					<div className={css.hotSeries2}>
						<h3>热门宝贝</h3>
						<div className="swiper-container">
						    <div className="swiper-wrapper">
						    	{
						    		this.state.hot_goods.map((item,Myindex)=>
						    			<div className="swiper-slide" key={item.platform_id}>
						    				<div className={css.hotGoodsItemBox}>
						    					<div className={css.hotGoodsImage}>
						    						<div className={css.hotIndex}>Top{Myindex+1}</div>
						    						<img src={item.goods_image}/>
						    					</div>
						    					<div className={css.hotGoodsInfo}>
						    						<div className={css.hotGoodsDesc}>{item.goods_desc}</div>
						    						<div className={css.hotGoodsName}>{item.goods_name}</div>
						    						<div className={css.specification}>规格 {item.goods_spec}</div>
						    						<div className={css.goodsPrice}>
						    							<div className={css.hjPrice}>￥{item.goods_price}</div>
						    							<div className={css.marketPrice}>￥{item.goods_marketprice}</div>
						    						</div>
						    					</div>
						    				</div>
						    			</div>
						    		)
						    	}
						       
						    </div>
						</div>
					</div>
					<div className={css.allGoods}>
						{
							this.state.hongrenInfo?
							<h3>全部宝贝
								<span>(共{this.state.hongrenInfo.goodsCount}件)</span>
							</h3>
							:null
						}
						<div className={css.filterList}>
							<div className={css.filterList1}>
								<div className={css.classFilterList}>
									<div className={css.classFilterList1}>
										<span className={css.classTitle}>品类</span>
										<ul className={css.classTypeList}>
											<li className={css.classTypeName}>
												<span>全部</span>
											</li>
											{
												this.state.class_info.map(item=>
													<li className={css.classTypeName} key={item.gc_id}>
														<span>{item.gc_name}</span>
													</li>
												)
											}
										</ul>
									</div>
								</div>
								<div className={css.brandFilterList}>
									<div className={css.brandFilterList1}>
										<div className={css.extendAll} onClick={this.zhankai.bind(this)}>展开全部</div>
										<span className={css.brandTitle}>品牌</span>
										<div className={css.brandTypeList}  style={this.state.isShow?{ height: 150 }:{height :50}}>
											<ul className={css.brandTypeUl}>
												<li className={css.brandTypeName}>
													<span>全部</span>
												</li>
												{
													this.state.brand_info.map(item=>
														<li className={css.brandTypeName} key={item.brand_id}>
															<span>{item.brand_name}</span>
														</li>
													)
												}
											</ul>
										</div>
									</div>
								</div>
							</div>	
						</div>
						<ul className={css.goodsItemList}>
							{
								this.state.goods_info.map(item=>
									<li className={css.goodsItem} key={item.platform_id}>
										<div className={css.goodsItem1}>
											<div className={css.goodsImageBox}>
												<img src={item.goods_image}/>
											</div>
											<div className={css.goodsDesc}>{item.goods_desc}</div>
											<div className={css.goodsName}>{item.goods_name}</div>
											<div className={css.goodsPriceBox}>
												<span className={css.goodsPrice}>￥{item.goods_price}</span>
												<span className={css.goodsMarketprice}>￥{item.goods_marketprice}</span>
											</div>
										</div>
									</li>
								)
							}
						</ul>
					</div>
				</div>
				<div className={css.antBackTop}>
					<span>返回</span>
				</div>
	</div>
		
}

	componentDidMount(){
		axios.get('/pc/hongren/getDetailData?hongren_uid=96029699471632').then(res=>{
			//console.log(res.data.data)
			this.setState({
				user_sex:res.data.data.hongrenInfo,
				hot_video:res.data.data.hot_video,
				hot_goods:res.data.data.hot_goods,
				hongrenInfo:res.data.data,
				class_info:res.data.data.class_info,
				brand_info:res.data.data.brand_info
			})
		})

		axios.get('/pc/hongren/hongrenGoodsList?hongren_uid=96029699471632&offset=0&limit=10').then(res=>{
			console.log(res.data.data.goods_info)
			this.setState({
				goods_info:res.data.data.goods_info
			})
		})
	}
	zhankai(){
		this.setState({
			isShow:!this.state.isShow
		})
	}
	componentDidUpdate(){
		var swiper = new Swiper('.swiper-container', {
		      slidesPerView: 3,
		      spaceBetween: 30,
		      pagination: {
		        el: '.swiper-pagination',
		        clickable: true,
		      }
		    });
	}
}
//https://www.huajuanmall.com/pc/hongren/getDetailData?hongren_uid=96029699471632

export default Hongren;