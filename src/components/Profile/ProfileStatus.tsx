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