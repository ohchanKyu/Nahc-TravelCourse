import React, { useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import classes from "./Address.module.css"
import { motion } from 'framer-motion';
import { FaSearchLocation } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";

const scriptUrl = process.env.REACT_APP_DAUM_POST_CODE;

const Address = (props) => {

  const [address,setAddress] = useState('');  

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
    setAddress(fullAddress);
    props.locationHandler(fullAddress);
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
    <React.Fragment>
       <p className={classes.address_header}> <motion.span onClick={handleClick} whileHover={{ color:'rgb(233 116 37)'}}><FaSearchLocation/> 주소검색</motion.span> </p>
       <p className={classes.address_text}>위의 주소검색 글자를 클릭해서 정확한 주소를 입력해주세요. </p>
       <p className={classes.address_text}>현재 입력 주소</p>
       <motion.p className={classes.address_text} style={{color:'#3c3c3c'}}
           variants={variants}
           initial="initial"
           animate="animate"
           exit="exit"
           key={address}
       >
        <FaArrowCircleRight style={{ marginBottom : '5px'}}/> {address}
      </motion.p>
    </React.Fragment>
  );
};

export default Address;