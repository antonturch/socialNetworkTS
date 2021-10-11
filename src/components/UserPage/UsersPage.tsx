import {connect} from "react-redux";
import {RootReducerType, StateType} from "../../redux/redux-store";
import {
    setCurrentPageAC,
    setFollowAC, setLoadingAC,
    setUsersAC,
    UsersInitStateType,
    UserType
} from "../../redux/users-reducer";
import {Dispatch} from "redux";
import React from "react";
import axios, {AxiosResponse} from "axios";
import "./../../App.css";
import img from "./../../Img/Preloader.gif"

export type UsersPagePropsType = UsersInitStateType & {
    setFollow: (userId: number, isFollow: boolean) => void
    setUsers: (users: UserType[], totalUsersCount: number) => void
    setCurrentPage: (currentPage: number) => void
    setLoader: (isLoading: boolean) => void
}

export type UsersPresent = {
    pagesNumber: number[]
    onChangePage: (usersPage: number) => void
    currentPage: number
    users: UserType[]
    setFollow: (id: number, isFollow: boolean) => void
    isLoading: boolean
}

const UsersPresent: React.FC<UsersPresent> = ({
                                                  pagesNumber,
                                                  onChangePage,
                                                  currentPage,
                                                  users,
                                                  setFollow,
                                                  isLoading,
                                              }) => {
    return (
        <div>
            {isLoading ? <img src={img} alt="wait, loading"/> :
                <div>{pagesNumber.map(el => <span key={el} onClick={() => {
                    onChangePage(el)
                }} className={el === currentPage ? "active-page" : ""}>{el}</span>)}
                    <div>
                        <button onClick={() => onChangePage(1)}>Set users</button>
                    </div>
                    {users.map(
                        (el: { id: number, name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; comment: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; location: { city: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; country: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }; isFollow: any; }) =>
                            <div key={el.id}>
                                <div>{el.name}</div>
                                <button
                                    onClick={() => setFollow(el.id, el.isFollow)}>{el.isFollow ?
                                    "Follow" :
                                    "Unfollow"}</button>
                            </div>)}</div>}
        </div>
    )
}

export class UsersPageClass extends React.Component<UsersPagePropsType, RootReducerType> {

    componentDidMount = () => {
        this.props.setLoader(this.props.isLoading)
        axios.get<AxiosResponse | any>(
            `https://social-network.samuraijs.com/api/1.0/users?page=2&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items, response.data.totalCount)
            })
        this.props.setLoader(this.props.isLoading)
    }

    setFollow(id: number, isFollow: boolean) {
        this.props.setFollow(id, isFollow)
    }

    onChangePage = (usersPage: number) => {
        this.props.setLoader(this.props.isLoading)
        this.props.setCurrentPage(usersPage)
        axios.get<any>(
            `https://social-network.samuraijs.com/api/1.0/users?page=${usersPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items, response.data.totalCount)
            })
        this.props.setLoader(this.props.isLoading)
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
                          setFollow={this.setFollow} isLoading={this.props.isLoading}/>
        )
    }
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

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setFollow: (userId: number, isFollow: boolean) => {
            dispatch(setFollowAC(userId, isFollow))
        },
        setUsers: (users: UserType[], totalUsersCount: number) => {
            dispatch(setUsersAC(users, totalUsersCount))
        },
        setCurrentPage: (currentPage: number) => {
            dispatch(setCurrentPageAC(currentPage))
        },
        setLoader: (isLoading: boolean) => {
            dispatch(setLoadingAC(isLoading))
        },
    }
}

export const UsersPageContainer = connect(mapStateToProps, mapDispatchToProps)(UsersPageClass)

