import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {FC} from "react";
import {Input} from "../common/TextFields/TextField";
import {maxLengthCreator, minLengthCreator, required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {loginThunk} from "../../redux/auth-reducer";
import {StateType} from "../../redux/redux-store";
import {Redirect} from "react-router-dom";
import styles from "./Login.module.css"

const maxLengthTwentySymbols = maxLengthCreator(20)
const minLengthOneSymbol = minLengthCreator(1)

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

type LoginPropsType = {
    loginThunk: (email: string, password: string, rememberMe: boolean) => void
    logOutThunks: () => void
    isAuth: boolean
}
type MapStateToPropsType = {
    isAuth: boolean
}
type MapDispatchToPropsType = {
    loginThunk: (email: string, password: string, rememberMe: boolean) => void
}

export const Login: FC<LoginPropsType> = ({loginThunk, isAuth}) => {
    const onSubmitHandler = (formData: FormDataType) => {
        loginThunk(formData.email, formData.password, formData.rememberMe)
    }

    if (isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <LoginFormRedux onSubmit={onSubmitHandler}/>
    )
}

const LoginForm: FC<InjectedFormProps<FormDataType>> = ({handleSubmit, error}) => {

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field validate={[required, maxLengthTwentySymbols, minLengthOneSymbol]} type="text"
                       name={"email"} placeholder={"your mail"} component={Input}/>
            </div>
            <div>
                <Field type="password" name={"password"} placeholder={"password"} component={Input}/>
            </div>
            <div>
                <Field type="checkbox" name={"rememberMe"} component={Input}/>Remember me
            </div>
            <div className={styles.formSummaryError}>
                {error}
            </div>
            <button>Submit</button>
        </form>
    )
}
const LoginFormRedux = reduxForm<FormDataType>({form: "login"})(LoginForm)

const mapStateToProps = (state: StateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth
    }
}

export const LoginContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, StateType>(
    mapStateToProps, {loginThunk})(Login)