import {UserType} from "../../redux/users-reducer";
import React, {FC} from "react";
import {NavLink} from "react-router-dom";

type UserPropsType = {
    user: UserType
    followingInProgress: number[]
    followThunk: (userId: number, isFollow: boolean) => void
}

export const User: FC<UserPropsType> = ({user, followingInProgress, followThunk}) => {

    const disabledButton = followingInProgress.some(elem => elem === user.id)
    const followHandel = () => followThunk(user.id, user.followed)

    return (
        <div key={user.id}>
            <NavLink to={`/profile/${user.id}`}>
                <div>
                    <div>{user.photos.small}</div>
                    <div>{user.photos.large}</div>
                    <div>{user.name}</div>
                </div>
            </NavLink>
            <button disabled={disabledButton}
                    onClick={followHandel}>
                {user.followed ?
                    "Follow" :
                    "Unfollow"}
            </button>
        </div>
    )
}