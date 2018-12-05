import React,{Component} from "react";
import css from './nav.module.scss';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';

class Nav extends Component{
	constructor(props){
		super(props);
		this.state={
			navList:[],
			isHover:false,
			id:0
		}
	}
	render(){
		return <div id={css.Nav}>
			<div className='container'>
				<ul>
					{
						this.state.navList.map((item)=>{
							return <li  key={item.gc_id} onClick={this.handelClick.bind(this,item.gc_id)} 
							onMouseOver={this.onMouseOver.bind(this,item.gc_id)}
							onMouseOut={this.onMouseOut.bind(this)} >
									<NavLink to='/category' replace activeClassName="active_lrx">
										<img src={item.pc_icon} alt=""/>
										<p className={this.state.isHover&&this.state.id===item.gc_id?css.liHover:''}>{item.gc_name}</p>
									</NavLink>
								</li>
						})
					}
					 <li onMouseOver={this.onMouseOver.bind(this)}
						 onMouseOut={this.onMouseOut.bind(this)}><NavLink to='/category' activeClassName="active_lrx">
					 		<i></i>
							<p className={this.state.isHover?css.liHover:''}>化妆教学(收费)</p>
					 	</NavLink>
					 </li>
				</ul>
			</div>
		</div>
	}

	componentWillMount(){
		axios.get('/pc/pcIndex/class').then(res=>{
			console.log(res.data.goodsClass)
			this.setState({
				navList:res.data.goodsClass
			})
		})
	}

	handelClick(item){
		this.props.NavListidReducer(item);
	}
	onMouseOver(item){
		this.setState({
			isHover:true,
			id:item
		})
	}

	onMouseOut(){
		this.setState({
			isHover:false
		})
	}
}


export default connect(null,{
	NavListidReducer(item){
		return {
			type:'navId',
			payload:item
		}
	}
})( Nav)