import axios from "axios";

const memberApiClient = axios.create(
    {
        baseURL : 'http://localhost:8080/api/member'
    }
)

export const addFavoritePlace = ({userId,placeId,grantType,accessToken}) => {
    return memberApiClient.post('/favoritePlace',null,{
        params : {
           userId,placeId
        },
        withCredentials: true,
        headers: { Authorization:`${grantType} ${accessToken}`}
    }) 
}

export const getFavoritePlaces = ({userId , grantType, accessToken}) => {
    return memberApiClient.get('/getFavoritesPlace',{
        params : {
           userId
        },
        withCredentials: true,
        headers: { Authorization:`${grantType} ${accessToken}`}
    }) 
}


export const deleteFavoritePlace = ({userId, placeId , grantType, accessToken}) => {

    return memberApiClient.delete('/favoritePlace',{
        params : {
            userId,placeId
        },
        withCredentials: true,
        headers: { Authorization:`${grantType} ${accessToken}`}
    }) 
}