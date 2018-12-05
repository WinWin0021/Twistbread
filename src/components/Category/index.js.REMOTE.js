import React,{Component} from "react";
import {connect} from 'react-redux';

class Category extends Component{
	render(){
		return <div id="Category">
			Category
			{this.props.lrx}
		</div>
	}
	
}


export default connect((state)=>{
	// console.log(state.NavListidReducer)
	return {
		lrx:state.NavListidReducer
	}
})(Category);