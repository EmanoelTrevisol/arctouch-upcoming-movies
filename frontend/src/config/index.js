function getApiUrl() {
  if (window.location.origin.includes("localhost"))
    return "http://localhost:8888/";
  else return `${window.location.origin}/`;
}

export default {
  apiUrl: getApiUrl()
};
