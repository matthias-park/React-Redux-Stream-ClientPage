import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut} from '../actions/index.js';

class GoogleAuth extends React.Component {
    state = { isSignedIn: null };

    componentDidMount() {
        window.gapi.load('client: auth2', () => {
            window.gapi.client.init({
                clientId: '739260451862-09ds06ee6g0miracv5dp8s46beorp49l.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton () {
        if (this.props.isSignedIn === null ){
            return <div>I don't know if we are signed in</div>
        } else if (this.props.isSignedIn){
            return (
                <button onClick={this.onSignOutClick} 
                    className="ui red google button">
                    <i className="google icon" />
                        Sign Out
                </button>
            )
        } else {
            return (
                <button onClick={this.onSignInClick} 
                    className="ui red google button">
                <i className="google icon" />
                    Sign in with Google
            </button>
            )
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(
    mapStateToProps, 
    { signIn, signOut}
) (GoogleAuth);
