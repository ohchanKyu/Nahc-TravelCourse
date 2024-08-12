import React from "react";
import classes from "./DetailPageHeader.module.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MdOutlineCategory } from "react-icons/md";
import { PiSealCheckFill } from "react-icons/pi";
import { BiSolidNavigation } from "react-icons/bi";

const DetailPageHeader = (props) => {

    const navigate = useNavigate();

    const hoverVariants = { scale : 1.1 ,color: 'rgb(233 116 37)'};

    const goMovieDetailPage = () => {
        navigate('/NaHC/movieDetail');
    };

    const goFoodStoreDetailPage = () => {
        navigate('/NaHC/foodStoreDetail');
    };

    const goHotelDetailPage = () => {
        navigate('/NaHC/hotelDetail');
    };

    const goCafeDetailPage = () => {
        navigate('/NaHC/cafeDetail');
    };

    const goTravelCoursePage = () => {
        navigate('/NaHC/travelCourseDetail');
    };

    const goParkPage = () => {
        navigate('/NaHC/parkDetail');
    }

    const goPlayPage = () => {
        navigate('/NaHC/playDetail');
    }

    return (
        <div className={`row ${classes.header_container}`}>
                <div className={`col col-lg-6 ${classes.left_header_container}`}>
                    <h1>
                        Service with <br/>NaHC Application <MdOutlineCategory className={classes.header_icon}/>
                    </h1>
                </div>
                <div className={`col col-lg-6 ${classes.right_header_container}`}>
                    <h1 className={classes.header_sub_text}> Select Category <br/> 
                        <span style={{color:'rgb(233 116 37)'}}>
                            <PiSealCheckFill style={{ marginBottom : '3px'}}/> {props.selectCategory}
                        </span> 
                    </h1>
                    <ul className={classes.nav_list}>
                        <p><BiSolidNavigation style={{ marginBottom : '3px'}}/> Category List</p>
                        <motion.li key={goMovieDetailPage} onClick={goMovieDetailPage} whileHover={hoverVariants}> 영화 </motion.li>
                        <motion.li key={goHotelDetailPage} onClick={goHotelDetailPage} whileHover={hoverVariants}> 숙소 </motion.li>
                        <motion.li key={goFoodStoreDetailPage} onClick={goFoodStoreDetailPage} whileHover={hoverVariants}> 음식점 </motion.li>
                        <motion.li key={goCafeDetailPage} onClick={goCafeDetailPage} whileHover={hoverVariants}> 카페 </motion.li>
                        <motion.li key={goParkPage} onClick={goParkPage} whileHover={hoverVariants}> 공원 및 산책로 </motion.li>
                        <motion.li key={goPlayPage} onClick={goPlayPage} whileHover={hoverVariants}> 다양한 놀거리 </motion.li>
                        <motion.li key={goTravelCoursePage} onClick={goTravelCoursePage} whileHover={hoverVariants}> 일정 계획</motion.li>
                    </ul>
                </div>
            </div>
    )
};

export default DetailPageHeader;