import axios from "axios";


const apiClient = axios.create(
    {
        baseURL : 'http://localhost:8080/api/review'
    }
)

export const addReview = ({ data, grantType,accessToken}) => {
    return apiClient.post('/addReview', data , {
        withCredentials: true,
        headers: { 
            Authorization:`${grantType} ${accessToken}`,
        }
    }) 
}

export const editReview = ({ data, grantType,accessToken}) => {
    return apiClient.post('/editReview', data , {
        withCredentials: true,
        headers: { 
            Authorization:`${grantType} ${accessToken}`,
        }
    }) 
}

export const deleteReview = ({ reviewId, grantType, accessToken}) => {
    return apiClient.delete('/review',{
        params : {
            reviewId
        },
        withCredentials: true,
        headers: { 
            Authorization:`${grantType} ${accessToken}`,
        }
    }) 
}
export const getReviewImage = ({ fileName , grantType,accessToken}) => {
    return apiClient.get('/getImage',{
        params : {
          fileName  
        },
        responseType: 'blob',
        withCredentials: true,
        headers: { 
            Authorization:`${grantType} ${accessToken}`,
        }
    }); 
};

export const getAllReview = ({ userId , grantType,accessToken}) => {
    return apiClient.get('/getAllReview',{
        params : {
          userId,
        },
        withCredentials: true,
        headers: { 
            Authorization:`${grantType} ${accessToken}`,
        }
    }); 
};

