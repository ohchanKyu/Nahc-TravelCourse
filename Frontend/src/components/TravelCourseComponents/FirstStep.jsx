import React, { useState } from "react";
import classes from "./FirstStep.module.css";
import { motion } from "framer-motion";
import { FaSearchLocation } from "react-icons/fa";
import { useDaumPostcodePopup } from 'react-daum-postcode';
import Jeju from "../../image/jeju.jpg";
import Busan from "../../image/busan.jpg";
import Sokcho from "../../image/sokcho.jpg";
import Seoul from '../../image/seoul.jpg';
import KoreaPlaceIcon from "./KoreaPlaceIcon";
import { FaPaperPlane } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";

const scriptUrl = process.env.REACT_APP_DAUM_POST_CODE;

const FirstStep = (props) => {

    const [place,setPlace] = useState(null);
    const [isValid,setIsValid] = useState(true);
    const [errorMessage,setErrorMessage] = useState('');

    const placeHandler = (place) => {
        setPlace(place);
    }

    const setImagePlaceHandler = (event) => {
        if (event.target.tagName === 'IMG') {
            const place = event.target.alt;
            placeHandler(place);
        } else if (event.target.tagName === 'P') {
            const place = event.target.innerHTML;
            placeHandler(place);
        }else{
            return;
        }
    }

    const passStepHandler = () => {
        if (!place){
            setIsValid(false);
            setErrorMessage("장소를 선택해주세요!")
            return;
        }
        props.onPass(place);
    }

    const open = useDaumPostcodePopup(scriptUrl);

    const handleComplete = (data) => {
      let fullAddress = data.address;
      let extraAddress = '';
  
      if (data.addressType === 'R') {
        if (data.bname !== '') {
          extraAddress += data.bname;
        }
        if (data.buildingName !== '') {
          extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
        }
        fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
      }
      setPlace(fullAddress);
    };
  
    const handleClick = () => {
      open({ onComplete: handleComplete });
    };

    const variants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
        exit : {opacity : 0, y : 50}
    }


    return (
        <div className={classes.container}>
            <h4><FaPaperPlane/> 어디로 떠나시나요?</h4>
            <div className={classes.place_list_header}>추천 장소!</div>
            <ul className={classes.place_list}>
                <motion.li  whileHover={{ scale:1.1 }} key={Jeju}><KoreaPlaceIcon onSetPlace={setImagePlaceHandler} image={Jeju} title='제주도'/></motion.li>
                <motion.li  whileHover={{ scale:1.1 }} key={Busan}><KoreaPlaceIcon onSetPlace={setImagePlaceHandler} image={Busan} title='부산'/></motion.li>
                <motion.li  whileHover={{ scale:1.1 }} key={Sokcho}><KoreaPlaceIcon onSetPlace={setImagePlaceHandler} image={Sokcho} title='속초'/></motion.li>
                <motion.li  whileHover={{ scale:1.1 }} key={Seoul}><KoreaPlaceIcon onSetPlace={setImagePlaceHandler} image={Seoul} title='서울'/></motion.li>
            </ul>
            <p className={classes.address_header}>
                <motion.span onClick={handleClick} 
                    whileHover={{ color:'rgb(233 116 37)'}}> 
                    <FaSearchLocation style={{ marginBottom : '5px'}}/> 장소 찾기
                </motion.span>
            </p>
            <p className={classes.place_result}>
                현재 주소 또는 명소 
            </p>
            <div className={classes.result}>
                <FaArrowCircleRight style={{ marginBottom : '5px', marginRight : '5px'}}/>
                <motion.span 
                    variants={variants} 
                    key={place} 
                    initial='initial'
                    exit='exit'
                    animate='animate'>
                    {!place && <span className={classes.message}>아직 등록된 장소가 없습니다.</span>}{place}
                </motion.span>
            </div>
            {!isValid && <motion.p 
                key={isValid}
                animate='animate'
                initial='initial'
                exit='exit'
                variants={variants}
                className={classes.error_messgage}>
                    {errorMessage}
            </motion.p>}
            <motion.button 
                whileHover={{ scale : 1.1 }}
                onClick={passStepHandler}
                className={classes.submit_button}>등록하기!
            </motion.button>
        </div>
    );
};

export default FirstStep;