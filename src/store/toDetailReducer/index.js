const toDetailReducer = (prevStage=0,action={})=>{
	let {type,payload} = action;
	switch (type) {
		case 'toDetail':
			return payload;
		default:
			return prevStage;
	}
}
export default NavListidReducer;