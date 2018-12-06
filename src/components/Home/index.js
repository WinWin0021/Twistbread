import React,{Component} from "react";
import {NavLink} from 'react-router-dom';
import css from './home.module.scss';
import './home.scss';
import Swiper from 'swiper';
import axios from 'axios';
import {connect} from 'react-redux';
class Home extends Component{
	constructor(props){
		super(props);
		this.state={
			swiperList:[],
			hongrenlist:[]

		}
	}
	render(){
		return <div id={css.Home}>
			{/*轮播*/}
			<div className="container" id={css.homebox}>
				<div id="swiper1" className="swiper-container" style={{width:'600px',height:'450px',margin:'0',borderRadius:'10px'}}>
			    <div className="swiper-wrapper" >
			      {
			      	this.state.swiperList.map((item)=>{
			      		return <div className="swiper-slide"  id={css.swiper} key={item.hongren_info.uid}>
							<img src={item.ad_image} className={css.swiperImg}/>
			      		</div>
			      	})
			      }
			    </div>
			    {/*<!-- Add Pagination -->*/}
			    {/*<div className="swiper-pagination"></div>*/}
			 	 {/*  <!-- Add Arrows -->*/}
			    <div className="swiper-button-next swiper-button-white"></div>
			    <div className="swiper-button-prev swiper-button-white"></div>
			  </div>
			</div>

			{/*人气红人*/}
			<div className="container" id={css.hongren}>
				<div className={css.hongrentitle}>
					<h2>人气红人</h2>
					<NavLink to='/hongren/list'>查看更多</NavLink>
				</div>
				<div className={css.hongrenlist}>
					<div className="swiper-container" id="swiper2">
					    <div className="swiper-wrapper">
					      
					      {
					      	this.state.hongrenlist.map(item=>{
					      		return <div className="swiper-slide" key={item.hongren_info.uid}>
									<img src={item.ad_image} alt="" onClick={this.handelClick.bind(this,item.hongren_info.uid)} />
					      		</div>
					      	})
					      }
					    </div>
					  </div>
				</div>
			</div>	
		</div>
	}

	componentDidMount(){
		this.props.NavIsShow()
		axios.get('/pc/pcIndex/recHot').then(res=>{
			// console.log(res.data.ad);
			this.setState({
				swiperList:res.data.ad.pc_index_carousel,
				hongrenlist:res.data.ad.pc_hongren_rec
			},()=>{new Swiper('#swiper1', {
			      slidesPerView: 1,
			      spaceBetween: 30,
			      loop: true,
			      pagination: {
			        el: '.swiper-pagination',
			        clickable: true,
			      },
			      navigation: {
			        nextEl: '.swiper-button-next',
			        prevEl: '.swiper-button-prev',
		      }
		    });
				new Swiper('#swiper2', {
			      slidesPerView: 5,
			      spaceBetween: 10,
			      pagination: {
			        el: '.swiper-pagination',
			        clickable: true,
			      },
			    });
			}
		    )
		})
	}
	handelClick(id){
		this.props.history.push('/hongren');
		this.props.hongrenId(id)
	}
}


export default connect(null,{
	NavIsShow(){
		return{
			type:"HideNav",
			payload:true
		}
	},
	hongrenId(id){
		return{
			type:'hongrenId',
			payload:id
		}
	}
})(Home);