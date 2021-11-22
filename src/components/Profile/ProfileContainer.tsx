import React from "react";
import {ProfilePage} from "./ProfilePage";
import {ProfilePagePropsType} from "../../redux/state";
import {RootReducerType, StateType} from "../../redux/redux-store";
import axios, {AxiosResponse} from "axios";
import {connect} from "react-redux";
import {setUserProfileAC} from "../../redux/profile-reducer";

class ProfileContainer extends React.Component<ProfilePagePropsType, RootReducerType> {

    componentDidMount() {
        axios.get<AxiosResponse | any>(
            `https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(response => {
                this.props.setUserProfileAC(response.data)
            })
    }

    render() {
        return (
            <ProfilePage {...this.props} profile = {this.props.profile}/>
        );
    }
}

const mapStateToProps = (state: StateType) => ({
    profile: state.profilePage.profile
})

export const ProfilePageContainer = connect(mapStateToProps, {setUserProfileAC})(ProfileContainer)