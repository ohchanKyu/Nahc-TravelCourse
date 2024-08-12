import React, { useEffect, useState, useContext } from "react";
import classes from "./MyReview.module.css";
import useAuthFunction from "../../hooks/useAuthFunction";
import { getAllReview, deleteReview, getReviewImage } from "../../api/ReviewApiService";
import loginContext from "../../store/login-context";
import { motion, AnimatePresence } from "framer-motion";
import StarRatings from "react-star-ratings";
import { getOnePlace, getPlaceImage } from "../../api/LocationApiService";
import PlaceDetail from "../MainPageComponents/PlaceDetail";
import PlaceDetailModal from "../../layout/PlaceDetailModal";
import SetTimeOutModal from "../SetTimeOutModal";
import Swal from "sweetalert2";
import Modal from "../../layout/Modal";
import EditReview from "./EditReview";
import { BiSolidNavigation } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";


const MyReview = () => {

    const [reviews,setReviews] = useState([]);
    const [isPlaceDetail, setIsPlaceDetail] = useState(false);
    const [showCheckModal, setShowCheckModal] = useState(false);
    const [modalMessage,setModalMessage] = useState('');
    const [detailPlace,setDetailPlace] = useState(null);
    const [isEdit,setIsEdit] = useState(false);
    const [editPlace,setEditPlace] = useState(null);
    const functionHandler = useAuthFunction();

    const loginCtx = useContext(loginContext);

    const goDetailPlacePage = (item) => {
        setDetailPlace(item);
        setIsPlaceDetail(true);
    };
 
     const closePlaceDetail = () => {
         setIsPlaceDetail(false);
    };

    const openEditHandler = (editItem) => {
        setEditPlace(editItem);
        setIsEdit(true);
    }

    const closeEditHandler = () => {
        setIsEdit(false);
    }

    const deleteFavoriteReviewHandler = async (reviewId) => {
        Swal.fire({
            icon: "warning",
            title: "리뷰 삭제",
            text: `리뷰를 정말 삭제 하시겠습니까??`,
            showCancelButton: true,
            confirmButtonText: "삭제",
            cancelButtonText: "취소",
        }).then(async (res) => {
            if (res.isConfirmed) {
                const deleteReviewResponseData = await functionHandler(deleteReview,{
                    reviewId
                })
                if (deleteReviewResponseData === "Delete Success"){
                    setShowCheckModal(true);
                    setModalMessage("리뷰를 삭제하였습니다.")
                }else{
                    setShowCheckModal(true);
                    setModalMessage("다시 시도해주세요.")
                }
                getAllReviewHandler();
            }
        });
    };

    const variants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
        exit : {opacity : 0, y: -30}
    }

    const getAllReviewHandler = async () => {
        let reviewReponseData = await functionHandler(getAllReview,{
            userId : loginCtx.id
        });
        const fetchReviewList = [];
        for(let i=0;i<reviewReponseData.length;i++){
            const fetchReviewImageList = [];
            const uploadFile = [];
            for(let j=0;j<reviewReponseData[i].reviewImage.length;j++){
                const reviewImage = await functionHandler(getReviewImage,{
                    fileName : reviewReponseData[i].reviewImage[j]
                })
                const reviewImageURL = URL.createObjectURL(reviewImage);
                fetchReviewImageList.push(reviewImageURL);

                const fileName = reviewReponseData[i].reviewImage[j];
                const file = new File([reviewImage], fileName, { type: "application/json" });
                uploadFile.push(file);
            }
            reviewReponseData[i] = {
                ...reviewReponseData[i],
                reviewImage : fetchReviewImageList,
                uploadFile
            }
            const placeId = reviewReponseData[i].placeId;
            let placeReponseData = await functionHandler(getOnePlace,{
                placeId
            })
            const fileName = placeReponseData.placeImage;
            const imageResponseData = await functionHandler(getPlaceImage,{
                fileName
            })
            const imageUrl = URL.createObjectURL(imageResponseData);
            placeReponseData = {
                ...placeReponseData,
                image : imageUrl
            }
            fetchReviewList.push({
                ...reviewReponseData[i],
                place : placeReponseData
            })
        }
        setReviews(fetchReviewList);
    };

    useEffect(() => {
        getAllReviewHandler();
    },[])

    return (
        <React.Fragment>
            <SetTimeOutModal message={modalMessage} showModal={showCheckModal} setShowModal={setShowCheckModal} />
            {isEdit && (
                <Modal>
                    <EditReview item={editPlace} 
                        onFetchReview={getAllReviewHandler}
                        onClose={closeEditHandler}/>
                </Modal>
            )}
            {isPlaceDetail && (
                <PlaceDetailModal onClose={closePlaceDetail}>
                    <PlaceDetail 
                        item={detailPlace}
                        onClose={closePlaceDetail}/>
                </PlaceDetailModal>
            )}
            <div className={classes.container}>
                <h5># 나의 리뷰 목록</h5>
                {reviews.length > 0 && <p className={classes.number}>총 {reviews.length}건 등록</p>}
                {reviews.length ===  0 && <p className={classes.message}>아직 등록된 리뷰가 없습니다.</p>}
                <div className={classes.review_list_box}>
                    <ul className={classes.review_list}>
                        <AnimatePresence>
                            {reviews.map(item => {
                                return (
                                    <motion.li 
                                        variants={variants} 
                                        animate='animate'
                                        initial='initial'
                                        exit='exit'
                                        className={classes.review} key={item.id}>
                                        <div className={classes.header_container}>
                                            <img src={item.place.image} alt='place_image' className={classes.place_image}/>
                                            <div className={classes.header_text}>
                                                <h4 className={classes.place_name}>{item.place.placeName}</h4>
                                                <StarRatings
                                                    rating={parseFloat(item.rating)} 
                                                    starDimension="25px"
                                                    starSpacing="3px"
                                                    starRatedColor="#f7cf00"
                                                />
                                                <p className={classes.date}>{item.registerDate} 등록</p>
                                            </div>
                                        </div>
                                        <div className={classes.text_box}>
                                            <p className={classes.text_box_header}># My Review</p>  
                                                                                  
                                            <p className={classes.review_text}>
                                                {item.text}
                                            </p>
                                            {item.reviewImage.length > 0 && (
                                                <ul className={classes.image_list}>
                                                    {/* <p className={classes.text_box_header}># Image</p>             */}
                                                    {item.reviewImage.map(item => {
                                                        return (
                                                            <img className={classes.review_image} 
                                                                alt='review-image'
                                                                src={item} 
                                                                key={item}/>
                                                        )
                                                    })}
                                                </ul>
                                            )}
                                            <div className={classes.button_container}>
                                                <motion.button 
                                                    whileHover={{ scale : 1.1 }}
                                                    onClick={() => goDetailPlacePage(item.place)}><BiSolidNavigation style={{marginBottom:'5px'}}/> 장소 자세히보기</motion.button>
                                                <motion.button 
                                                    whileHover={{ scale : 1.1 }}
                                                    onClick={() => openEditHandler(item)}><FaEdit style={{marginBottom:'5px'}}/> 수정하기</motion.button>
                                                <motion.button 
                                                    whileHover={{ scale : 1.1 }}
                                                    onClick={() => deleteFavoriteReviewHandler(item.id)}><FaTrashCan style={{marginBottom:'5px'}}/> 삭제하기</motion.button>
                                            </div>
                                        </div>
                                    </motion.li>
                                )
                            })} 
                        </AnimatePresence>
                    </ul>
                </div>
            </div>
        </React.Fragment>
    )
};

export default MyReview;