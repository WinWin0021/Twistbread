import NavListidReducer from './NavListidReducer/';
import toDetailReducer from './toDetailReducer/'
import {combineReducers,createStore} from 'redux';
const reducer = combineReducers({
	NavListidReducer,
	toDetailReducer
})
const store = createStore(reducer);
export default store;