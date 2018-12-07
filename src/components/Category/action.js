const action = {
	toDetailReducer(id){
		console.log(id)
		return {
			type:'toDetail',
			payload:id
		}
	},

	hidenave(){
		return{
		type:"HideNav",
		payload:true}
	}
}

export default action