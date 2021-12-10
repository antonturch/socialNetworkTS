import {ChangeEvent, Component} from "react";
import {RootReducerType} from "../../redux/redux-store";

type ProfileStatusType = {
    status: string | null
    updateStatusThunk: (newStatus: string) => void
}

export class ProfileStatus extends Component<ProfileStatusType, RootReducerType> {
    state = {
        editMode: false,
        status: this.props.status ? this.props.status : "Set new status"
    }

    activateEditMode = () => {
        this.setState({editMode: true})
    }

    deActivateEditMode = () => {
        this.setState({editMode: false})
        this.props.updateStatusThunk(this.state.status)
    }

    updateStatusInput = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({status: e.currentTarget.value})
    }

    render() {
        return (
            <>
                {this.state.editMode ?
                    <div>
                        <input type="text" autoFocus value={this.state.status}
                               onChange={this.updateStatusInput}
                               onBlur={this.deActivateEditMode}/>
                    </div>
                    :
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status}</span>
                    </div>
                }
            </>
        )
    }
}