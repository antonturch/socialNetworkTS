import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {FC} from "react";

type FormType = {
    name: string
    placeholder: string
}

export type FormSubmitDataType = {
    newItemText: string
}

const Form: FC<InjectedFormProps<FormSubmitDataType, FormType> & FormType> = ({name, placeholder, handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                {/*<Field type="text" name={"login"} placeholder={placeholder} component={"input"}/>*/}
                <Field type="text" name={name} placeholder={placeholder} component={"textarea"}/>
            </div>
            <button>Submit</button>
        </form>
    )
}
export const AddItemForm = reduxForm<FormSubmitDataType, FormType>({form: "addPost"})(Form)


