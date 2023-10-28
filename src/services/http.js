import axios from "axios";
import Cookies from "universal-cookie"

 const http = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_API
})

http.interceptors.request.use((req) => {
    const cookies = new Cookies();
    const token = cookies.get("auth-token") || "";

    if (token && req.headers) req.headers["auth-token"] = `${token}`;

    return req;
})

export {http};