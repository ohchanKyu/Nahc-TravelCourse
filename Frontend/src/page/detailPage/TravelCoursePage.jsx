import React, { useState, useContext } from "react";
import classes from './TravelCourse.module.css';
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import MyPlan from "../../components/TravelCourseComponents/MyPlan";
import NewPlan from "../../components/TravelCourseComponents/NewPlan";
import mountainImage from "../../image/mountain.jpg";
import { MdEditCalendar } from "react-icons/md";
import { dateFetch } from "../../loader/DateFetch";
import { addTravelPlan } from "../../api/TravelPlanApiService";
import loginContext from "../../store/login-context";
import useAuthFunction from "../../hooks/useAuthFunction";
import DetailPageHeader from "../../components/BaseComponents/DetailPageHeader";
import DetailPageSummary from "../../components/BaseComponents/DetailPageSummary";

const TravelCoursePage = () => {

    const [step,setStep] = useState(0);
    const functionHandler = useAuthFunction();
    const navigate = useNavigate();

    const setStepHandler = () => {
        setStep(1);
    };

    const loginCtx = useContext(loginContext);
    const userId = loginCtx.id;

    const goNewPlanPage = async (placeName, date, locationX, locationY) =>  {
        let dateArray = dateFetch(date);
        const dataString = date.length === 1 ? date[0] : date[0] + " ~ " + date[1];
        let data = {
            placeName,
            dateArray,
            locationX,
            locationY,
            date : dataString
        }
        const addTravelPlanResponseData = await functionHandler(addTravelPlan,{
            travelPlan : {
                userId : userId,
                travelPlaceName : placeName,
                travelDate : date,
                totalDayCount : dateArray.length
            }
        })
        
        data = {
            ...data,
            travelPlanId : addTravelPlanResponseData.id
        }
        if (addTravelPlanResponseData){
            const componentData = [];
            const dayComponentNumberList = addTravelPlanResponseData.dayComponentNumberList;
            for(var i=0;i<dayComponentNumberList.length;i++){
                dateArray[i] = {
                    ...dateArray[i],
                    componentId : dayComponentNumberList[i],
                    initialState : []
                }
                componentData.push({
                    componentId : dayComponentNumberList[i],
                    initialState : []
                });
            }
            data = {
                ...data,
                componentData
            }
            navigate('/NaHC/dayComponentDetail',{ state: data });
        }
    };

   

  
    return (
        <React.Fragment>
            <DetailPageHeader selectCategory='Travel Course '/>
            <DetailPageSummary
                headerText='놀거리 검색'
                text='기간 설정 및 장소 등록을 통해 
                최적의 데이트 및 여행 코스를 
                계획할 수 있습니다. '
            />
            <div className={`row ${classes.mid_container}`}>
                <div className={`col col-lg-6 ${classes.my_plan_container}`}>
                    <MyPlan onSetRegister={setStepHandler}/>
                </div>
                <div className={`col col-lg-6 ${classes.new_plan_container}`}>
                    {step === 0 && 
                        <React.Fragment>
                            <img src={mountainImage} alt='travel_image'/>
                            <MdEditCalendar style={{ display:'block', fontSize:'60px', opacity:0.5, margin : '0 auto'}}/>
                            <h5>데이트 혹은 여행을 떠나시나요?</h5>
                            <p>여행 일정을 만들고 <br/> 계획을 세워보세요.</p>
                        </React.Fragment>
                    }
                   {step === 1 && <NewPlan onGoPlan={goNewPlanPage}/>}
                </div>
            </div>
            <Footer/>
        </React.Fragment>
    );
};

export default TravelCoursePage;