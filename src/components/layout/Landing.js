import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { googleLogin } from "../../actions/auth";
import GoogleButton from "../ui/GoogleButton";

class Landing extends Component {
  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) this.props.history.push("/dashboard");
    if (this.props.location.search.length > 0) {
      this.props.googleLogin(this.props.location.search);
    }
  };

  render() {
    return (
      <div className="landing full-height">
        <div className="dark-overlay  text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4 mt-0">eIQ Mobility | Test</h1>
                <p className="lead"> Please Login to get started</p>
                <hr />
                <GoogleButton
                  link="/api/users/google"
                  text="Login with Google"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  googleLogin: token => dispatch(googleLogin(token))
});

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
