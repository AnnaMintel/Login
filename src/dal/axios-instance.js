import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "8bc12464-5a08-4df5-997e-86308282666b"
    }
})

// export const authAPI = {
//     me() {
//         return axiosInstance.get(`auth/me`);
//     }
// }