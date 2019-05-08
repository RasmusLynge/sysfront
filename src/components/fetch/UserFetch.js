import jwt_decode from 'jwt-decode';
const URL = "https://simonbojesen.com/jwtbackend";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

class UserFetch {

  fetchData = () => {
    var decoded = jwt_decode(localStorage.getItem('jwtToken'));
    const options = this.makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/info/" + decoded.username, options).then(handleHttpErrors);
  };

  login = (user, pass) => {
    const options = this.makeOptions("POST", true, {
      username: user,
      password: pass
    });
    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then(res => {
        console.log("result", res);
        this.setToken(res.token);
      });
  };

  setToken = token => {
    localStorage.setItem("jwtToken", token);
  };

  getToken = () => {
    return localStorage.getItem("jwtToken");
  };

  loggedIn = () => {
    const loggedIn = this.getToken() != null;
    return loggedIn;
  };

  logout = () => {
    localStorage.removeItem("jwtToken");
    if(this.getToken() == null) {
      alert("You have been succesfully logged out");
    }
  };

  makeOptions(method, addToken, body) {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      }
    };
    if (addToken && this.loggedIn()) {
      opts.headers["x-access-token"] = this.getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  }
}
const facade = new UserFetch();
export default facade;