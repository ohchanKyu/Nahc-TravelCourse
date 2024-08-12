import React, { useState, useRef, useContext, useEffect } from "react";
import classes from "./EditReview.module.css";
import useAuthFunction from "../../hooks/useAuthFunction";
import loginContext from "../../store/login-context";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import StarRatings from "react-star-ratings";
import { FaPlus } from "react-icons/fa6";
import ReviewImage from "../MainPageComponents/ReviewImage";
import moment from "moment";
import { editReview } from "../../api/ReviewApiService";

const EditReview = (props) => {

    const [starRating,setStarRating] = useState(0);
    const [starMessage,setStarMessage] = useState('별점을 선택해주세요.');
    const [text, setText] = useState(props.item.text);
    const [state,setState] = useState({
        valid : true,
        message : ''
    });
    const [imageFileList, setImageFileList] = useState([]);
    const fileInputRef = useRef(null);

    const functionHandler = useAuthFunction();
    const loginCtx = useContext(loginContext);

    const changeStarRatingHandler = (rate) => {
        setState(item => {
            return {
                ...item,
                valid:true,
            }
        })
        switch (rate){
            case 1 : {
                setStarMessage("별로예요");
                break;
            }
            case 2 : {
                setStarMessage("조금 아쉬워요");
                break;
            }
            case 3 : {
                setStarMessage("주위에 있다면 가볼만해요");
                break;
            }
            case 4 : {
                setStarMessage("꽤 가볼만해요");
                break;
            }
            case 5 : {
                setStarMessage("꼭 가야 하는 곳이에요");
                break;
            }
        }
        setStarRating(rate);
    };

    useEffect( () => {
        changeStarRatingHandler(props.item.rating);
        const initialImageState = [];
        for (let i=0;i<props.item.reviewImage.length;i++){
            initialImageState.push({
                id : Math.random(),
                uploadFile : props.item.uploadFile[i],
                file : props.item.reviewImage[i]
            })
        }
        setImageFileList(initialImageState);
    },[])

    const changeTextHandler = (event) => {
        setState(item => {
            return {
                ...item,
                valid:true,
            }
        })
        setText(event.target.value);
    }

    const onchangeImageUpload = (event) => {
        const {files} = event.target;
        if (files){
            const uploadFile = files[0];
            const reader = new FileReader();
            reader.readAsDataURL(uploadFile);
            reader.onloadend = ()=> {
                setImageFileList(state => {
                    return [...state,{
                        id : Math.random(),
                        uploadFile : uploadFile,
                        file : reader.result
                    }]
                });
            }
        }
    };

    const removeOneImageFile = (id) => {
        const newArray = imageFileList.filter(item => item.id !== id);
        setImageFileList(newArray);
    };

    const boxClickHandler = () => {
        fileInputRef.current.click();
        fileInputRef.current.value = null; // 동일 사진 허용
    }

    const submitReviewHandler = async () => {
        if (text.trim().length === 0){
            setState(item => {
                return {
                    ...item,
                    valid :false,
                    message : '내용을 입력해주세요!'
                }
            })
            return;
        }
        if (text.trim().length > 490){
            setState(item => {
                return {
                    ...item,
                    valid :false,
                    message : '최대 500자까지만 작성가능합니다.'
                }
            })
            return;
        }
        if (starRating === 0){
            setState(item => {
                return {
                    ...item,
                    valid :false,
                    message : '별점을 선택해주세요.'
                }
            })
            return;
        }
        const currentDate = new Date();
        const formattedDate  = moment(currentDate).format("YYYY-MM-DD");

        const formData = new FormData();
        const userReview = {
            id : props.item.id,
            userId : loginCtx.id,
            placeId : props.item.place.id,
            author : loginCtx.name,
            text : text,
            registerDate : formattedDate,
            rating : starRating,
            reviewImage : []
        };
        for(let i=0;i<imageFileList.length;i++){
            formData.append('file',imageFileList[i].uploadFile);
        }
        formData.append('userReview', new Blob([JSON.stringify(userReview)], { type: 'application/json' }));
        const editReviewResponseData = await functionHandler(editReview,{
            data : formData
        })
        if (editReviewResponseData){
            Swal.fire({
                icon: 'success',                        
                title: '리뷰 수정 완료',         
                html: '리뷰를 수정하였습니다. <br> 확인해보세요!'
            });
            props.onFetchReview();
            props.onClose();
        }
    }

    const variants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
        exit : {opacity : 0, y: -30}
    }

    return (
        <div className={classes.container}>
            <h4 className={classes.header}>{props.item.place.placeName}</h4>
            <div className={classes.star_container}>
                <StarRatings 
                    rating={starRating}
                    changeRating={changeStarRatingHandler}
                    starRatedColor="#f7cf00"
                    starHoverColor="#f7cf00"
                    starDimension="35px"
                    starSpacing="3px"
                />
                <motion.p 
                    variants={variants}
                    animate='animate' initial='initial' key={starMessage}
                    className={classes.star_text}>{starMessage}</motion.p>
            </div>
            <div className={classes.text_container}>
                <textarea
                    placeholder="· 직접 경험한 솔직한 리뷰를 남겨주세요. &#13;· 사진은 3개까지 첨부가능합니다. &#13;· 최대 500자까지 작성가능합니다."
                    value={text}
                    onChange={changeTextHandler}
                ></textarea>
            </div>
            <AnimatePresence>
                {!state.valid && <motion.p key={state.message}
                    exit='exit'
                    animate='animate' initial='initial' variants={variants}
                    className={classes.message}>{state.message}</motion.p>}
            </AnimatePresence>
            <div className={classes.file_container}>
                <AnimatePresence>
                    {imageFileList.length < 3 && (
                        <motion.div 
                            variants={variants}
                            animate='animate' initial='initial' exit='exit'
                            onClick={boxClickHandler}
                            whileHover={{ scale : 1.1 }}
                            className={classes.plus_box}>
                            <FaPlus className={classes.plus_button}/>
                        </motion.div>
                    )}
                </AnimatePresence>
                <input  style={{ display: 'none' }} 
                    type='file' accept="image/*" ref={fileInputRef}
                    onChange={onchangeImageUpload}/>
                {imageFileList.length !== 0 && (
                    imageFileList.map(item => {
                        return (
                           <ReviewImage key={item.id}
                                id={item.id}
                                onRemove={removeOneImageFile}
                                image={item.file}
                           />
                        )
                    })
                )}
            </div>
            <div className={classes.button_container}>
                <motion.button 
                    whileHover={{ scale : 1.1 }}
                    className={classes.cancel_button} 
                    onClick={props.onClose}>취소
                </motion.button>
                <motion.button 
                    whileHover={{ scale : 1.1 }}
                    className={classes.submit_button} 
                    onClick={submitReviewHandler}>수정
                </motion.button>
            </div>
        </div>
    )
};

export default EditReview;