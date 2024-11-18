import axios from "axios";
const Dev_URL=process.env.REACT_APP_API_URL

export default axios.create({
    baseURL:`${Dev_URL}`,
    headers:{"ngrok-skip-browser-warning":"true"}
})