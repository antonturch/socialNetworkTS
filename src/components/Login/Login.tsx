import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {FC} from "react";
import {Input} from "../common/TextFields/TextField";
import {maxLengthCreator, minLengthCreator, required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {loginThunk, logOutThunks} from "../../redux/auth-reducer";
import {StateType} from "../../redux/redux-store";
import {Redirect} from "react-router-dom";

const maxLengthTenSymbols = maxLengthCreator(20)
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

const LoginForm: FC<InjectedFormProps<FormDataType>> = ({handleSubmit}) => {

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field validate={[required, maxLengthTenSymbols, minLengthOneSymbol]} type="text"
                       name={"email"} placeholder={"your mail"} component={Input}/>
            </div>
            <div>
                <Field type="password" name={"password"} placeholder={"password"} component={Input}/>
            </div>
            <div>
                <Field type="checkbox" name={"rememberMe"} component={Input}/>Remember me
            </div>
            <button>Submit</button>
        </form>
    )
}
const LoginFormRedux = reduxForm<FormDataType>({form: "login"})(LoginForm)

const mapStateToProps = (state: StateType) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export const LoginContainer = connect(mapStateToProps, {loginThunk, logOutThunks})(Login)