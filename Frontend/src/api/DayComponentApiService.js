import axios from "axios";


const apiClient = axios.create(
    {
        baseURL : 'http://localhost:8080/api/dayComponent'
    }
)

export const getAllDayComponent = ({ travelPlanId, grantType, accessToken}) => {
    return apiClient.get('/getAllDayComponent',{
        params : {
            travelPlanId
        },
        withCredentials: true,
        headers: { Authorization:`${grantType} ${accessToken}`}
    });
};


export const fetchDayComponent = ({grantType, accessToken, componentId, fetchData }) => { 
    return apiClient.post('/fetchDayComponent',fetchData,{
        params : {
            dayComponentId : componentId
        },
        withCredentials: true,
        headers: { Authorization: `${grantType} ${accessToken}` },
    });
}


export const getPlaceComponents = ({grantType, accessToken, dayComponentPlaceNumberList }) => {
    
    const encodedDayComponentPlaceNumberList = dayComponentPlaceNumberList.map(item => encodeURIComponent(item));

    return apiClient.get('/getAllPlaceComponent',{
        params : {
            dayComponentPlaceNumberList : encodedDayComponentPlaceNumberList.join(",")
        },
        withCredentials: true,
        headers: { Authorization:`${grantType} ${accessToken}`}
    });
}

export const getNoteComponents = ({grantType, accessToken, dayComponentNoteNumberList }) => {

    const encodedDayComponentNoteNumberList = dayComponentNoteNumberList.map(item => encodeURIComponent(item));

    return apiClient.get('/getAllNoteComponent',{
        params : {
            dayComponentNoteNumberList : encodedDayComponentNoteNumberList.join(',')
        },
        withCredentials: true,
        headers: { Authorization:`${grantType} ${accessToken}`}
    });
}