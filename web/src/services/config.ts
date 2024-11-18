import axios from "axios";

axios.defaults.baseURL = 'http://localhost:30008';
// axios.defaults.baseURL = 'http://server-clusterip-srv:5109';


axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['withCredentials'] = 'true';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default axios;