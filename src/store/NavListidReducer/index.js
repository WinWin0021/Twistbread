const NavListidReducer = (prevStage=true,action={})=>{
	let {type,payload} = action;
	switch (type) {
		case 'navId':
			return payload;
		
		default:
			return prevStage;
	}
}
export default NavListidReducer;