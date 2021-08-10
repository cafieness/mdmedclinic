import { combineReducers } from "redux";
import user from './user';
import cart from './cart';
import orders from './orders';

const rootReducer = combineReducers({
    user, cart, orders
})

export default rootReducer