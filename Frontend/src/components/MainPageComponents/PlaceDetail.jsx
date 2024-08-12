import React, { useState, useEffect } from "react";
import classes from "./PlaceDetail.module.css";
import PlaceInformation from "./PlaceInformation";
import PlaceReview from "./PlaceReview";
import useAuthFunction from "../../hooks/useAuthFunction";
import { getPlaceDetail } from "../../api/LocationApiService";
import SearchPlaceLoading from "../SearchPlaceLoading";
import { getReviewImage } from "../../api/ReviewApiService";

const PlaceDetail = (props) => {

    const [placeDetail,setPlaceDetail] = useState({});
    const [isLoading,setIsLoading] = useState(false);
    const functionHandler = useAuthFunction();

    const getFetchPlaceDetail = async () => {
        setIsLoading(true);
        let data = props.item;
        let placeDetailResponseData = await functionHandler(getPlaceDetail,{
            id : props.item.id,
            googlePlaceId : props.item.googlePlaceId
        })
        const reviewsData = placeDetailResponseData.reviews;
        const fetchUserReview = [];
        let reviewTotalCount = 0;
        if (reviewsData.GoogleReview){
            reviewTotalCount += reviewsData.GoogleReview.length;                
        }
        if (reviewsData.UserReview){
            reviewTotalCount += reviewsData.UserReview.length;
            const userReview = reviewsData.UserReview;
            for(var i=0;i<userReview.length;i++){
                const review = userReview[i];
                const reviewImageData = [];
                if (review.reviewImage.length !== 0){
                    for(let j=0;j<review.reviewImage.length;j++){
                        const imageResponseData = await functionHandler(getReviewImage,{
                            fileName : review.reviewImage[j]
                        });
                        const imageUrl =  URL.createObjectURL(imageResponseData);
                        reviewImageData.push(imageUrl);
                    }
                }
                const fetchReview = {
                    ...review,
                    reviewImage : reviewImageData
                }
                fetchUserReview.push(fetchReview);
            }
            
        }
        placeDetailResponseData.reviews.UserReview = fetchUserReview;
        data = {
            ...data,
            ...placeDetailResponseData,
            reviewTotalCount
        }
        setPlaceDetail(data);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    useEffect(() => {
        getFetchPlaceDetail();
    },[]);

    return (
        <React.Fragment>
            {isLoading && <SearchPlaceLoading/>}
            <div className={`row ${classes.detail_container}`}>      
                <div className={`col col-lg-6 ${classes.information_container}`}>
                    <PlaceInformation item={placeDetail}/>
                </div>
                <div className={`col col-lg-6 ${classes.review_container}`}>
                    <PlaceReview 
                        onFetchReview={getFetchPlaceDetail}
                        item={placeDetail}/>
                </div>
            </div>
        </React.Fragment>
    )
};

export default PlaceDetail;