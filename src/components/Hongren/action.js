const action={
	toDetailReducer(id){
		return {
			type:'toDetail',
			payload:id
		}
	},
	NavIsShow(){
		return{
			type:"HideNav",
			payload:false
		}
	}
}
export default action;