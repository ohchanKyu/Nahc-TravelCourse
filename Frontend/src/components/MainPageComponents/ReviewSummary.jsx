import React, { useState } from "react";
import classes from "./ReviewSummary.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import StarRatings from "react-star-ratings";

const ReviewSummary = (props) => {

    const [isDetail,setIsDetail] = useState(false);
  
    const detailHandler = () => {
        setIsDetail(state => {
            return !state;
        })
    };

    const variants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
        exit : {opacity : 0, y: -30}
    }
    return (
        <React.Fragment>
            <div className={classes.container}>
                <h4 className={classes.author}>{props.item.author}님</h4>
                <div className={classes.star_container}>
                    <StarRatings 
                        rating={parseFloat(props.item.rating)} 
                        starDimension="20px"
                        starSpacing="2px"
                        starRatedColor="#f7cf00"
                    />
                    <p className={classes.registerDate}>{props.item.registerDate} 등록</p>
                </div>
                <AnimatePresence>
                    {isDetail && (
                        <motion.div 
                            variants={variants} 
                            animate='animate' 
                            initial='initial'
                            className={classes.main_box}>
                            {props.item.reviewImage &&  (
                                <ul className={classes.image_list}>
                                    {props.item.reviewImage.map(item => {
                                        return (
                                            <div className={classes.Fragment}>
                                                <img key={item} src={item} className={classes.image} alt='review-image'/>
                                            </div>
                                            
                                        )
                                    })}
                                </ul>
                            )}
                            <div className={classes.flex_box}>
                                <p className={classes.detail_text}>{props.item.text}</p>
                                <IoIosArrowDown 
                                    style={{ cursor : 'pointer', marginTop:'auto'}}
                                    className={`${classes.rotate180} ${isDetail ? classes.active : ''}`} 
                                    onClick={detailHandler}/>  
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {!isDetail && (
                        <motion.div 
                            variants={variants} 
                            animate='animate' 
                            initial='initial'
                            className={classes.main_box}>
                            <div className={classes.flex_box}>
                                <p className={classes.text}>{props.item.text}</p>
                                <IoIosArrowDown 
                                    style={{ cursor : 'pointer', marginTop:'auto'}}
                                    className={`${classes.rotate180} ${isDetail ? classes.active : ''}`} 
                                    onClick={detailHandler}/>   
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </React.Fragment>
       
    );
};

export default ReviewSummary;