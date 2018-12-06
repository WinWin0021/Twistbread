const NavListidReducer = (prevStage=0,action={})=>{
	let {type,payload} = action;
	switch (type) {
		case 'navId':
			return payload;
		case 'navNotShow':
			return payload;
		case  'navIsShow':
			return payload;
		default:
			return prevStage;
	}
}
export default NavListidReducer;