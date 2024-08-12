import React, { useState } from "react";
import classes from "./PlaceReview.module.css";
import ReviewSummary from "./ReviewSummary";
import StarRatings from "react-star-ratings";
import { FaPen } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import WriteReview from "./WriteReview";

const PlaceReview = (props) => {

    const [isMore,setIsMore] = useState(false);
    const [isWriteReview,setIsWriteReview] = useState(false);

    const showMoreHandler = () => {
        setIsMore(state => {
            return !state;
        })
    }
    

    const allReviews = [];
    if (props.item.reviews){
        if (props.item.reviews.GoogleReview){
            const googleReview = props.item.reviews.GoogleReview;
            for(var i=0;i<googleReview.length;i++){
                allReviews.push(googleReview[i]);
            }
        }
        if (props.item.reviews.UserReview){
            const userReview = props.item.reviews.UserReview;
            for(i=0;i<userReview.length;i++){
                allReviews.push(userReview[i]);
            }
        }
    }
   
    const variants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
        exit : {opacity : 0, y: -30}
    }

    const openWriteReview = () => {
        setIsWriteReview(true);
    }

    const closeWriteReview = () => {
        setIsWriteReview(false);
    }

    return (
        <div className={classes.container}>
            <AnimatePresence>
                {isWriteReview && (
                    <motion.div 
                        variants={variants} animate='animate'
                        initial='initial' exit='exit'
                        className={classes.wrapper}>
                        <WriteReview 
                            onFetchReview={props.onFetchReview}
                            item={props.item} onClose={closeWriteReview}/>
                    </motion.div>
                   
                )}
            </AnimatePresence>
            <AnimatePresence>
            {!isWriteReview && (
                <motion.div  
                    variants={variants} animate='animate'
                    initial='initial' exit='exit'>
                    <h4 className={classes.header}>{props.item.placeName}</h4>
                        <div className={classes.information_box}>
                            <motion.p onClick={openWriteReview} whileHover={{ scale : 1.1 }} className={classes.write}><FaPen style={{ marginBottom:'5px'}}/> 리뷰참여</motion.p>
                            <div className={classes.box}>
                                방문자 리뷰 <span>{props.item.reviewTotalCount}</span>
                                <p className={classes.information}>
                                    구글 리뷰 및 NaHC에 <br/> 등록된 리뷰입니다.
                                </p>
                            </div>
                            
                            {props.item.reviews && (
                                <div className={classes.star_container}>
                                    <div className={classes.star_text}>
                                        <span>{props.item.reviews.totalRating || "NaN"}</span> / 5.0
                                    </div>
                                    {props.item.reviews.totalRating && (
                                        <StarRatings 
                                        rating={parseFloat(props.item.reviews.totalRating)} 
                                        starDimension="25px"
                                        starSpacing="3px"
                                        starRatedColor="#f7cf00"
                                        />
                                    )}
                                    {!props.item.reviews.totalRating && (
                                        <StarRatings 
                                        rating={parseFloat(0)} 
                                        starDimension="25px"
                                        starSpacing="3px"
                                        starRatedColor="#f7cf00"
                                        />
                                    )}
                                </div>
                                ) 
                            }
                        </div>
                        {!isMore && allReviews.length <= 2 && (
                            <motion.div 
                                variants={variants} animate='animate' initial='initial'
                                exit='exit'
                                className={classes.review_box}>
                                <ul className={classes.review_list}>
                                    {props.item.reviewTotalCount === 0 && <p className={classes.message}>등록된 리뷰가 아직 없습니다.</p>}
                                    {props.item.reviewTotalCount !== 0 && props.item.reviews && 
                                        allReviews.map(item => {
                                            return (
                                                <li key={item.text}>
                                                    <ReviewSummary item={item}/>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </motion.div>
                        )}
                        {!isMore && allReviews.length > 2 && (
                            <motion.div 
                                variants={variants} animate='animate' initial='initial'
                                exit='exit'
                                className={classes.review_box}>
                                <ul className={classes.review_list}>
                                    {props.item.reviewTotalCount === 0 && <p className={classes.message}>등록된 리뷰가 아직 없습니다.</p>}
                                    {props.item.reviewTotalCount !== 0 && props.item.reviews && 
                                        allReviews.slice(0, 2).map((review) => (
                                        <li key={review.text}>
                                            <ReviewSummary item={review} />
                                        </li>
                                        ))
                                    }
                                </ul>
                            </motion.div>
                        )}
                        {isMore && (
                            <motion.div 
                                variants={variants} animate='animate' initial='initial'
                                exit='exit'
                                className={classes.review_box}>
                                <ul className={classes.review_list}>
                                    {props.item.reviewTotalCount === 0 && <p className={classes.message}>등록된 리뷰가 아직 없습니다.</p>}
                                    {props.item.reviewTotalCount !== 0 && props.item.reviews && 
                                        allReviews.map(item => {
                                            return (
                                                <li key={item.text}>
                                                    <ReviewSummary item={item}/>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </motion.div>
                        )}
                    {allReviews.length > 2 && (
                            <div className={classes.button_container}>
                                <motion.button 
                                    className={classes.more_button}
                                    whileHover={{ scale : 1.1 }}
                                    onClick={showMoreHandler}>
                                    {isMore && (
                                        <motion.span variants={variants} key={isMore}
                                            animate='animate' exit='exit' initial='initial'
                                        >접기 <IoIosArrowUp style={{ marginBottom : '5px'}}/>
                                        </motion.span>
                                    )}
                                    {!isMore && (
                                        <motion.span 
                                            variants={variants} key={isMore}
                                            animate='animate' exit='exit' initial='initial'
                                        >   전체보기 <IoIosArrowDown  style={{ marginBottom : '5px'}}/>
                                        </motion.span>
                                    )}
                                </motion.button>
                            </div>
                        )}
                    </motion.div>
                 )}
            </AnimatePresence>
        </div>
        
    )
};

export default PlaceReview;