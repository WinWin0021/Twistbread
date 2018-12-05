const action = {
	toDetailReducer(id){
		console.log(id)
		return {
			type:'toDetail',
			payload:id
		}
	}
}

export default action