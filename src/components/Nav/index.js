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
			childrenList:[],
			secondList:true
		}
	}

	render(){
		return <div id={css.Nav} >
			<div className='container' id={css.list}>
				<ul className={css.clear}>
					{
						this.state.navList.map((item)=>{
							return <li  className="ant-dropdown-link"  key={item.gc_id} onClick={(e)=>this.handelClick.bind(this,item.gc_id,e)} 
							onMouseOver={this.onMouseOver.bind(this,item.gc_id,item)}
							onMouseOut={this.onMouseOut.bind(this)}  >
									<NavLink to='/category' replace activeClassName="active_lrx" className={css.box}>
										<img src={item.pc_icon} alt=""/>
										<p className={this.state.isHover&&this.state.id===item.gc_id?css.liHover:''}>{item.gc_name}</p>
									</NavLink>
									{
										this.state.id===item.gc_id?
										<Menu className={this.state.secondList?css.menu:css.display}
										      onMouseOut={this.navMouseout.bind(this)}
										  >
											{
												this.state.childrenList.map((item)=>{
													return <Menu.Item key={item.gc_id} className={css.list} onClick={this.navHandleClick.bind(this,item)}>
														      <NavLink replace to='/category' rel="noopener noreferrer" href="#">{item.gc_name}</NavLink>
														    </Menu.Item>		 
												})
											} 
										</Menu>:''
									}
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
			
		</div>
	}



	componentWillMount(){
		axios.get('/pc/pcIndex/class').then(res=>{
			// console.log(res.data.goodsClass)
			this.setState({
				navList:res.data.goodsClass,
			})
		})
	}


	handelClick(item,e){
		this.props.NavListidReducer(item);
		e.stopPropagation();
		// item.nativeEvent.stopImmediatePropagation();
		console.log(item);
	}
	onMouseOver(id,item){
		this.setState({
			isHover:true,
			id:id,
			childrenList:item.children,
			secondList:true
		})

	}

	onMouseOut(){
		this.setState({
			isHover:false,
			isHoverLast:true,
			secondList:false
		})
	}
	navMouseout(){
		this.setState({
			secondList:false
		})
	}
	navHandleClick(item){
		console.log(item.gc_id)
	}
}


export default connect(null,{
	NavListidReducer(item){
		return {
			type:'navId',
			payload:item
		}
	},
	NavNotShowReducer(){
		return {
			type:'navNotShow',
			payload:false
		}
	},
	NavShowReducer(){
		return {
			type:'navIsShow',
			payload:true
		}
	}
})( Nav)