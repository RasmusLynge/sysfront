const endPoint = "http://mddenner.dk/Semesterprojekt/api";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

class eventFetch {

  fetchData = async (url) => {
    const options = await this.makeOptions("GET");
    return fetch(endPoint  + url , options).then(handleHttpErrors)
  };

  makeurl = (latitude, longitude, distance) => {
    
    let url = `/show/events/${latitude}/${longitude}/${distance}`
    return url;
  }

  makeOptions(method, body) {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      }
    };
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  }

}
const eventfacade = new eventFetch();
export default eventfacade;
