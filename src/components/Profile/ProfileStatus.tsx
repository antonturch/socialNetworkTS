import {Component} from "react";

export class ProfileStatus extends Component {
    state = {
        editMode: false
    }

    activateEditMode() {
        this.setState({editMode: true})
    }
    deActivateEditMode() {
        this.setState({editMode: false})
    }

    render() {
        return (
            <>
                {this.state.editMode ?
                    <div>
                        <input type="text" autoFocus onBlur={this.deActivateEditMode.bind(this)}/>
                    </div>
                    :
                    <div>
                        <span onDoubleClick={this.activateEditMode.bind(this)}>STATUS</span>
                    </div>
                }
            </>
        )
    }
}