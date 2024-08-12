import React, { useState } from "react";
import classes from "./MyPage.module.css";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { SiYourtraveldottv } from "react-icons/si";
import { FaUserCog } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import FavoriteList from "../../components/MyPageComponents/FavoriteList";
import MyInformation from "../../components/MyPageComponents/MyInformation";
import MyTravelList from "../../components/MyPageComponents/MyTravelList";
import Footer from "../../components/Footer";
import DetailPageHeader from "../../components/BaseComponents/DetailPageHeader";
import MyReview from "../../components/MyPageComponents/MyReview";

const MyPage = () => {
    
    const [type,setType] = useState(1);
    
    const typeHandler = (type) => {
        if (type === 'favorite'){
            setType(1);
        }else if (type === 'travel'){
            setType(2);
        }else if (type === 'information'){
            setType(3);
        }else if (type === 'review'){
            setType(4);
        }
    };

    const variants = {
        initial : { opacity : 0, y : -30 },
        animate : { opacity : 1, y: 0 }
    }
    return (
        <React.Fragment>
            <DetailPageHeader selectCategory='My Page'/>
            <div className={classes.my_list_container}>
                <div className={classes.select_container}>
                    <div
                        onClick={() => typeHandler('favorite')} 
                        className={`${classes.favorite_list} 
                        ${type === 1 ? classes.select : ''}`}>
                        <FaStar style={{ marginBottom : '5px'}}/> 즐겨찾기 
                    </div>
                    <div 
                        onClick={() => typeHandler('review')} 
                        className={`${classes.review_list} 
                        ${type === 4 ? classes.select : ''}`}>
                        <MdRateReview style={{ marginBottom : '5px'}}/> 내 리뷰
                    </div>
                    <div 
                        onClick={() => typeHandler('travel')} 
                        className={`${classes.travel_list} 
                        ${type === 2 ? classes.select : ''}`}>
                        <SiYourtraveldottv style={{ marginBottom : '5px'}}/> 여행일정
                    </div>
                    <div 
                        onClick={() => typeHandler('information')} 
                        className={`${classes.information_list} 
                        ${type === 3 ? classes.select : ''}`}>
                        <FaUserCog style={{ marginBottom : '5px'}}/> 내 정보
                    </div>
                </div>
                <motion.div 
                    key={type}
                    variants={variants}
                    initial='initial' animate='animate'
                    className={classes.content_container}>
                    {type === 1 && <FavoriteList/>}
                    {type === 2 && <MyTravelList/>}
                    {type === 3 && <MyInformation/>}
                    {type === 4 && <MyReview/>}
                </motion.div>
            </div>
            <Footer/>
        </React.Fragment>
    )
};

export default MyPage;