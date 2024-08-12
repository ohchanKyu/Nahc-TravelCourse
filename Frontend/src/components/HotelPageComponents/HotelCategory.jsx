import React from "react";
import classes from "./HotelCategory.module.css";
import { motion } from "framer-motion";
import HotelIcon from "./HotelIcon";
import HotelImage from "../../image/hotel.png";
import MotelImage from "../../image/motel.png";
import PensionImage from "../../image/wooden-house.png";
import ResortImage from "../../image/resort.png";
import { MdCategory } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

const HotelCategory = (props) => {

    const setHotelHandler = (event) => {
        if (event.target.tagName === 'IMG') {
            const type = event.target.alt;
            let image;
            if (type === "호텔"){
                image = HotelImage;
            }else if (type === "펜션 / 풀빌라"){
                image = PensionImage;
            }else if (type === "모텔"){
                image = MotelImage;
            }else{
                image = ResortImage;
            }
            props.onSetHotelType({ type, image });
        } else if (event.target.tagName === 'P') {
            const type = event.target.innerHTML;
            let image;
            if (type === "호텔"){
                image = HotelImage;
            }else if (type === "펜션 / 풀빌라"){
                image = PensionImage;
            }else if (type === "모텔"){
                image = MotelImage;
            }else{
                image = ResortImage;
            }
            props.onSetHotelType({ type, image });
        }else{
            return;
        }
    };

    const variants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
        exit : {opacity : 0, y : 50}
    }

    return (
        <React.Fragment>
            <div className={classes.container}>
                <h4><MdCategory/> 숙박 카테고리 설정하기 </h4>
            </div>
            <div className={classes.category_list}>
                <p className={classes.category_list_header}><FaCheck style={{ marginBottom : '5px'}}/> 선택 가능한 카테고리</p>
                <motion.ul whileInView={'animate'} variants={variants} initial='initial' exit='exit'>
                    <motion.li  whileHover={{ scale:1.2 }} key={HotelImage}><HotelIcon onSetHotel={setHotelHandler} image={HotelImage} title='호텔'/></motion.li>
                    <motion.li  whileHover={{ scale:1.2 }} key={PensionImage}><HotelIcon onSetHotel={setHotelHandler} image={PensionImage} title='펜션'/></motion.li>
                    <motion.li  whileHover={{ scale:1.2 }} key={MotelImage}><HotelIcon onSetHotel={setHotelHandler} image={MotelImage} title='모텔'/></motion.li>
                    <motion.li  whileHover={{ scale:1.2 }} key={ResortImage}><HotelIcon onSetHotel={setHotelHandler} image={ResortImage} title='리조트'/></motion.li>
                </motion.ul>
                <p className={classes.category_list_text}>※ 위의 4가지 항목 중 하나를 선택해주세요.</p>
            </div>
        </React.Fragment>
    );
};

export default HotelCategory;