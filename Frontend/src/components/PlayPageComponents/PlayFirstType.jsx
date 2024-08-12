import React, { useState } from "react";
import classes from "./PlayFirstType.module.css";
import PlaceIcon from "./PlaceIcon";
import pc_room_image from '../../image/pc_room.png';
import songImage from '../../image/microphone.png';
import barImage from "../../image/bar.png";
import shoppingImage from '../../image/shopping.png';
import roomEscapeImage from "../../image/escape.png";
import { motion } from "framer-motion"; 
import { FaCheck } from "react-icons/fa";

const PlayFirstType = (props) => {

    const [selectPlace, setSelectPlace] = useState(null);

    const setPlaceHandler = (event) => {
        if (event.target.tagName === 'IMG') {
            const place = event.target.alt;
            setSelectPlace(place);
            props.onSelectPlace(place);
        } else if (event.target.tagName === 'P') {
            const place = event.target.innerHTML;
            setSelectPlace(place);
            props.onSelectPlace(place);
        }else{
            return;
        }
    }

    const variants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
        exit : {opacity : 0, y : 50}
    }

    return (
        <React.Fragment>
            <div className={classes.container}>
                <div className={classes.category_list}>
                    <p className={classes.category_list_header}><FaCheck style={{ marginBottom : '5px'}}/> 선택 가능한 카테고리</p>
                    <motion.ul whileInView={'animate'} variants={variants} initial='initial' exit='exit'>
                        <motion.li  whileHover={{ scale:1.2 }} key={pc_room_image}><PlaceIcon onSetPlace={setPlaceHandler} image={pc_room_image} title='PC방'/></motion.li>
                        <motion.li  whileHover={{ scale:1.2 }} key={songImage}><PlaceIcon onSetPlace={setPlaceHandler} image={songImage} title='노래방'/></motion.li>
                        <motion.li  whileHover={{ scale:1.2 }} key={roomEscapeImage}><PlaceIcon onSetPlace={setPlaceHandler} image={roomEscapeImage} title='방탈출'/></motion.li>
                    </motion.ul>
                    <motion.ul whileInView={'animate'} variants={variants} initial='initial' exit='exit'>
                        <motion.li  whileHover={{ scale:1.2 }} key={barImage}><PlaceIcon onSetPlace={setPlaceHandler} image={barImage} title='술집'/></motion.li>
                        <motion.li  whileHover={{ scale:1.2 }} key={shoppingImage}><PlaceIcon onSetPlace={setPlaceHandler} image={shoppingImage} title='백화점'/></motion.li>
                    </motion.ul>
                    {selectPlace && <motion.p variants={variants} key={selectPlace}
                        animate='animate'
                        initial='initial'
                        exit='exit'
                        className={classes.select_message}>
                            {selectPlace+' 선택 완료!'}
                        </motion.p>}
                    {!selectPlace && <p className={classes.not_select_message}> 아직 선택하지 않았습니다! </p>}
                    <p className={classes.category_list_text}>※ 위의 4가지 항목 중 하나를 선택해주세요.</p>
                </div>
            </div>
        </React.Fragment>
    );

};

export default PlayFirstType;