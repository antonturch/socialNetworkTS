import React, {ComponentType} from "react";
import {ProfilePage} from "./ProfilePage";
import {RootReducerType, StateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {
    getProfileThunk,
    getUserStatusThunk,
    ProfileApiType,
    updateUserStatusThunk
} from "../../redux/profile-reducer";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";

type PathParamsType = {
    userIdUrl: string
}
type PropsType = RouteComponentProps<PathParamsType> & ProfilePageContainerPropsType
export type ProfilePageContainerPropsType = MapStateToPropsType & MapDispatchToPropsType
type MapStateToPropsType = {
    profile: ProfileApiType | null
    status: string | null
    authorizedUserId: string | null
}
type MapDispatchToPropsType = {
    getProfileThunk: (userId: string | null) => void
    getUserStatusThunk: (userId: string | null) => void
    updateStatusThunk: (newStatus: string) => void
}


class ProfileContainer extends React.Component<PropsType, RootReducerType> {

    componentDidMount() {
        let userId = this.props.match.params.userIdUrl ? this.props.match.params.userIdUrl : this.props.authorizedUserId
        this.props.getProfileThunk(userId)
        this.props.getUserStatusThunk(userId)
    }

    componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<RootReducerType>,
                       snapshot?: any) {
        if (prevProps.status !== this.props.status) {
            this.setState({status: this.props.status})
        }
    }

    render() {
        if (!this.props.authorizedUserId && !this.props.match.params.userIdUrl) {
            return <Redirect to={"/login"}/>
        }
        return (
            <ProfilePage profile={this.props.profile} status={this.props.status}
                         updateStatusThunk={this.props.updateStatusThunk}/>
        );
    }
}

const mapStateToProps = (state: StateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
})

// export const ProfilePageContainer = connect(mapStateToProps, {getProfileThunk})(
//     withRouter(withAuthRedirect(ProfileContainer)))
export const ProfilePageContainer = compose<ComponentType>(
    connect(mapStateToProps,
        {getProfileThunk, getUserStatusThunk, updateStatusThunk: updateUserStatusThunk}),
    withRouter,
    // withAuthRedirect,
)(ProfileContainer)
