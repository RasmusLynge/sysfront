import jwt_decode from 'jwt-decode';
const URL = "https://rasmuslynge.com/jwtbackend";

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
    return fetch(URL + "/api/info/" + decoded.username, options).then(handleHttpErrors).then( data => data.flightWish );
  };

  login = async (user, pass) => {
    const options = this.makeOptions("POST", true, {
      username: user,
      password: pass
    });
    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then(res => {
        this.setToken(res.token);
      });
  };

  setToken = token => {
    localStorage.setItem("jwtToken", token);
  };

  getToken = () => {
    const token = localStorage.getItem("jwtToken");
    return token;
  };

  loggedIn = () => {
    const loggedIn = this.getToken() != null;
    return loggedIn;
  };

  logout = () => {
    localStorage.removeItem("jwtToken");
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