import React, { useState, useEffect, useContext } from "react";
import classes from "./MyTravelList.module.css";
import { FaPlus } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import loginContext from "../../store/login-context";
import { getAllTravelPlan, deleteTravelPlan } from "../../api/TravelPlanApiService";
import jejuImage from "../../image/jeju.jpg";
import sokchoImage from "../../image/sokcho.jpg";
import busanImage from "../../image/busan.jpg";
import seoulImage from "../../image/seoul.jpg";
import travelImage from "../../image/homeImg.jpg";
import { FaLocationDot } from "react-icons/fa6";
import { BsCalendarDateFill } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SetTimeOutModal from "../SetTimeOutModal";
import { getAllDayComponent,getPlaceComponents,getNoteComponents } from "../../api/DayComponentApiService";
import { getPlaceImage } from "../../api/LocationApiService"; 
import { dateFetch } from "../../loader/DateFetch";
import { getLocaleByAddress } from "../../api/LocationApiService";
import useAuthFunction from "../../hooks/useAuthFunction";

const MyTravelList = () => {

    const [previousList,setPreviousList] = useState([]);
    const [upcommingList,setUpcommingList] = useState([]);
    const [showCheckModal, setShowCheckModal] = useState(false);
    const [modalMessage,setModalMessage] = useState('');

    const navigate = useNavigate();
    const functionHandler = useAuthFunction();

    const loginCtx = useContext(loginContext);
    const userId = loginCtx.id;

    const goNewPlanPage = () => {
        navigate("/NaHC/travelCourseDetail")
    };

    const getTravelPlanList = async () => {

        const getTravelResponseData = await functionHandler(getAllTravelPlan,{
            userId,
        })

        const previous = [];
        const upcomming = [];
        var currentDate = new Date();

        for (var i=0;i<getTravelResponseData.length;i++){
            let item = getTravelResponseData[i];
            if (item.travelPlaceName === '속초'){
                item = {
                    ...item,
                    image : sokchoImage,
                    title : item.travelPlaceName
                }
            }else if (item.travelPlaceName === '제주도'){
                item = {
                    ...item,
                    image : jejuImage,
                    title : item.travelPlaceName
                }
            }else if (item.travelPlaceName === '부산'){
                item = {
                    ...item,
                    image : busanImage,
                    title : item.travelPlaceName
                }
            }else if (item.travelPlaceName === '서울'){
                item = {
                    ...item,
                    image : seoulImage,
                    title : item.travelPlaceName
                }
            }else{
                item = {
                    ...item,
                    image : travelImage,
                    title : '국내'
                }
            }
            let targetDate;
            if (item.travelDate.length === 1){
                targetDate = new Date(item.travelDate[0]);
                item = {
                    ...item,
                    travelDate : item.travelDate[0]
                }
            }else{
                targetDate = new Date(item.travelDate[0]);
                item = {
                    ...item,
                    travelDate : item.travelDate[0] + ' ~ ' + item.travelDate[1]
                }
            }
            if (targetDate >= currentDate){
                upcomming.push(item);
            }else{
                previous.push(item);
            }
        }
        setPreviousList(previous);
        setUpcommingList(upcomming);
    } 

    const variants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
        exit : {opacity : 0, y: -30}
    }

    const deleteTravelPlanHandler = async (travelPlanId) => {
        const deleteTravelPlanResponseData = await functionHandler(deleteTravelPlan,{
            travelPlanId
        })
        if (deleteTravelPlanResponseData === "Delete Success"){
            setShowCheckModal(true);
            setModalMessage("여행 일정을 삭제합니다.")
            getTravelPlanList();
       }else{
            setShowCheckModal(true);
            setModalMessage("다시 시도해주세요.")
       }
    };

    const editHandler = async (item) => {

        const dateFetchData = item.travelDate.split("~");
        const dateArray = dateFetch(dateFetchData);

        const getAllDayComponentResponseData = await functionHandler(getAllDayComponent,{
            travelPlanId: item.id
        });
        const localeResponseData = await functionHandler(getLocaleByAddress,{
            address : item.travelPlaceName,
        })

        let planData = { 
            travelPlanId : item.id,
            placeName : item.travelPlaceName, 
            locationX : localeResponseData.x, 
            locationY : localeResponseData.y,
            dateArray,
            date : item.travelDate
        };

        const componentData = [];
        for(var i=0;i<getAllDayComponentResponseData.length;i++){
            
            const dayComponentPlaceNumberList = getAllDayComponentResponseData[i].dayComponentPlaceNumberList;
            const dayComponentNoteNumberList = getAllDayComponentResponseData[i].dayComponentNoteNumberList;

            const getPlacesResponseData = await functionHandler(getPlaceComponents,{
                dayComponentPlaceNumberList
            })
            let fetchPlaceData = [];
            let fetchNoteData = [];

            if (getPlacesResponseData.length !== 0 && getPlacesResponseData){
                fetchPlaceData = await Promise.all(getPlacesResponseData.map(async element => {
                    const fileName = element.data.placeImage;
                    const imageFileResponseData = await functionHandler(getPlaceImage,{
                        fileName
                    })
                    const imageURL = URL.createObjectURL(imageFileResponseData);

                    const newElement = {
                    ...element,
                    data : {
                        ...element.data,
                        image : imageURL
                    }
                    };
                    return newElement;
                 }));
                for(var k=0;k<fetchPlaceData.length;k++){
                    const placeNumber = fetchPlaceData[k].placeNumber;
                    if (parseInt(placeNumber) !== 1){
                        const previousPlaceIndex =  fetchPlaceData.findIndex(
                            item =>  item.placeNumber === (parseInt(placeNumber) - 1)
                        );
                        const previousItem = fetchPlaceData[previousPlaceIndex];
                        fetchPlaceData[k] = {
                            ...fetchPlaceData[k],
                            previousItem : {
                                ...previousItem
                            }
                        }
                    }
                }
            }
            const getNotesResponseData = await functionHandler(getNoteComponents,{
                dayComponentNoteNumberList
            })
            if (getNotesResponseData){
                fetchNoteData = getNotesResponseData;
            }
            const allComponent = [...fetchPlaceData,...fetchNoteData];
            const allComponentNumber = fetchNoteData.length + fetchPlaceData.length;
            let initialState = [];
            for(var j=0;j<allComponentNumber;j++){
                const targetComponent = allComponent.findIndex(item => item.allNumber === j+1);
                initialState.push(allComponent[targetComponent]);
            }
            componentData.push({
                componentId : getAllDayComponentResponseData[i].id,
                initialState
            })
        }
        planData = {
            ...planData,
            componentData
        }
        navigate('/NaHC/dayComponentDetail',{ state : planData });
    };


    useEffect(() => {
        getTravelPlanList();
    },[]);
 

    return (
        <React.Fragment>
             <SetTimeOutModal message={modalMessage} showModal={showCheckModal} setShowModal={setShowCheckModal} />
            <div className={classes.container}>
                <div className={classes.add_box}>
                    <motion.div 
                        onClick={goNewPlanPage}
                        whileHover={{ scale : 1.1 }}
                        className={classes.plus_box}>
                        <FaPlus className={classes.plus_button}/>
                    </motion.div>
                    <div className={classes.text_box}>
                        <p className={classes.header}>여행 일정 만들기</p>
                        <p className={classes.sub_header}>새로운 여행을 떠나보세요.</p>
                    </div>
                </div>
                <div className={classes.travel_list_box}>
                    <div className={classes.upcoming_travel}>
                        <h5># 다가오는 여행</h5>
                        {upcommingList.length > 0 && <p className={classes.number}>총 {upcommingList.length}건 등록</p>}
                        {upcommingList.length ===  0 && <p className={classes.message}>등록된 다가오는 여행이 없습니다.</p>}
                        <ul className={classes.travel_list}>
                            <AnimatePresence>
                                {upcommingList.map(item => {
                                        return (
                                            <motion.li key={item.id}   
                                                variants={variants} 
                                                animate='animate'
                                                initial='initial'
                                                exit='exit'className={classes.travel}>
                                                <img src={item.image} alt='image' className={classes.travel_image}/>
                                                <div className={classes.travel_text}>
                                                    <p className={classes.travel_place}>{item.title} 여행</p>
                                                    <p className={classes.travel_address}><FaLocationDot style={{ color:'#217af4', marginBottom:'3px'}}/> {item.travelPlaceName}</p>
                                                    <span className={classes.travel_date}><BsCalendarDateFill style={{ color:'#217af4', marginBottom:'5px'}}/> {item.travelDate}</span>
                                                </div>
                                                <div className={classes.button_container}>
                                                    <motion.p whileHover={{scale:1.1}}
                                                        onClick={() => editHandler(item)}
                                                    ><FaRegEdit style={{marginBottom:'4px'}}/> 편집</motion.p>
                                                    <motion.p 
                                                        onClick={() => deleteTravelPlanHandler(item.id)}
                                                        whileHover={{scale:1.1}}><FaTrash style={{marginBottom:'4px'}}/> 삭제</motion.p>
                                                </div>
                                            </motion.li>
                                        )
                                })}
                            </AnimatePresence>
                        </ul>
                    </div>
                    <div className={classes.previous_travel}>
                        <h5># 지난 여행</h5>
                        {previousList.length > 0 && <p className={classes.number}>총 {previousList.length}건 등록</p>}
                        {previousList.length ===  0 && <p className={classes.message}>등록된 지난 여행이 없습니다.</p>}
                        <ul className={classes.travel_list}>
                            <AnimatePresence>
                                {previousList.map(item => {
                                    return (
                                        <motion.li key={item.id} className={classes.travel}>
                                            <img src={item.image} alt='image' className={classes.travel_image}/>
                                            <div className={classes.travel_text}>
                                                    <p className={classes.travel_place}>{item.title} 여행</p>
                                                    <p className={classes.travel_address}><FaLocationDot style={{ color:'#217af4', marginBottom:'3px'}}/> {item.travelPlaceName}</p>
                                                    <span className={classes.travel_date}><BsCalendarDateFill style={{ color:'#217af4', marginBottom:'5px'}}/> {item.travelDate}</span>
                                            </div>
                                            <div className={classes.button_container}>
                                                    <motion.p whileHover={{scale:1.1}}
                                                       onClick={() => editHandler(item)}
                                                    ><FaRegEdit style={{marginBottom:'4px'}}/> 편집</motion.p>
                                                    <motion.p 
                                                        onClick={() => deleteTravelPlanHandler(item.id)}
                                                        whileHover={{scale:1.1}}><FaTrash style={{marginBottom:'4px'}}/> 삭제</motion.p>
                                            </div>
                                        </motion.li>
                                    )
                                })}
                            </AnimatePresence> 
                        </ul>
                    </div>
                    
                </div>
            </div>
            

           
        </React.Fragment>
    )
};

export default MyTravelList;