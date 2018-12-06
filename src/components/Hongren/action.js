const action={
	toDetailReducer(id){
		return {
			type:'toDetail',
			payload:id
		}
	}
}
export default action;