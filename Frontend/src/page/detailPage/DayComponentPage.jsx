import React, { useState, useContext } from "react";
import classes from "./DayComponentPage.module.css";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion"; 
import DayComponent from "../../components/NewPlanPageComponents/DayComponent";
import { fetchDayComponent } from "../../api/DayComponentApiService";
import { GoChecklist } from "react-icons/go";
import SetTimeOutModal from "../../components/SetTimeOutModal";
import Footer from "../../components/Footer";
import { FaArrowCircleRight } from "react-icons/fa";
import KakaoMap from "../../components/NewPlanPageComponents/KakaoMap";
import { MdOutlineCategory } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { BsFillCalendarDateFill } from "react-icons/bs";
import Modal from "../../layout/Modal";
import EditDateModal from "../../components/TravelCourseComponents/EditDateModal";
import { dateFetch } from "../../loader/DateFetch";
import { editTravelPlan } from "../../api/TravelPlanApiService";
import useAuthFunction from "../../hooks/useAuthFunction";
import loginContext from "../../store/login-context";
import { useNavigate } from "react-router-dom";

const EditPlanPage = () => {
 
    const location = useLocation();
    const loginCtx = useContext(loginContext);
    const navigate = useNavigate();
    const functionHandler = useAuthFunction();

    const [showCheckModal, setShowCheckModal] = useState(false);
    const [modalMessage,setModalMessage] = useState('');
    const [isEditDate,setIsEditDate] = useState(false);

    let {   date, 
            dateArray, 
            locationX, 
            locationY, 
            placeName, 
            componentData, 
            travelPlanId 
    } = location.state;

    for(var i=0;i<dateArray.length;i++){
        dateArray[i] = {
            ...dateArray[i],
            ...componentData[i]
        }
    }
    
    const [dayComponentList,setDayComponentList] = useState(
        dateArray.map(item => {
            return {
                componentId : item.componentId,
                state : item.initialState
            }
        })
    )
    
    const saveDayComponentListHandler = async (componentId, dayComponentState) => {
        const targetIndex = dayComponentList.findIndex(item => item.componentId === componentId);
        let fetchDataArray = [...dayComponentList];
        fetchDataArray[targetIndex] = {
            ...dayComponentList[targetIndex],
            state : dayComponentState
        }
        setDayComponentList(fetchDataArray);
    }

    const saveAllDayComponentHandlerToBackend = async () => {
        
        for(var i=0;i<dayComponentList.length;i++){

            const fetchDataResponseData = await functionHandler(fetchDayComponent,{
                componentId: dayComponentList[i].componentId,
                fetchData : dayComponentList[i].state
            })
            if (fetchDataResponseData && i === (dayComponentList.length-1)){
                setShowCheckModal(true);
                setModalMessage("저장을 완료하였습니다.")
            }
            if (!fetchDataResponseData){
                setShowCheckModal(true);
                setModalMessage("다시 시도해주세요.")
            }
        }
    };

    const openEditDateHandler = () => {
        setIsEditDate(true);
    };

    const closeEditDateHandler = () => {
        setIsEditDate(false);
    }

    const variants = {
        initial: { opacity: 0, x: -50 },
        animate: { opacity: 1, x: 0, transition: { staggerChildren: 0.3 } },
    };

    const editDateHandler = async (fetchDate) => {
        let fecthDateArray = dateFetch(fetchDate);
        const dataString = fetchDate.length === 1 ? fetchDate[0] : fetchDate[0] + " ~ " + fetchDate[1];
        let data = {
            travelPlanId,
            placeName, 
            locationX, 
            locationY,
            dateArray : fecthDateArray, 
            date : dataString
        }
        const editTravelPlanResponseData = await functionHandler(editTravelPlan,{
            travelPlan : {
                id : travelPlanId,
                userId : loginCtx.id,
                travelPlaceName : placeName,
                travelDate : fetchDate,
                totalDayCount : fecthDateArray.length 
            }
        })
        
        if (editTravelPlanResponseData){
            const componentData = [];
            const dayComponentNumberList = editTravelPlanResponseData.dayComponentNumberList;
            for(var i=0;i<dayComponentNumberList.length;i++){
                fecthDateArray[i] = {
                    ...fecthDateArray[i],
                    componentId : dayComponentNumberList[i],
                    initialState : []
                }
                componentData.push({
                    componentId : dayComponentNumberList[i],
                    initialState : []
                })
            }
            data = {
                ...data,
                componentData
            }
            setDayComponentList(fecthDateArray.map(item => {
                return {
                    componentId : item.componentId,
                    state : item.initialState
                }
            }))
            navigate('/NaHC/dayComponentDetail', { state: data });
        }
    };

    return (
        <React.Fragment>
            <SetTimeOutModal message={modalMessage} showModal={showCheckModal} setShowModal={setShowCheckModal} />
            {isEditDate && (
                <Modal>
                    <EditDateModal onSubmit={editDateHandler} onClose={closeEditDateHandler}/>
                </Modal>
            )}
            <div className={`row ${classes.header_container}`}>
                <div className={`col col-lg-6 ${classes.left_header_container}`}>
                    <h1> NaHC Travel  <br/> Course Planner <MdOutlineCategory className={classes.header_icon}/></h1>
                    <div className={classes.place_summary_text}>
                        <p className={classes.place_text}><FaMapLocationDot style={{marginBottom:'5px'}}/> 여행 장소 <br/><FaArrowCircleRight style={{ marginBottom :'5px'}}/> <span>{placeName}</span></p>
                        <p className={classes.date_text}>
                            <BsFillCalendarDateFill style={{marginBottom:'5px'}}/> 여행 일정 <br/> <FaArrowCircleRight style={{ marginBottom :'5px', marginRight : '8px'}}/>
                            <span>{date}</span>
                        </p>
                </div>
            </div>
            <div className={`col col-lg-6 ${classes.right_header_container}`}>
                <div className={classes.map_container}>
                    <h4><FaMapLocationDot style={{ marginBottom : '5px'}}/> Location Map </h4>
                    <KakaoMap locationX={locationX} locationY={locationY}/> 
                </div>
                <div className={classes.map_text}>
                    <p>
                        지도를 통해 해당 위치를  <br/> 확인해보세요. <br/>
                        클릭 및 드래그를 통해 <br/> 위치 이동이 가능합니다. <br/>
                        확대 및 축소도 가능합니다. <br/>
                        위치를 확인해보세요!
                    </p>
                </div>
                </div>
            </div>
             <div className={`row ${classes.main_container}`}>
                <div className={classes.component_container}>
                    <h2> Day List <GoChecklist/></h2>
                    <motion.ul variants={variants} animate='animate' initial='initial' className={classes.dayList}>
                        {dateArray.map(item => (
                            <motion.li
                                key={item.order}
                                variants={{ animate: { opacity: 1, x: 0 }, initial: { opacity: 0, x: -50 } }}
                            >   
                                <DayComponent 
                                    onSave={saveDayComponentListHandler}
                                    locationX={locationX}
                                    locationY={locationY}
                                    initialState = {item.initialState}
                                    componentId={item.componentId}
                                    date={item.date} 
                                    order={item.order} 
                                    dayOfWeekString={item.dayOfWeekString} />
                            </motion.li>
                        ))}
                    </motion.ul>
                    <div className={classes.submit_container}>
                        <motion.p whileHover={{ scale : 1.1}} 
                            onClick={saveAllDayComponentHandlerToBackend} 
                            className={classes.save}>저장하기</motion.p>
                        <motion.p whileHover={{ scale : 1.1}} 
                            onClick={openEditDateHandler} 
                            className={classes.date_edit}>날짜수정</motion.p>
                    </div>
                </div>
            </div>
            <Footer/>
        </React.Fragment>
       
    )
};

export default EditPlanPage;