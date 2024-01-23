import { combineReducers } from "redux";
import pdfReducer from "./pdf.reducers";

const rootReducer = combineReducers({
  pdf: pdfReducer,
});

export default rootReducer;
