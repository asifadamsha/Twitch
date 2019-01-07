import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "753431569511-vj3q5nf8mq40i6c6s9b7vnhglr3mkrhn.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          // connected to gapi server
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChanged(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChanged);
        });
    });
  }

  onAuthChanged = isUserSignedIn => {
    const gApiUserId = this.auth.currentUser.get().getId();
    isUserSignedIn ? this.props.signIn(gApiUserId) : this.props.signOut();
  };

  onSignOutButtonClicked = () => {
    this.auth.signOut();
  };

  onSignInButtonClicked = () => {
    this.auth.signIn();
  };

  renderAuthButton = () => {
    if (this.props.isUserSignedIn === null) {
      return null;
    } else if (this.props.isUserSignedIn) {
      return (
        <button
          className="ui red google button"
          onClick={this.onSignOutButtonClicked}
        >
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button
          className="ui red google button"
          onClick={this.onSignInButtonClicked}
        >
          <i className="google icon" />
          Sign In
        </button>
      );
    }
  };

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    isUserSignedIn: state.auth.isUserSignedIn,
    userId: state.auth.userId
  };
};

export default connect(
  mapStateToProps,
  {
    signIn,
    signOut
  }
)(GoogleAuth);
