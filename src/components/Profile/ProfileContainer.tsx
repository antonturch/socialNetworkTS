import React from "react";
import {ProfilePage} from "./ProfilePage";
import {RootReducerType, StateType} from "../../redux/redux-store";
import axios from "axios";
import {connect} from "react-redux";
import {ProfileApiType, setUserProfileAC} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {Dispatch} from "redux";

class ProfileContainer extends React.Component<PropsType, RootReducerType> {

    componentDidMount() {
        debugger
        let userId = this.props.match.params.userId ? this.props.match.params.userId : "2"
        axios.get<any>(
            `https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
            .then(response => {
                debugger
                this.props.setUserProfile(response.data)
            })
    }

    render() {
        return (
            <ProfilePage profile={this.props.profile}/>
        );
    }
}

const mapStateToProps = (state: StateType): MapStateToPropsType => ({
    profile: state.profilePage.profile
})

type PathParamsType = {
    userId: string
}

type PropsType = RouteComponentProps<PathParamsType> & ProfilePageContainerPropsType

export type ProfilePageContainerPropsType = MapStateToPropsType & MapDispatchToPropsType

type MapStateToPropsType = {
    profile: ProfileApiType | null
}

type MapDispatchToPropsType = {
    setUserProfile: (profile: ProfileApiType) => void
}

const MapDispatchToProps = (dispatch: Dispatch) => {
   return {
       setUserProfile: (profile: ProfileApiType) => {
        dispatch(setUserProfileAC(profile))
    }
   }
}

let ProfileContainerWithRouter = withRouter(ProfileContainer);

export const ProfilePageContainer = connect(mapStateToProps, MapDispatchToProps)(
    ProfileContainerWithRouter)