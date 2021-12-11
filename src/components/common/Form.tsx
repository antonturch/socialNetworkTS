import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {FC} from "react";
import {formDataType} from "../Profile/Stena/MyPosts";

type FormType = {
    // name: string
    // placeholder: string
    handleSubmit: (data: formDataType) => void
}

export const AddPostFormRedux = () => {
    const handleSubmit = (data: formDataType) => {
        console.log(data)

    }
    return (
        // <AddPostForm handleSubmit={handleSubmit} name={"s"} placeholder={"add post/add message"}/>
        <AddPostForm handleSubmit={handleSubmit} />
    )
}

// const Form: FC<InjectedFormProps<formDataType, FormType> & FormType> = ({name, placeholder, handleSubmit}) => {
const Form: FC<InjectedFormProps<formDataType, FormType> & FormType> = ({handleSubmit}) => {
    return (
        // <form onSubmit={handleSubmit}>
        //     <div>
        //         {/*<Field type="text" name={"login"} placeholder={placeholder} component={"input"}/>*/}
        //         <Field type="text" name={"login"} placeholder={"placeholder"} component={"input"}/>
        //     </div>
        //     <button>Submit</button>
        // </form>
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
const AddPostForm = reduxForm<formDataType, FormType>({form: "addPost"})(Form)


