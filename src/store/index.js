import NavListidReducer from './NavListidReducer/';
import toDetailReducer from './toDetailReducer/';
import NavHideReducer from './NavHideReducer'
import {combineReducers,createStore} from 'redux';
const reducer = combineReducers({
	NavListidReducer,
	toDetailReducer,
	NavHideReducer
})
const store = createStore(reducer);
export default store;