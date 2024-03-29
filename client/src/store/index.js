import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import userReducer from "./reducers/userReducer";
import productReducer from "./reducers/productReducer";
import tagsReducer from "./reducers/tagsReducer";
import categoryReducer from "./reducers/categoryReducer";
import inCartReducer from "./reducers/inCartReducer";
import wishListReducer from "./reducers/wishListReducer";
import userAddressReducer from "./reducers/userAddressReducer";
import orderReducer from "./reducers/orderReducer";
import reviewReducer from "./reducers/reviewReducer";
import alertReducer from "./reducers/alertReducer";
import vendorReducer from "./reducers/vendorReducer";
import btnReducer from "./reducers/enableBtnReducer";
import contactReducer from "./reducers/contactReducer";
import subscriberReducer from "./reducers/subscriberReducer";
import thunk from "redux-thunk";

const middlewares = [thunk];
const middlewareEnhancer = applyMiddleware(...middlewares);
const enhancers = [middlewareEnhancer];
const composedEnhancers = composeWithDevTools(...enhancers);
const rootReducer = combineReducers({
  userReducer,
  productReducer,
  tagsReducer,
  categoryReducer,
  inCartReducer,
  wishListReducer,
  userAddressReducer,
  orderReducer,
  reviewReducer,
  vendorReducer,
  alertReducer,
  btnReducer,
  contactReducer,
  subscriberReducer,
});

const store = createStore(rootReducer, composedEnhancers);

export default store;
