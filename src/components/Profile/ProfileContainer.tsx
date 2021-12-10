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
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";

type PathParamsType = {
    userId: string
}
type PropsType = RouteComponentProps<PathParamsType> & ProfilePageContainerPropsType
export type ProfilePageContainerPropsType = MapStateToPropsType & MapDispatchToPropsType
type MapStateToPropsType = {
    profile: ProfileApiType | null
    status: string | null
}
type MapDispatchToPropsType = {
    getProfileThunk: (userId: string) => void
    getUserStatusThunk: (userId: string) => void
    updateStatusThunk: (newStatus: string) => void
}


class ProfileContainer extends React.Component<PropsType, RootReducerType> {

    componentDidMount() {
        let userId = this.props.match.params.userId ? this.props.match.params.userId : "2"
        this.props.getUserStatusThunk(userId)
        this.props.getProfileThunk(userId)
    }

    componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<RootReducerType>,
                       snapshot?: any) {
        if (prevProps.status !== this.props.status) {
            this.setState({status: this.props.status})
        }
    }

    render() {
        return (
            <ProfilePage profile={this.props.profile} status={this.props.status}
                         updateStatusThunk={this.props.updateStatusThunk}/>
        );
    }
}

const mapStateToProps = (state: StateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
})

// export const ProfilePageContainer = connect(mapStateToProps, {getProfileThunk})(
//     withRouter(withAuthRedirect(ProfileContainer)))
export const ProfilePageContainer = compose<ComponentType>(
    connect(mapStateToProps,
        {getProfileThunk, getUserStatusThunk, updateStatusThunk: updateUserStatusThunk}),
    withRouter,
    // withAuthRedirect,
)(ProfileContainer)
