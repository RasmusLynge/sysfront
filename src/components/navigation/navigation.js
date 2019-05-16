import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "./img/LogoSample.png";
import logoblack from "./img/LogoSample.png";
import Popup from "reactjs-popup";
import "./navigation.css";
import Facade from "../fetch/UserFetch";

class Navigation extends Component {
  state = {
    login: "",
    password: "",
    authorized: false,
    loginForm: false,
    error: false,
    wishes: []
  };

  componentDidMount() {
    const loggedIn = Facade.loggedIn();
    if (loggedIn) {
      let wishes = Facade.fetchData();
      this.setState({ authorized: true, wishes: wishes });
    }
  }

  loginClick = () => {
    this.setState({ loginForm: true });
  };

  closeLogin = () => {
    this.setState({ loginForm: false });
  };

  loginCheck = async () => {
    try {
      await Facade.login(this.state.login, this.state.password);
    } catch (error) {
      console.log(error);
    }
    const loggedIn = Facade.loggedIn();
    if (loggedIn) {
      let wishes = await Facade.fetchData();
      this.setState({
        loginForm: false,
        authorized: true,
        error: false,
        wishes: wishes
      });
      console.log(wishes);
    } else {
      this.setState({ error: true });
    }
  };

  logout = () => {
    Facade.logout();
    this.setState({ authorized: false, login: "", password: "", wishes: [] });
  };

  loggedInButton = () => {
    // We should make a dropdown here
    return (
      <li className="input-passengers" onClick={this.logout}>
        Sign out
      </li>
    );
  };

  render() {
    return (
      <div className="grid top-nav">
        <div className="logo">
          <Link to={process.env.PUBLIC_URL + "/"}>
            <img src={logo} alt="" />
          </Link>
        </div>
        <nav>
          <ul className="nav-header">
            {this.state.authorized ? (
              <this.loggedInButton />
            ) : (
              <li onClick={this.loginClick}>Login</li>
            )}
            <Popup
              open={this.state.loginForm}
              closeOnDocumentClick
              onClose={this.closeLogin}
            >
              <div className="authorize-popup">
                <div className="authorize-content">
                  <div className="logo logo-black">
                    <Link to={process.env.PUBLIC_URL + "/"}>
                      <img src={logoblack} alt="" />
                    </Link>
                  </div>
                  <div className="authorize-title">
                    Login in to Your Account
                  </div>
                  <input
                    type="text"
                    placeholder="Username: user"
                    onChange={e => {
                      this.setState({ login: e.target.value });
                    }}
                  />
                  <input
                    type="password"
                    placeholder="Password: userpw"
                    onChange={e => {
                      this.setState({ password: e.target.value });
                    }}
                  />
                  {this.state.error && (
                    <p className="authorize-err">
                      Username or Password was incorrect
                    </p>
                  )}
                  <div className="authorize-actions grid">
                    <button className="login-button" onClick={this.loginCheck}>
                      Login to your account
                    </button>
                    <button
                      className="login-button login-facebook"
                      onClick={this.loginCheck}
                    >
                      Login with Facebook
                    </button>
                  </div>
                </div>
              </div>
            </Popup>
            <li>
              <Link to={process.env.PUBLIC_URL + "/"}>Flights</Link>
            </li>
            {this.state.authorized && (
              <li>
                <Link to={process.env.PUBLIC_URL + "/User"}>Wishlist</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navigation;
