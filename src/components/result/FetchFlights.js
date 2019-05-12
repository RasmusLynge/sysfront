<<<<<<< HEAD
const endPoint = "https://magnusklitmose.com/jwtbackend/api";
=======
const endPoint = "https://magnusklitmose.com/jwtbackend/api/info";
>>>>>>> 18a305b62358ee1fbe4778e9e688ba1945dbbbb1

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

class flightFetch {

  fetchData = async (url) => {
    const options = await this.makeOptions("GET");
    return fetch(endPoint  + url , options).then(handleHttpErrors)
  };

  directions = (fromCountry, toCountry, date) => {
    date = date.toLocaleDateString();
    date = date.replace(/\./g, "-");
    let url = `/country/date/${fromCountry}/${toCountry}/${date}`
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
const flightFacade = new flightFetch();
export default flightFacade;
