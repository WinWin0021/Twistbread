const NavHideReducer = (prevStage=true,action={})=>{
	let {type,payload} = action;
	switch (type) {
		case 'HideNav':
			return payload;
		default:
			return prevStage;
	}
}
export default NavHideReducer;