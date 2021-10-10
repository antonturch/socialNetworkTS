import {  combineReducers, createStore } from "redux";
import {dialogReducer} from "./dialog-reducer";
import {profileReducer} from "./profile-reducer";
import {usersReducer} from "./users-reducer";

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogReducer,
    usersPage: usersReducer,
})

type RootReducerType = typeof rootReducer;
export type StateType = ReturnType<RootReducerType>;

export const store = createStore(rootReducer)