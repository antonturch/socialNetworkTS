import {  combineReducers, createStore } from "redux";
import {dialogReducer} from "./dialog-reducer";
import {profileReducer} from "./profile-reducer";

const reducers = combineReducers({profileReducer, dialogReducer})

export const store = createStore(reducers)