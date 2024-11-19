import axios from "axios";
const Dev_URL=process.env.REACT_APP_API_URL
const Auth_URL=process.env.REACT_APP_AUTH_URL

export const appServer = axios.create({
    baseURL:`${Dev_URL}`,
    headers:{"ngrok-skip-browser-warning":"true"}
})
export const authServer = axios.create({
    baseURL:`${Auth_URL}`,
    headers:{"ngrok-skip-browser-warning":"true"}
})

