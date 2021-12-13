import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {FC} from "react";
import {maxLengthCreator, minLengthCreator, required} from "../../utils/validators/validators";
import {TextArea} from "./TextFields/TextField";

const maxLengthTenSymbols = maxLengthCreator(10)
const minLengthOneSymbol = minLengthCreator(1)

type FormType = {
    name: string
    placeholder: string
}

export type FormSubmitDataType = {
    newItemText: string
}

const Form: FC<InjectedFormProps<FormSubmitDataType, FormType> & FormType> = ({
                                                                                  name,
                                                                                  placeholder,
                                                                                  handleSubmit
                                                                              }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                {/*<Field type="text" name={"login"} placeholder={placeholder} component={"input"}/>*/}
                <Field type="text" name={name} placeholder={placeholder} component={TextArea}
                       validate={[required, maxLengthTenSymbols, minLengthOneSymbol]}/>
            </div>
            <button>Submit</button>
        </form>
    )
}
export const AddItemForm = reduxForm<FormSubmitDataType, FormType>({form: "addPost"})(Form)


