import React, { useState, useEffect } from "react";
import classes from "./SearchPlace.module.css";
import { FaArrowLeft } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { getRecommendPlace, getPlaceImage, getPlaceLocation } from "../../api/LocationApiService";
import { getCarRoute } from "../../api/RouteApiService";
import SelectPlaceIcon from "./SelectPlaceIcon";
import { GrSearchAdvanced } from "react-icons/gr";
import SearchPlaceLoading from "../SearchPlaceLoading";
import useAuthFunction from "../../hooks/useAuthFunction";
import Swal from "sweetalert2";

const SearchPlace = (props) => {

    const [inputPlace,setInputPlace] = useState('');
    const [searchPlaceArray,setSearchPlaceArray] = useState([]);
    const [userInputPlaceArray,setUserInputPlaceArray] = useState([]);
    const [selectPlaceArray,setSelectPlaceArray] = useState([]);
    const [isValid,setIsValid] = useState(true);
    const [message,setMessage] = useState('');
    const [isLoading,setIsLoading] = useState(true);

    const functionHandler = useAuthFunction();

    const inputChangeHandler = (event) => {
        if (event.target.value.trim().length > 0){
            setIsValid(true);
        }
        if (event.target.value.trim().length === 0){
            setUserInputPlaceArray([]);
        }
        setInputPlace(event.target.value);
    };

    const closeModal = () => {
        props.onClose();
    };

    const addPlaceHandler = (newPlace) => {
        const foundPlace = selectPlaceArray.find(item => item.placeName === newPlace.placeName);
        if (selectPlaceArray.length >= 5){
            setIsValid(false);
            setMessage("한번에 최대 5개까지 저장 가능합니다.");
            return;
        }
        if (!foundPlace){
            setIsValid(true);
            setSelectPlaceArray(place => {
                return [...place ,newPlace];
            })
        }else{
            setIsValid(false);
            setMessage("이미 선택하셨습니다!");
        }
    };

    const removeAllPlaceHandler = () => {
        setIsValid(true);
        setSelectPlaceArray([]);
    };

    const removeOnePlaceHandler = (removePlace) => {
        const updatedSearchPlaceArray = selectPlaceArray.filter(place => place !== removePlace);
        setIsValid(true);
        setSelectPlaceArray(updatedSearchPlaceArray);
    };

    const searchPlaceFromUserInputHandler = async () => {
        if (inputPlace.trim().length === 0){
            setIsValid(false);
            setMessage("장소를 입력해주세요!");
            return;
        }
        setIsLoading(true);

        const locationResponseData = await functionHandler(getPlaceLocation,{
            x : props.locationX,
            y : props.locationY,
            placeName : inputPlace,
        })
        const userInputPlaceData = await Promise.all(locationResponseData.map(async element => {
            const fileName = element.placeImage;

            const imageFileResponseData = await functionHandler(getPlaceImage,{
                fileName
            })
            const imageURL = URL.createObjectURL(imageFileResponseData);

            const locationData = {
                originX: props.locationX,
                originY: props.locationY,
                destinationX: element.locationX,
                destinationY: element.locationY
            }
            const carRouteResponseData = await functionHandler(getCarRoute,{
                location : locationData,
            })
            const newElement = {
              ...element,
              image : imageURL,
              distance: carRouteResponseData.distance,
            };
            return newElement;
        }));
        if (userInputPlaceData.length === 0){
            Swal.fire({
                icon: 'error',                        
                title: '검색 실패',         
                html: '입력하신 장소가 없습니다. <br> 다른 장소를 검색해주세요.'
            });
        }
        setIsLoading(false);
        setUserInputPlaceArray(userInputPlaceData);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            searchPlaceFromUserInputHandler();
        }
    }

    const submitHandler = () => {
        const submitTypeItem = selectPlaceArray.map(item => {
            return {
                data : item,
                type : 'PLACE'
            }
        })
        props.onClose();
        props.onSubmit({
            type : 'PLACE',
            data : submitTypeItem
        });
    };

    const variants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
        exit : {opacity : 0, y : 30}
    }

    useEffect(() => {
       const fetchRecommendPlace = async () => {
            setIsLoading(true);

            const getFromAPIPlaceResponseData = await functionHandler(getRecommendPlace,{
                x : props.locationX , y : props.locationY
            })

            const recommendPlaceData = await Promise.all(getFromAPIPlaceResponseData.map(async element => {
                const fileName = element.placeImage;
    
                const imageFileResponseData = await functionHandler(getPlaceImage,{
                    fileName
                })
                const imageURL = URL.createObjectURL(imageFileResponseData);
                const locationData = {
                    originX: props.locationX,
                    originY: props.locationY,
                    destinationX: element.locationX,
                    destinationY: element.locationY
                }
                const carRouteResponseData = await functionHandler(getCarRoute,{
                    location : locationData,
                })
                const newElement = {
                  ...element,
                  image : imageURL,
                  distance: carRouteResponseData.distance,
                };
                return newElement;
            }));
            setIsLoading(false);
            setSearchPlaceArray(recommendPlaceData);
       }
       fetchRecommendPlace();
    },[]);

    return (
        <React.Fragment>
            {isLoading && <SearchPlaceLoading/>}
            <div className={classes.header}>
                <motion.span whileHover={{ color: '#0260be' }}>
                    <FaArrowLeft 
                    className={classes.back_icon} 
                    onClick={closeModal}/> 
                </motion.span>
                <input type='text' name='place'
                placeholder="관광지/맛집/숙소 검색"
                value={inputPlace}
                className={classes.input} 
                onChange={inputChangeHandler}
                onKeyDown={handleKeyDown}/>
                <GrSearchAdvanced onClick={searchPlaceFromUserInputHandler} className={classes.search_icon}/>
            </div>
            <AnimatePresence>
                    {selectPlaceArray.length >= 1 && (
                            <div className={classes.select_container}>
                                <ul className={classes.select_list}>
                                    {selectPlaceArray.map(item => {
                                        return (
                                            <SelectPlaceIcon key={item.locationX}
                                                image={item.image}
                                                placeName={item.placeName}
                                                onRemove={() => removeOnePlaceHandler(item)}/>
                                        )
                                    })}
                                </ul>
                            </div>
                        )
                    }   
            </AnimatePresence>
            
            <div className={classes.recommend_container}>
                    {(userInputPlaceArray.length === 0  || inputPlace.trim().length === 0) && (
                        <motion.div variants={variants} animate='animate' initial='initial'>
                            <p className={classes.recommend_header}>
                                    추천 관광지
                                </p>
                                <ul className={classes.place_list}>
                                    {searchPlaceArray.map(item => {
                                        return (
                                            <li key={item.placeName} className={classes.place}>
                                                <img className={classes.place_image} src={item.image} alt='no-place-select'/>
                                                <div className={classes.place_text}>
                                                    <p className={classes.placeName}>
                                                        {item.placeName}
                                                    </p>
                                                    <span className={classes.distance}>{item.distance} / </span>
                                                    <span className={classes.address}>{item.addressName}</span>
                                                </div>
                                                <motion.button className={classes.select_button}
                                                    data-id='1'
                                                    whileHover={{ scale : 1.1}}
                                                    onClick={() => addPlaceHandler(item)}>
                                                        선택
                                                </motion.button>
                                            </li>
                                        )
                                    })}
                                </ul>
                        </motion.div>
                    )}
                    {(userInputPlaceArray.length !== 0  && inputPlace.trim().length > 0) && (
                        <motion.div variants={variants} animate='animate' initial='initial'>
                            <p className={classes.recommend_header}>
                                    검색 결과
                                </p>
                                <ul className={classes.place_list}>
                                    {userInputPlaceArray.map(item => {
                                        return (
                                            <li key={item.placeName} className={classes.place}>
                                                <img className={classes.place_image} src={item.image} alt='place-select'/>
                                                <div className={classes.place_text}>
                                                    <p className={classes.placeName}>
                                                        {item.placeName}
                                                    </p>
                                                    <span className={classes.distance}>{item.distance} / </span>
                                                    <span className={classes.address}>{item.addressName}</span>
                                                </div>
                                                <motion.button className={classes.select_button}
                                                    data-id='1'
                                                    whileHover={{ scale : 1.1}}
                                                    onClick={() => addPlaceHandler(item)}>
                                                        선택
                                                </motion.button>
                                            </li>
                                        )
                                    })}
                                </ul>
                        </motion.div>
                    )}
                <AnimatePresence>
                    {!isValid && <motion.p key={message} 
                                    variants={variants} animate='animate' initial='initial' exit='exit'    
                                    className={classes.message}>{message}</motion.p>}
                </AnimatePresence>
                
                <AnimatePresence>
                    {selectPlaceArray.length >= 1 && (
                        <motion.div className={classes.button_container}
                                variants={variants}
                                animate='animate'
                                initial='initial'
                                exit='exit'>
                            <motion.button whileHover={{ scale: 1.1}} onClick={removeAllPlaceHandler}>선택 리셋</motion.button>
                            <motion.button whileHover={{ scale: 1.1}} onClick={submitHandler}>선택 완료</motion.button>
                        </motion.div>
                        )
                    }
                   
                </AnimatePresence>
            </div>
        </React.Fragment>
        
    )
};

export default SearchPlace;