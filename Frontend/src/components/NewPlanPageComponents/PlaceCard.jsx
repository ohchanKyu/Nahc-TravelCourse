import React, { useState, useEffect, useContext } from "react";
import classes from "./PlaceCard.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaStickyNote } from "react-icons/fa";
import { MdTimer } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import Time from "./Time";
import Modal from "../../layout/Modal";
import EditNote from "./EditNote";
import { getRoadRoute, getCarRoute } from "../../api/RouteApiService";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaRoute } from "react-icons/fa6";
import loginContext from "../../store/login-context";
import { addFavoritePlace } from "../../api/FavoritePlaceApiService";
import SetTimeOutModal from "../SetTimeOutModal";
import useAuthFunction from "../../hooks/useAuthFunction";
import PlaceDetail from "../MainPageComponents/PlaceDetail";
import PlaceDetailModal from "../../layout/PlaceDetailModal";

const naverMapURL = process.env.REACT_APP_NAVER_MAP_URI;

const PlaceCard = (props) => {

    const [isTimeOpen,setIsTimeOpen] = useState(false);
    const [isNoteOpen,setIsNoteOpen] = useState(false);
    const [trafficData,setTrafficData] = useState(null);
    const [showCheckModal, setShowCheckModal] = useState(false);
    const [modalMessage,setModalMessage] = useState('');
    const [isPlaceDetail, setIsPlaceDetail] = useState(false);

    const functionHandler = useAuthFunction();

    const timeState = props.item.time ? true : false;
    const noteState = props.item.note ? true : false;

    const loginCtx = useContext(loginContext);
    const userId = loginCtx.id;

    const goDetailPlacePage = () => {
        setIsPlaceDetail(true);
     };
 
     const closePlaceDetail = () => {
         setIsPlaceDetail(false);
     };

    useEffect(() => {
        const getTrafficInformation = async (previousItem) => {
            const locationData = {
                originX: previousItem.data.locationX,
                originY:  previousItem.data.locationY,
                destinationX: props.item.data.locationX,
                destinationY: props.item.data.locationY,
            }
            if (locationData.originX === locationData.destinationX && locationData.originY === locationData.destinationY){
                setTrafficData({
                    distance : '0m',
                    taxiFare : 0,
                    carTotalTime : 0,
                    roadTotalTime : 0
                })
            }else{
                const carRouteResponseData = await functionHandler(getCarRoute,{
                    location : locationData,
                })
                const roadRouteResponseData = await functionHandler(getRoadRoute,{
                    location : locationData,
                })
                setTrafficData({
                    distance : carRouteResponseData.distance,
                    taxiFare : carRouteResponseData.taxiFare,
                    carTotalTime : carRouteResponseData.duration,
                    roadTotalTime : roadRouteResponseData.totalTime
                })
            }
        } 
        if (props.item.previousItem){
            const previousItem = props.item.previousItem;
            getTrafficInformation(previousItem);
        }
     },[props.item.previousItem]);
     
    const goPlaceRoutepage = () => {
        const slng = props.item.previousItem.data.locationX;
        const slat = props.item.previousItem.data.locationY;
        const stext= props.item.previousItem.data.placeName.replace(/(\s*)/g, "")

        const elng =  props.item.data.locationX;
        const elat =  props.item.data.locationY;
        const etext =  props.item.data.placeName.replace(/(\s*)/g, "")

        let url = `${naverMapURL}slng=${slng}&slat=${slat}&stext=${stext}&elng=${elng}&elat=${elat}&pathType=0&showMap=true&etext=${etext}&menu=route`;
        window.open(url, '_blank'); // 새 창에서 링크 열기
    }

    const editItemHandler = ({ type,kind,data,newData}) => {
        props.onEdit({
            type,kind,data,newData
        })
    };

    const removeItemHandler = ({ type,data }) => {
        props.onRemove({
            type,data
        })
    }

    const openTimeHandler = () => {
        setIsTimeOpen(true);
    };

    const closeTimeHandler = () => {
        setIsTimeOpen(false);
    }

    const openNoteHandler = () => {
        setIsNoteOpen(true);
    }

    const closeNoteHandler = () => {
        setIsNoteOpen(false);
    }

    const submitTimeHandler = (timeText) => {
        editItemHandler({ type : "EDIT", kind : "TIME", data : props.item, newData : timeText});
    };

    const submitNoteHandler = (text) => {
        editItemHandler({ type : "EDIT", kind : "NOTE", data : props.item, newData : text});
    };

    const setFavoriteHandler = async () => {
        const addFavoritePlaceResponseData = await functionHandler(addFavoritePlace,{
            userId,
            placeId : props.item.data.id,
        })
        if (!addFavoritePlaceResponseData){
            setShowCheckModal(true);
            setModalMessage("이미 즐겨찾기로 등록되어있습니다.")
       }else{
            setShowCheckModal(true);
            setModalMessage("즐겨찾기로 등록하였습니다.")
       }
     }

    const variants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
        exit : {opacity : 0, y: -30}
    }

    const distanceBoxStyle = {
        marginTop : '70px',
    }

    return (
            <div className={classes.container}>
                 {isPlaceDetail && (
                    <PlaceDetailModal onClose={closePlaceDetail}>
                        <PlaceDetail 
                            item={props.item.data}
                            onClose={closePlaceDetail}/>
                    </PlaceDetailModal>
                )}
                <SetTimeOutModal message={modalMessage} showModal={showCheckModal} setShowModal={setShowCheckModal} />    
                <AnimatePresence>
                    {trafficData && (
                        <motion.div className={classes.traffic_box}
                                variants={variants}
                                animate='animate' initial='initial' exit='exit'
                                key={trafficData}
                            >
                            <div className={classes.left_box}>
                                    <p className={classes.car_time}>차량 예상 시간 <FaArrowAltCircleRight style={{ marginBottom : '3px'}}/> {trafficData.carTotalTime}분</p>
                                    <p className={classes.road_time}>도보 예상 시간 <FaArrowAltCircleRight style={{ marginBottom : '3px'}}/> {trafficData.roadTotalTime}분</p>
                            </div>
                            <div className={classes.right_box}>
                                <p className={classes.taxiFare}>택시 예상 요금 <FaArrowAltCircleRight style={{ marginBottom : '3px'}}/> {trafficData.taxiFare}원</p>
                                <motion.p 
                                    onClick={goPlaceRoutepage}
                                    whileHover={{ color:'rgb(233 116 37)' }}
                                    className={classes.route}>길찾기 바로가기 <FaRoute style={{ marginBottom : '5px'}}/>
                                </motion.p>
                            </div>
                        </motion.div>
                    )}
                    {trafficData && 
                        <div className={classes.distance_box}>
                            <div className={classes.speech_box}></div>
                            <motion.p 
                                    variants={variants}
                                    animate='animate' initial='initial' exit='exit'
                                    key={trafficData.distance}
                                    className={classes.distance}>
                                    {trafficData.distance}
                            </motion.p>
                        </div>

                    }
                 
                </AnimatePresence>
                <div className={classes.order_bar}>
                    {props.item.placeNumber}
                    <AnimatePresence>
                        {props.item.time && 
                            <div className={classes.time_box}>
                                <motion.p 
                                    variants={variants}
                                    animate='animate' initial='initial' exit='exit'
                                    key={props.item.time}
                                    className={classes.time}>
                                    {props.item.time}
                                </motion.p>
                            </div>
                        }
                    </AnimatePresence>
                </div>
                <div className={classes.place_card_container} style={props.item.placeNumber > 1 ? distanceBoxStyle : {}}>
                    <div className={classes.place_text_box}>
                        <img src={props.item.data.image} alt='place' className={classes.place_image}/>
                        <p className={classes.place_title}>
                            {props.item.data.placeName}
                        </p>
                        <span className={classes.place_distance}><FaLocationDot style={{ marginBottom : '4px'}}/> {props.item.data.distance} </span>
                        <span className={classes.place_address}> / {props.item.data.addressName}</span>
                        <p className={classes.place_phoneNumber}>
                            <FaPhoneAlt style={{ color : '#217af4' , marginBottom : '3px', marginLeft : '2px'}}/> {props.item.data.phoneNumber ? props.item.data.phoneNumber: '등록된 번호가 없습니다.'}
                        </p>
                        <AnimatePresence>
                            {props.item.note && 
                                    <div className={classes.note_box}>
                                        <motion.p 
                                            variants={variants}
                                            animate='animate' initial='initial' exit='exit'
                                            key={props.item.note}
                                            className={classes.place_note}>
                                            <FaStickyNote style={{ marginBottom : '2px', color : '#217af4'}}/> {props.item.note}
                                        </motion.p>
                                    </div>
                                
                            }
                        </AnimatePresence>
                    </div>
                    <div className={classes.button_list}>
                        <motion.p whileHover={{ scale : 1.1 }} onClick={goDetailPlacePage}><FaExternalLinkAlt style={{ marginBottom : '5px'}}/> 장소 보기 </motion.p>
                        <motion.p whileHover={{ scale : 1.1 }} onClick={setFavoriteHandler}><FaStar style={{ marginBottom : '5px'}}/> 즐겨 찾기 </motion.p>
                        <motion.p whileHover={{ scale : 1.1 }}
                            onClick={openNoteHandler}
                        ><FaStickyNote style={{ marginBottom : '5px'}}/>{noteState ? ' 메모 변경' : ' 메모 추가'} </motion.p>
                        <motion.p 
                            onClick={openTimeHandler}
                            whileHover={{ scale : 1.1 }}><MdTimer style={{ marginBottom : '5px'}}/> 
                                {timeState ? ' 시간 변경' : ' 시간 추가'}
                            </motion.p>
                        <motion.p 
                            onClick={() => removeItemHandler({ type : "REMOVE", data : props.item})}
                            whileHover={{ scale : 1.1 }}><FaTrashAlt style={{ marginBottom : '5px'}}/> 삭제 </motion.p>
                    </div>
                    {isTimeOpen && (
                            <Modal onClose={closeTimeHandler}>
                                <Time 
                                    onSubmit={submitTimeHandler}
                                    onState={timeState}
                                    onClose={closeTimeHandler}/>
                            </Modal>
                        )}
                    {isNoteOpen &&  (
                        <Modal onClose={closeNoteHandler}>
                            <EditNote
                                onType='place'
                                onState={noteState}
                                onClose={closeNoteHandler}
                                onSubmit={submitNoteHandler}
                            />
                        </Modal>
                    )}
                </div>
            </div>
    );
};

export default PlaceCard;