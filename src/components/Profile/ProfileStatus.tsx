import {ChangeEvent, FC, useState} from "react";

type ProfileStatusType = {
    status: string
    updateStatusThunk: (newStatus: string) => void
}

export const ProfileStatus: FC<ProfileStatusType> = ({status, updateStatusThunk}) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [statusText, setStatusText] = useState<string>(status)

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deActivateEditMode = () => {
        setEditMode(false)
        updateStatusThunk(statusText)
    }

    const updateStatusInput = (e: ChangeEvent<HTMLInputElement>) => {
        setStatusText(e.currentTarget.value)
    }

        return (
            <>
                {editMode ?
                    <div>
                        <input type="text" autoFocus value={statusText}
                               onChange={updateStatusInput}
                               onBlur={deActivateEditMode}/>
                    </div>
                    :
                    <div>
                        <span onDoubleClick={activateEditMode}>{status}</span>
                    </div>
                }
            </>
        )

}

// export class ProfileStatus extends Component<ProfileStatusType, RootReducerType> {
//     state = {
//         editMode: false,
//         status: this.props.status ? this.props.status : "Set new status"
//     }
//
//     activateEditMode = () => {
//         this.setState({editMode: true})
//     }
//
//     deActivateEditMode = () => {
//         this.setState({editMode: false})
//         this.props.updateStatusThunk(this.state.status)
//     }
//
//     updateStatusInput = (e: ChangeEvent<HTMLInputElement>) => {
//         this.setState({status: e.currentTarget.value})
//     }
//
//     render() {
//         return (
//             <>
//                 {this.state.editMode ?
//                     <div>
//                         <input type="text" autoFocus value={this.state.status}
//                                onChange={this.updateStatusInput}
//                                onBlur={this.deActivateEditMode}/>
//                     </div>
//                     :
//                     <div>
//                         <span onDoubleClick={this.activateEditMode}>{this.props.status}</span>
//                     </div>
//                 }
//             </>
//         )
//     }
// }