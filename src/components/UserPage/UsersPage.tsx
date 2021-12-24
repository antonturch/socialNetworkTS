import {connect} from "react-redux";
import {StateType} from "../../redux/redux-store";
import {
    actions,
    followThunk,
    getUsersThunk,
    UsersInitStateType,
    UserType
} from "../../redux/users-reducer";
import React, {ComponentType} from "react";
import "./../../App.css";
import img from "../common/Img/Preloader.gif"
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {User} from "./User";
import {Paginator} from "./Paginator";

export type UsersPresentPropsType = UsersInitStateType & {
    onChangePage: (usersPage: number) => void
    setLoader: (isLoading: boolean) => void
    followThunk: (userId: number, isFollow: boolean) => void
}

type UsersPagePropsType = UsersInitStateType & MapDispatchToPropsType

type MapDispatchToPropsType = {
    setUsers: (users: UserType[], totalUsersCount: number) => void
    setCurrentPage: (currentPage: number) => void
    setLoader: (isLoading: boolean) => void
    getUsersThunk: (currentPage: number, pageSize: number) => void
    followThunk: (userId: number, isFollow: boolean) => void
}

export class UsersPageClass extends React.Component<UsersPagePropsType> {

    componentDidMount = () => {
        this.props.getUsersThunk(1, 8)
    }

    onChangePage = (usersPage: number) => {
        this.props.setCurrentPage(usersPage)
        this.props.getUsersThunk(usersPage, 5)
    }

    render() {

        return (
            <UsersPresent users={this.props.users} totalUsersCount={this.props.totalUsersCount}
                          onChangePage={this.onChangePage} currentPage={this.props.currentPage}
                          isLoading={this.props.isLoading} pageSize={this.props.pageSize}
                          setLoader={this.props.setLoader}
                          followingInProgress={this.props.followingInProgress}
                          followThunk={this.props.followThunk}/>
        )
    }
}

const UsersPresent: React.FC<UsersPresentPropsType> = ({
                                                           totalUsersCount,
                                                           pageSize,
                                                           onChangePage,
                                                           currentPage,
                                                           users,
                                                           isLoading,
                                                           setLoader,
                                                           followingInProgress,
                                                           followThunk,
                                                       }) => {
    return (
        <div>
            {isLoading ? <img src={img} alt="wait, loading"/> :
                <div><Paginator setLoader={setLoader} currentPage={currentPage}
                                totalUsersCount={totalUsersCount}
                                onChangePage={onChangePage} pageSize={pageSize}/>
                    <div>
                        <button onClick={() => onChangePage(1)}>Set users</button>
                    </div>
                    {users.map(el => <User user={el} followingInProgress={followingInProgress}
                                           followThunk={followThunk}/>
                    )}
                </div>}
        </div>
    )
}

const mapStateToProps = (state: StateType): UsersInitStateType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isLoading: state.usersPage.isLoading,
        followingInProgress: state.usersPage.followingInProgress
    }
}

export const UsersPageContainer = compose<ComponentType>(
    connect<UsersInitStateType, MapDispatchToPropsType, {}, StateType>(
        mapStateToProps, {
            setUsers: actions.setUsersAC,
            setCurrentPage: actions.setCurrentPageAC,
            setLoader: actions.setLoadingAC,
            getUsersThunk: getUsersThunk,
            followThunk: followThunk,
        }),
    withAuthRedirect
)(UsersPageClass)


