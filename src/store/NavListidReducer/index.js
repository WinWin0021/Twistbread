const NavListidReducer = (prevStage=0,action={})=>{
	let {type,payload} = action;
	switch (type) {
		case 'navId':
			return payload;
		default:
			return prevStage;
	}
}
export default NavListidReducer;