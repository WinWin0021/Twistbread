import NavListidReducer from './NavListidReducer/';
import toDetailReducer from './toDetailReducer/';
import NavHideReducer from './NavHideReducer';
import hongrenReducer from './toHongrenReducer/';
import {combineReducers,createStore} from 'redux';
const reducer = combineReducers({
	NavListidReducer,
	toDetailReducer,
	NavHideReducer,
	hongrenReducer
})
const store = createStore(reducer);
export default store;