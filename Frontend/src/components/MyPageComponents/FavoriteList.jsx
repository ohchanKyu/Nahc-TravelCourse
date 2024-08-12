import React, { useState, useEffect, useContext } from "react";
import classes from "./FavoriteList.module.css";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import loginContext from "../../store/login-context";
import { deleteFavoritePlace, getFavoritePlaces } from "../../api/FavoritePlaceApiService";
import { getPlaceImage } from "../../api/LocationApiService";
import SetTimeOutModal from "../SetTimeOutModal";
import useAuthFunction from "../../hooks/useAuthFunction";
import PlaceDetailModal from "../../layout/PlaceDetailModal";
import PlaceDetail from "../MainPageComponents/PlaceDetail";

const FavoriteList = () => {

    const [favoritePlace,setFavoritePlace] = useState([]);
    const [showCheckModal, setShowCheckModal] = useState(false);
    const [modalMessage,setModalMessage] = useState('');
    const [isPlaceDetail, setIsPlaceDetail] = useState(false);
    const [detailPlace,setDetailPlace] = useState(null);

    const loginCtx = useContext(loginContext);
    const functionHandler = useAuthFunction();

    const userId = loginCtx.id;

    const goDetailPlacePage = (item) => {
       setDetailPlace(item);
       setIsPlaceDetail(true);
    };

    const closePlaceDetail = () => {
        setIsPlaceDetail(false);
    };

    const getFavoritePlacesHandler = async () => {
        const getFavoritePlacesResponseData = await functionHandler(getFavoritePlaces,{
            userId
        })
        const favoritePlaceData = await Promise.all(getFavoritePlacesResponseData.map(async element => {
            
            const fileName = element.placeImage;

            const imageFileResponseData = await functionHandler(getPlaceImage,{
                fileName
            })
            const imageURL = URL.createObjectURL(imageFileResponseData);
            const newElement = {
              ...element,
              image : imageURL,
            };
            return newElement;
        }));
        setFavoritePlace(favoritePlaceData);
    } 

    const deleteFavoritePlaceHandler = async (placeId) => {

        const deleteFavoritePlaceResponseData = await functionHandler(deleteFavoritePlace,{
            userId,placeId
        })
        if (deleteFavoritePlaceResponseData === "Delete Success"){
            setShowCheckModal(true);
            setModalMessage("즐겨찾기에서 해제합니다.")
       }else{
            setShowCheckModal(true);
            setModalMessage("다시 시도해주세요.")
       }
       getFavoritePlacesHandler();
    };


    
    useEffect(() => {
       getFavoritePlacesHandler();
     },[]);

     const variants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
        exit : {opacity : 0, y: -30}
    }


    return (
        <React.Fragment>
            {isPlaceDetail && (
                <PlaceDetailModal onClose={closePlaceDetail}>
                    <PlaceDetail 
                        item={detailPlace}
                        onClose={closePlaceDetail}/>
                </PlaceDetailModal>
            )}
            <SetTimeOutModal message={modalMessage} showModal={showCheckModal} setShowModal={setShowCheckModal} />
            <div className={classes.container}>
                <h5># 나의 장소 목록</h5>
                {favoritePlace.length > 0 && <p className={classes.number}>총 {favoritePlace.length}건 등록</p>}
                {favoritePlace.length ===  0 && <p className={classes.message}>아직 등록된 즐겨찾기가 없습니다.</p>}
                <div className={classes.favorite_list_box}>
                    <ul className={classes.favorite_list}>
                        <AnimatePresence>
                            {favoritePlace.map(item => {
                                return (
                                    <motion.li 
                                        variants={variants} 
                                        animate='animate'
                                        initial='initial'
                                        exit='exit'
                                        className={classes.favorite} key={item.id}>
                                        <img src={item.image} alt='favorite_image' className={classes.favorite_image}/>
                                        <div className={classes.favorite_text_box}>
                                            <p className={classes.favorite_place_name}>
                                                {item.placeName}
                                            </p>
                                            <p className={classes.favorite_address_name}>
                                                <FaLocationDot/> {item.addressName}
                                            </p>
                                            <p className={classes.favorite_phone_number}>
                                                <FaPhoneAlt/> {item.phoneNumber ? item.phoneNumber : <span>등록된 번호가 없습니다.</span>}
                                            </p>
                                            <div className={classes.button_container}>
                                                <motion.button whileHover={{scale:1.1}}
                                                onClick={() => goDetailPlacePage(item)}
                                                >장소 자세히 보기</motion.button>
                                                <motion.button
                                                    onClick={() => deleteFavoritePlaceHandler(item.id)} 
                                                    whileHover={{scale:1.1}}>즐겨찾기 해제</motion.button>
                                            </div>
                                        </div>
                                    </motion.li>
                                )
                            })}
                        </AnimatePresence>
                    </ul>
                </div>
            </div>
        </React.Fragment>
    )
};

export default FavoriteList;