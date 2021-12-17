import {connect} from "react-redux";
import {StateType} from "../../redux/redux-store";
import {
    followThunk,
    getUsersThunk,
    setCurrentPageAC,
    setLoadingAC,
    setUsersAC,
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

export type UsersPagePropsType = UsersInitStateType & {
    setUsers: (users: UserType[], totalUsersCount: number) => void
    setCurrentPage: (currentPage: number) => void
    setLoader: (isLoading: boolean) => void
    followingInProgress: number[]
    getUsersThunk: (currentPage: number, pageSize: number) => void
    followThunk: (userId: number, isFollow: boolean) => void
    totalUsersCount: number
    pageSize: number
}

export type UsersPresentPropsType = {
    totalUsersCount: number
    pageSize: number
    onChangePage: (usersPage: number) => void
    currentPage: number
    users: UserType[]
    isLoading: boolean
    setLoader: (isLoading: boolean) => void
    followingInProgress: number[]
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


const mapStateToProps = (state: StateType) => {
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
    connect(mapStateToProps, {
        setUsers: setUsersAC,
        setCurrentPage: setCurrentPageAC,
        setLoader: setLoadingAC,
        getUsersThunk: getUsersThunk,
        followThunk: followThunk,
    }),
    withAuthRedirect
)(UsersPageClass)


