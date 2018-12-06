import React,{Component} from "react";
import css from './home.module.scss';
import './home.scss';
import Swiper from 'swiper';
import axios from 'axios';

class Home extends Component{
	constructor(props){
		super(props);
		this.state={
			swiperList:[]
		}
	}
	render(){
		return <div id={css.Home}>
			<div className="container">
				<div className="swiper-container" style={{width:'600px',height:'450px',margin:'0',borderRadius:'10px'}}>
			    <div className="swiper-wrapper" >
			      {
			      	this.state.swiperList.map((item)=>{
			      		return <div className="swiper-slide"  id={css.swiper} key={item.hongren_info.uid}>
							<img src={item.ad_image}/>
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
			
		</div>
	}

	componentWillMount(){
		axios.get('/pc/pcIndex/recHot').then(res=>{
			// console.log(res.data.ad);
			this.setState({
				swiperList:res.data.ad.pc_index_carousel
			},()=>{new Swiper('.swiper-container', {
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
		    })}
		    )
		})


	}
}


export default Home;