import axios from "axios";


const apiClient = axios.create(
    {
        baseURL : 'http://localhost:8080/api/travel'
    }
)

export const getAllTravelPlan = ({userId, grantType, accessToken}) => {
    return apiClient.get('/getAllPlan',{
        params : {
            userId
        },
        withCredentials: true,
        headers: { Authorization:`${grantType} ${accessToken}`}
    });
};


export const addTravelPlan = ({ travelPlan, grantType, accessToken}) => {
    return apiClient.post('/addPlan',travelPlan,{
        withCredentials: true,
        headers: { Authorization:`${grantType} ${accessToken}`}
    });
};

export const editTravelPlan = ({ travelPlan, grantType, accessToken }) => {
    return apiClient.post('/editPlan',travelPlan,{
        withCredentials: true,
        headers: { Authorization:`${grantType} ${accessToken}`}
    });
}

export const deleteTravelPlan =  ({travelPlanId, grantType, accessToken}) => {
    return apiClient.delete('/deletePlan',{
        params : {
            travelPlanId
        },
        withCredentials: true,
        headers: { Authorization:`${grantType} ${accessToken}`}
    });
};

