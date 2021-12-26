import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import {dialogReducer} from "./dialog-reducer";
import {profileReducer} from "./profile-reducer";
import {usersReducer} from "./users-reducer";
import {authReducer} from "./auth-reducer";
import thunk, {ThunkAction} from "redux-thunk";
import {reducer as formReducer} from "redux-form";
import {appReducer} from "./app-reducer";

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
})

export type RootReducerType = typeof rootReducer
export type StateType = ReturnType<RootReducerType>


export type InferActionsType<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never
export type ThunkType<A extends Action> = ThunkAction<Promise<void>, StateType, unknown, A>

// export const store = createStore(rootReducer, applyMiddleware(thunk))
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

//@ts-ignore
window.store = store