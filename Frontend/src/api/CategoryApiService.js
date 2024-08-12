import axios from "axios";

const apiClient = axios.create(
    {
        baseURL : 'http://localhost:8080'
    }
)

export const getAllMovie = ({ grantType, accessToken }) => {

    return apiClient.get('/getAllMovies',{ 
        withCredentials: true,
        headers: { Authorization:`${grantType} ${accessToken}`}
    });
};
