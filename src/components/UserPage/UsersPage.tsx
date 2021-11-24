import {connect} from "react-redux";
import {RootReducerType, StateType} from "../../redux/redux-store";
import {
    setCurrentPageAC,
    setFollowAC,
    setLoadingAC,
    setUsersAC,
    UsersInitStateType,
    UserType
} from "../../redux/users-reducer";
import React from "react";
import axios from "axios";
import "./../../App.css";
import img from "./../../Img/Preloader.gif"
import {NavLink} from "react-router-dom";
import {API} from "../../api/api";

export type UsersPagePropsType = UsersInitStateType & {
    setFollow: (userId: number, isFollow: boolean) => void
    setUsers: (users: UserType[], totalUsersCount: number) => void
    setCurrentPage: (currentPage: number) => void
    setLoader: (isLoading: boolean) => void
}

export type UsersPresentPropsType = {
    pagesNumber: number[]
    onChangePage: (usersPage: number) => void
    currentPage: number
    users: UserType[]
    setFollow: (id: number, isFollow: boolean) => void
    isLoading: boolean
    setLoader: (isLoading: boolean) => void
}

export class UsersPageClass extends React.Component<UsersPagePropsType, RootReducerType> {

    componentDidMount = () => {
        this.props.setLoader(true)
        // @ts-ignore
        API.getUsers(this.props.currentPage, this.props.pageSize)
            .then(response => {
                this.props.setUsers(response.items, response.totalCount)
                this.props.setLoader(false)
            })
    }

    setFollow = (id: number, isFollow: boolean) => {
        this.props.setFollow(id, isFollow)
    }

    onChangePage = (usersPage: number) => {
        this.props.setCurrentPage(usersPage)
        API.getUsers(usersPage, this.props.pageSize)
            .then(response => {
                this.props.setUsers(response.items, response.totalCount)
                this.props.setLoader(false)
            })
    }

    render() {
        const pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)
        let pagesNumber: number[] = [];
        for (let i = 1; i <= pagesCount; i++) {
            pagesNumber = [...pagesNumber, i]
        }
        return (
            <UsersPresent users={this.props.users} pagesNumber={pagesNumber}
                          onChangePage={this.onChangePage} currentPage={this.props.currentPage}
                          setFollow={this.setFollow} isLoading={this.props.isLoading}
                          setLoader={this.props.setLoader}/>
        )
    }
}

const UsersPresent: React.FC<UsersPresentPropsType> = ({
                                                           pagesNumber,
                                                           onChangePage,
                                                           currentPage,
                                                           users,
                                                           setFollow,
                                                           isLoading,
                                                           setLoader,
                                                       }) => {
    return (
        <div>
            {isLoading ? <img src={img} alt="wait, loading"/> :
                <div>{pagesNumber.map(el => <span key={el} onClick={() => {
                    onChangePage(el)
                    setLoader(true)
                }} className={el === currentPage ? "active-page" : ""}>{el}</span>)}
                    <div>
                        <button onClick={() => onChangePage(1)}>Set users</button>
                    </div>
                    {users.map(el =>
                        <div key={el.id}>
                            <NavLink to={`/profile/${el.id}`}>
                                <div>
                                    <div>{el.photos.small}</div>
                                    <div>{el.photos.large}</div>
                                    <div>{el.name}</div>
                                </div>
                            </NavLink>
                            <button
                                onClick={() => {
                                    el.followed ?
                                        API.unFollow(el.id)
                                            .then(res => {
                                                // @ts-ignore
                                                if (res.resultCode === 0) {
                                                    setFollow(el.id, el.followed)
                                                }
                                            })
                                        : API.follow(el.id)
                                            .then(res => {
                                                // @ts-ignore
                                                if (res.resultCode === 0) {
                                                    setFollow(el.id, el.followed)
                                                }
                                            })
                                }}>{el.followed ?
                                "Follow" :
                                "Unfollow"}</button>
                        </div>
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
    }
}

// const mapDispatchToProps = (dispatch: Dispatch) => {
//     return {
//         setFollow: (userId: number, isFollow: boolean) => {
//             dispatch(setFollowAC(userId, isFollow))
//         },
//         setUsers: (users: UserType[], totalUsersCount: number) => {
//             dispatch(setUsersAC(users, totalUsersCount))
//         },
//         setCurrentPage: (currentPage: number) => {
//             dispatch(setCurrentPageAC(currentPage))
//         },
//         setLoader: (isLoading: boolean) => {
//             dispatch(setLoadingAC(isLoading))
//         },
//     }
// }

export const UsersPageContainer = connect(mapStateToProps, {
    setFollow: setFollowAC,
    setUsers: setUsersAC,
    setCurrentPage: setCurrentPageAC,
    setLoader: setLoadingAC,
})(UsersPageClass)

