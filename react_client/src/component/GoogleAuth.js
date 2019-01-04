import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  state = { isUserSignedIn: null };

  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "753431569511-vj3q5nf8mq40i6c6s9b7vnhglr3mkrhn.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({ isUserSignedIn: this.auth.isSignedIn.get() });
          this.auth.isSignedIn.listen(this.onSingedStateChanged);
        });
    });
  }

  onSingedStateChanged = () => {
    this.setState({ isUserSignedIn: this.auth.isSignedIn.get() });
  };

  onSignOutButtonClicked = () => {
    this.auth.signOut();
    this.props.signOut();
  };

  onSignInButtonClicked = () => {
    this.auth.signIn();
    this.props.signIn();
  };

  renderAuthButton = () => {
    if (this.state.isUserSignedIn === null) {
      return null;
    } else if (this.state.isUserSignedIn) {
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

export default connect(
  null,
  {
    signIn,
    signOut
  }
)(GoogleAuth);
