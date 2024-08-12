import axios from "axios";

const apiClient = axios.create(
    {
        baseURL : 'http://localhost:8080'
    }
)


export const getCarRoute = ({location,grantType,accessToken}) => {

    return apiClient.post('/carRoutes',location,{
        withCredentials: true,
        headers: { Authorization:`${grantType} ${accessToken}`}
    });
}

export const getRoadRoute = ({location,grantType,accessToken}) => {
    return apiClient.post("/roadRoutes",location,{
        withCredentials: true,
        headers: { Authorization:`${grantType} ${accessToken}`}
    });
}