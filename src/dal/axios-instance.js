import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "f2a61237-8cd9-408f-b899-774ac4c57f3f"
    }
})
