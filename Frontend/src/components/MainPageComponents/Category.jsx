import React from "react";
import classes from "./Category.module.css";
import { useNavigate } from "react-router-dom";
import Icon from "./Icon";
import { BiSolidMoviePlay } from "react-icons/bi";
import { IoCafe } from "react-icons/io5";
import { MdFoodBank } from "react-icons/md";
import { FaHotel } from "react-icons/fa";
import { SiYourtraveldottv } from "react-icons/si";
import { PiParkFill } from "react-icons/pi";
import { IoGameControllerOutline } from "react-icons/io5";

const Category = () => {
    
    const navigate = useNavigate();

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
        <React.Fragment>
            <div className={classes.category_container}>
                <ul className={classes.category_list}>
                    <li key={BiSolidMoviePlay}><Icon goPageHandler={goMovieDetailPage} icon={BiSolidMoviePlay} title='영화'/></li> 
                    <li key={FaHotel} ><Icon goPageHandler={goHotelDetailPage} icon={FaHotel} title='숙소'/> </li>
                    <li key={MdFoodBank} ><Icon goPageHandler={goFoodStoreDetailPage} icon={MdFoodBank} title='음식점'/> </li>
                    <li key={IoCafe}><Icon goPageHandler={goCafeDetailPage} icon={IoCafe} title='카페'/></li>
                    <li key={PiParkFill}><Icon goPageHandler={goParkPage} icon={PiParkFill} title='공원 및 산책로'/></li>
                    <li key={IoGameControllerOutline}><Icon goPageHandler={goPlayPage} icon={IoGameControllerOutline} title='다양한 놀거리'/></li>
                    <li key={SiYourtraveldottv}><Icon goPageHandler={goTravelCoursePage} icon={SiYourtraveldottv} title='일정 계획'/></li>
                </ul>
            </div>

        </React.Fragment>
    );
};

export default Category;