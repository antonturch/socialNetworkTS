import React, {ComponentType} from "react";
import {ProfilePage} from "./ProfilePage";
import {RootReducerType, StateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {getProfileThunk, ProfileApiType} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

type PathParamsType = {
    userId: string
}
type PropsType = RouteComponentProps<PathParamsType> & ProfilePageContainerPropsType
export type ProfilePageContainerPropsType = MapStateToPropsType & MapDispatchToPropsType
type MapStateToPropsType = {
    profile: ProfileApiType | null
}
type MapDispatchToPropsType = {
    getProfileThunk: (userId: string) => void
}


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
})

// export const ProfilePageContainer = connect(mapStateToProps, {getProfileThunk})(
//     withRouter(withAuthRedirect(ProfileContainer)))
export const ProfilePageContainer = compose<ComponentType>(
    connect(mapStateToProps, {getProfileThunk}),
    withRouter,
    withAuthRedirect,
)(ProfileContainer)
