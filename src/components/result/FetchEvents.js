const endPoint = "https://mddenner.dk/Semesterprojekt/api";

function handleHttpErrors(res) {
 /* if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  } */
  return res.json();
}

class eventFetch {

  fetchData = async (url) => {
    console.log(endPoint+url)
    return fetch(endPoint  + url).then(handleHttpErrors).then(events=>{
      console.log(events)
    })
  };

  makeurl = (latitude, longitude, distance) => {
    
    let url = `/show/events/${latitude}/${longitude}/${distance}`
    return url;
  }

}
const eventfacade = new eventFetch();
export default eventfacade;
