import React,{Component} from "react";
import css from './home.module.scss';
import swiper from 'swiper';
import axios from 'axios';

class Home extends Component{
	constructor(props){
		super(props);
		this.state={
			datalist:[]
		}
	}
	render(){
		return <div id={css.Home}>
			home
			
		</div>
	}

	componentWillMount(){
		axios.get('/pc/pcIndex/recHot').then(res=>{
			// console.log(res.data.ad);
			this.setState({
				datalist:res.data.ad
			})
		})
	}
}


export default Home;