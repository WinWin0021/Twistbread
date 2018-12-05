import React,{Component} from "react";
import css from './nav.module.scss';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import { Menu, Dropdown, Icon } from 'antd';

class Nav extends Component{
	constructor(props){
		super(props);
		this.state={
			navList:[],
			isHover:false,
			childrenList:[]
		}
	}

	render(){
		return <div id={css.Nav}>
			<div className='container'>
				<ul>
					{
						this.state.navList.map((item)=>{
							return <li  className="ant-dropdown-link"  key={item.gc_id} onClick={this.handelClick.bind(this,item.gc_id)} 
							onMouseOver={this.onMouseOver.bind(this,item.gc_id,item)}
							onMouseOut={this.onMouseOut.bind(this)}  >
									<NavLink to='/category' replace activeClassName="active_lrx">
										<img src={item.pc_icon} alt=""/>
										<p className={this.state.isHover&&this.state.id===item.gc_id?css.liHover:''}>{item.gc_name}</p>
									</NavLink>
				 					
								</li>
									
						   				
						})
					}

					 <li className={css.last}><NavLink to='/category' activeClassName="active_lrx">
					 		<i></i>
							<p >化妆教学(收费)</p>
					 	</NavLink>
					 </li>

				</ul>
				
			</div>
			<Menu>
									{
										this.state.childrenList.map((item)=>{
											return <Menu.Item>
												      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">{item.gc_name}</a>
												    </Menu.Item>
												    
												 
										})
									} 
									 </Menu>
		</div>
	}



	componentWillMount(){
		axios.get('/pc/pcIndex/class').then(res=>{
			// console.log(res.data.goodsClass)
			this.setState({
				navList:res.data.goodsClass,
				// childrenList:this.state.navList.childrenList
			})
		})
	}


	handelClick(item){
		this.props.NavListidReducer(item);
	}
	onMouseOver(id,item){
		this.setState({
			isHover:true,
			id:id,
			childrenList:item.children
		})
		// console.log(id,item.children)

	}

	onMouseOut(){
		this.setState({
			isHover:false,
			isHoverLast:true
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