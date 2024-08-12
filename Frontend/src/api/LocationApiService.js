import axios from "axios";


const apiClient = axios.create(
    {
        baseURL : 'http://localhost:8080'
    }
)

export const getLocaleByAddress = ({address, grantType, accessToken}) => {
    return apiClient.get('/getLocale',{
        params : {
            address
        },
        withCredentials: true,
        headers: { Authorization:`${grantType} ${accessToken}`}
    });
};

export const getCinemaLocation = ({x,y, grantType, accessToken}) => {
    return apiClient.get('/getCinema',{
        params : {
            x,y
        }, 
        withCredentials: true,
        headers: { Authorization:`${grantType} ${accessToken}`}
    })
};

export const getPlaceLocation = ({ x,y,placeName, grantType, accessToken }) => {
    return apiClient.get('/getPlace',{
        params : {
            x,y,placeName
        },
        withCredentials: true,
        headers: { Authorization:`${grantType} ${accessToken}`}
    })
}

export const getPlaceImage = ({ fileName, grantType, accessToken }) => {
    return apiClient.get('/getImage',{
        params : {
            fileName
        },
        responseType: 'blob',
        withCredentials: true,
        headers: { Authorization:`${grantType} ${accessToken}`}
    })
}

export const getRecommendPlace = ({x,y, grantType, accessToken}) => {
    return apiClient.get('/getRecommendPlace',{
        params : {
            x,y
        },
        withCredentials: true,
        headers: { Authorization:`${grantType} ${accessToken}`}
    })
}

export const getPlaceDetail = ({ id, googlePlaceId, grantType, accessToken}) => {
    return apiClient.get('/getPlaceDetail',{
        params : {
           placeId : id,
           googlePlaceId
        },
        withCredentials: true,
        headers: { Authorization:`${grantType} ${accessToken}`}
    })
}

export const getOnePlace = ({ placeId , grantType, accessToken}) => {
    return apiClient.get('/getOnePlace',{
        params : {
            placeId
        },
        withCredentials: true,
        headers: { Authorization:`${grantType} ${accessToken}`}
    })
}