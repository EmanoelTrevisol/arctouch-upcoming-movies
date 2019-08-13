function getApiUrl() {
  if (window.location.origin.includes("localhost"))
    return "http://localhost:8888/api/";
  else return `${window.location.origin}/api/`;
}

export default {
  apiUrl: getApiUrl()
};
