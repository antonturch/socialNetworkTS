import {connect} from "react-redux";
import {StateType} from "../../redux/redux-store";
import {setFollowAC, setUsersAC, UserType} from "../../redux/users-reducer";
import {Dispatch} from "redux";
import React from "react";
import axios from "axios";

export type UsersPagePropsType = {
    users: UserType[]
    setFollow: (userId: number, isFollow: boolean) => void
    setUsers: (users: UserType[]) => void
}

export class UsersPageClass extends React.Component<any, any> {
    setFollow(id: number, isFollow: boolean) {
        this.props.setFollow(id, isFollow)
    }

    setUsers = () => {
        axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
            debugger
            // @ts-ignore
            this.props.setUsers(response.data.items)
        })
    }

    render() {

        return (
            <div>
                {this.props.users.map((el: { id: number, name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; comment: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; location: { city: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; country: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }; isFollow: any; }) =>
                    <div key={el.id}>
                        <button onClick={() => this.setUsers()}>Set users</button>
                        <div>{el.name}</div>
                        <button
                            onClick={() => this.setFollow(el.id, el.isFollow)}>{el.isFollow ? "Follow" : "Unfollow"}</button>
                    </div>)}
            </div>
        )
    }
}

export const UsersPage: React.FC<UsersPagePropsType> = ({users, setUsers, setFollow}) => {

    return (
        <div>
            {users.map(el => <div key={el.id}>
                <div>{el.name}</div>
                <div>{el.comment}</div>
                <div>{el.location.city}</div>
                <div>{el.location.country}</div>
                <button onClick={() => setFollow(el.id, el.isFollow)}>{el.isFollow ? "Follow" : "Unfollow"}</button>
            </div>)}
        </div>
    )
}


const mapStateToProps = (state: StateType) => {
    return {
        users: state.usersPage.users
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setFollow: (userId: number, isFollow: boolean) => {
            dispatch(setFollowAC(userId, isFollow))
        },
        setUsers: (users: UserType[]) => {
            dispatch(setUsersAC(users))
        }
    }
}

export const UsersPageContainer = connect(mapStateToProps, mapDispatchToProps)(UsersPageClass)