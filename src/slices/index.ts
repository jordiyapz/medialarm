import { combineReducers } from "@reduxjs/toolkit";
import { default as counterReducer } from "./counter";
import { default as alarmsReducer } from "./alarms";

export { counterReducer };

export const rootReducer = combineReducers({
  counter: counterReducer,
  alarms: alarmsReducer,
});
