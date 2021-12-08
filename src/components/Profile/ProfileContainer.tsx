import React from "react";
import {ProfilePage} from "./ProfilePage";
import {RootReducerType, StateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {getProfileThunk, ProfileApiType} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";

class ProfileContainer extends React.Component<PropsType, RootReducerType> {

    componentDidMount() {
        let userId = this.props.match.params.userId ? this.props.match.params.userId : "2"
        this.props.getProfileThunk(userId)
    }

    render() {

        return (
            <ProfilePage profile={this.props.profile}/>
        );
    }
}


const mapStateToProps = (state: StateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    // @ts-ignore
    auth: state.auth.isAuth
})

type PathParamsType = {
    userId: string
}

type PropsType = RouteComponentProps<PathParamsType> & ProfilePageContainerPropsType

export type ProfilePageContainerPropsType = MapStateToPropsType & MapDispatchToPropsType

type MapStateToPropsType = {
    profile: ProfileApiType | null
    isAuth: boolean
}

type MapDispatchToPropsType = {
    // setUserProfile: (profile: ProfileApiType) => void
    getProfileThunk: (userId: string) => void
}

// const MapDispatchToProps = (dispatch: Dispatch) => {
//     // return {
//     //     setUserProfile: (profile: ProfileApiType) => {
//     //         dispatch(setUserProfileAC(profile))
//     //     },
//     //     getProfileThunk
//     // }
// }

let ProfileContainerWithRouter = withRouter(ProfileContainer);

export const ProfilePageContainer = connect(mapStateToProps,{getProfileThunk})(
    ProfileContainerWithRouter)