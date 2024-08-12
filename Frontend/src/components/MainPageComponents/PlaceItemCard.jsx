import React, { useState, useContext } from "react";
import classes from "./PlaceItemCard.module.css";
import { motion } from "framer-motion"; 
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa";
import { FaRoute } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaCarSide } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { FaPersonWalking } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import loginContext from "../../store/login-context";
import { addFavoritePlace } from "../../api/FavoritePlaceApiService";
import SetTimeOutModal from "../SetTimeOutModal";
import useAuthFunction from "../../hooks/useAuthFunction";
import PlaceDetail from "./PlaceDetail";
import PlaceDetailModal from "../../layout/PlaceDetailModal";

const PlaceItemCard = (props) => {  

    const [isPlace,setIsPlace] = useState(true);
    const [showCheckModal, setShowCheckModal] = useState(false);
    const [modalMessage,setModalMessage] = useState('');
    const [isPlaceDetail, setIsPlaceDetail] = useState(false);

    const functionHandler = useAuthFunction();

    const loginCtx = useContext(loginContext);
    const userId = loginCtx.id;

    const setTrafficHandler = () => {
        setIsPlace(false);
    }

    const setPlaceHandler = () => {
        setIsPlace(true);
    }

    const setFavoriteHandler = async () => {
        const addFavoritePlaceResponseData = await functionHandler(addFavoritePlace,{
            userId,
            placeId : props.item.id,
        })
        if (!addFavoritePlaceResponseData){
            setShowCheckModal(true);
            setModalMessage("이미 즐겨찾기로 등록되어있습니다.")
        }else{
            setShowCheckModal(true);
            setModalMessage("즐겨찾기로 등록하였습니다.")
        }
    }

    const goDetailPlacePage = () => {
        setIsPlaceDetail(true);
    };

    const closePlaceDetail = () => {
        setIsPlaceDetail(false);
    };

    const variants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0}
    }

    return (
        <React.Fragment>
            {isPlaceDetail && (
                <PlaceDetailModal onClose={closePlaceDetail}>
                    <PlaceDetail 
                        item={props.item}
                        onClose={closePlaceDetail}/>
                </PlaceDetailModal>
            )}
            <SetTimeOutModal message={modalMessage} showModal={showCheckModal} setShowModal={setShowCheckModal} />
            <div className={`card ${classes.card_container}`}>
                <img className={`card-img-top ${classes.card_image}`} src={props.item.image} alt="Card image cap"/>
                <div className={classes.card_nav_container}>
                    <motion.p onClick={setPlaceHandler} whileHover={{ scale : 1.2, color:'rgb(255, 162, 0)'}} className={classes.card_nav_place}><FaMapLocationDot style={{ marginBottom:'5px'}}/> 장소정보</motion.p>
                    <motion.p onClick={setTrafficHandler} whileHover={{ scale : 1.2, color:'rgb(255, 162, 0)'}} className={classes.card_nav_trafiic}><FaRoute style={{ marginBottom:'5px'}}/> 교통정보</motion.p>
                    <motion.p onClick={setFavoriteHandler} whileHover={{ scale : 1.2, color:'rgb(255, 162, 0)'}} className={classes.card_nav_favorite}><FaStar style={{ marginBottom : '3px' }}/> 즐겨찾기</motion.p>
                </div>
                <div className={`card-body ${classes.card_body}`}>
                    <h5 className={`card-title ${classes.card_title}`}>{props.item.placeName}</h5>
                    {isPlace && 
                        <motion.div variants={variants} animate='animate' initial='initial'
                            key={isPlace}
                            className={classes.place_container}>
                            <p className={`card-text ${classes.card_text}`}><FaLocationDot/> {props.item.addressName}</p>
                            <p className={`card-text ${classes.card_text}`}><FaPhoneAlt/> {props.item.phoneNumber ? props.item.phoneNumber : '등록된 번호가 없습니다.'}</p>
                            <div className={classes.wrapper}>
                                <motion.button onClick={goDetailPlacePage} whileHover={{ scale:1.1 }} className={classes.button}><FaLocationArrow/> 자세히 보기! </motion.button>
                            </div>
                        </motion.div>}
                    {!isPlace && 
                        <motion.div variants={variants} animate='animate' initial='initial'
                            key={isPlace}
                            className={classes.traffic_container}>
                            <p className={`card-text ${classes.card_text}`}><FaCarSide /> {props.item.duration ? <span>{props.item.duration}분 (차량 소요 시간)</span> : <span className={classes.route_error}>현재 교통상황을 받아올 수 없습니다.</span>} </p>
                            <p className={`card-text ${classes.card_text}`}><MdAttachMoney style={{ marginBottom : '2px '}}/> {props.item.taxiFare ? <span>{props.item.taxiFare}원 (택시 예상 요금)</span> : <span className={classes.route_error}>현재 교통상황을 받아올 수 없습니다.</span>}</p>
                            <p className={`card-text ${classes.card_text}`}><FaPersonWalking style={{ marginBottom : '5px '}}/>  {props.item.roadTotalTime ? <span>{props.item.roadTotalTime}분 (도보 소요 시간)</span> : <span className={classes.route_error}>현재 도보 정보를 받아올 수 없습니다.</span>}</p>
                            <div className={classes.wrapper}>
                                <motion.button onClick={goDetailPlacePage} whileHover={{ scale:1.1 }} className={classes.button}><FaLocationArrow/> 자세히 보기! </motion.button>
                            </div>
                        </motion.div>}
                </div>
            </div>
        </React.Fragment>
        
    );

};

export default PlaceItemCard;