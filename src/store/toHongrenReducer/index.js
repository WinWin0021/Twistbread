const hongrenReducer = (prevState=0,action={})=>{
	let {type,payload}=action;
	switch(type){
		case 'hongrenId':
			return payload;
		default :
			return prevState;
	}
}


export default hongrenReducer;