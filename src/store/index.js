import NavListidReducer from './NavListidReducer/';
import {combineReducers,createStore} from 'redux';
const reducer = combineReducers({
	NavListidReducer
})
const store = createStore(reducer);
export default store;