import {Field, reduxForm} from "redux-form";
import {FC} from "react";


export const Login = () => {
    const onSubmit = (formData: any) => {
        console.log(formData)
    }
    return (
        <LoginFormRedux onSubmit={onSubmit}/>
    )
}

const LoginForm: FC<any> = ({handleSubmit}) => {

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field type="text" name={"login"} placeholder={"Login"} component={"input"}/>
            </div>
            <div>
                <Field type="text" name={"password"} placeholder={"password"} component={"input"}/>
            </div>
            <div>
                <Field type="checkbox" name={"rememberMe"} component={"input"}/>Remember me
            </div>
            <button>Submit</button>
        </form>
    )
}

const LoginFormRedux = reduxForm({form: "login"})(LoginForm)
