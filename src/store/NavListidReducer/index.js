const NavListidReducer = (prevStage=true,action={})=>{
	let {type,payload} = action;
	switch (type) {
		case 'navId':
			return payload;
		case 'navNotShow':
			return payload;
		case  'navIsShow':
			return payload;
		case  'HideNav':
			return payload;
		default:
			return prevStage;
	}
}
export default NavListidReducer;