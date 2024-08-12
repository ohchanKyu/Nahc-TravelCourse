import React, { useState } from "react";
import classes from "./HotelPage.module.css";
import Footer from "../../components/Footer";
import HotelCategory from "../../components/HotelPageComponents/HotelCategory";
import HotelSelect from "../../components/HotelPageComponents/HotelSelect";
import { getLocaleByAddress , getPlaceLocation } from "../../api/LocationApiService";
import { motion } from "framer-motion";
import PlaceItemCarousel from "../../components/MainPageComponents/PlaceItemCarousel";
import Modal from "../../layout/Modal";
import NotSelectTypeModal from "../../components/MainPageComponents/NotSelectTypeModal";
import Loading from "../../components/Loading";
import useAuthFunction from "../../hooks/useAuthFunction";
import useFetchPlaceItem from "../../hooks/useFetchPlaceItem";
import DetailPageHeader from "../../components/BaseComponents/DetailPageHeader";
import DetailPageSummary from "../../components/BaseComponents/DetailPageSummary";
import DetailPageAddress from "../../components/BaseComponents/DetailPageAddress";

const HotelPage = () => {

    const [hotelType,setHotelType] = useState(null);
    const [hotelTypeImage, setHotelTypeImage]  = useState(null);
    const [hotelArray,setHotelArray] = useState([]);
    const [modalIsShown,setIsModalShown] = useState(false);
    const [isLoading,setIsLoading] = useState(false);

    const functionHandler = useAuthFunction();
    const fetchplaceItemHandler = useFetchPlaceItem();
    
    const setHotelTypeHandler = ({ type,image}) => {
        setHotelType(type);
        setHotelTypeImage(image);
    };


    const closeModalHandler = () => {
        setIsModalShown(false);
    }

    const getHotelLocation = async (address) => {
        if (!hotelType){
            setIsModalShown(true);
            return;
        }
        setIsLoading(true);
        const localeResponseData = await functionHandler(getLocaleByAddress,{
            address
        });
        const hotelResponseData = await functionHandler(getPlaceLocation,{
            x : localeResponseData.x,
            y : localeResponseData.y,
            placeName : hotelType,
        });
        const fetchDatas = await fetchplaceItemHandler({
            placeDatas : hotelResponseData, 
            originX : localeResponseData.x,
            originY : localeResponseData.y,
        })
        setHotelArray(fetchDatas);
        setIsLoading(false);
    }

    const variants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
        exit : {opacity : 0, y : 50}
    }

    return (
        <React.Fragment>
            {isLoading && <Loading/>}
            {modalIsShown && <Modal onClose={closeModalHandler}> <NotSelectTypeModal/> </Modal>}
            <DetailPageHeader selectCategory='Hotel'/>
            <DetailPageSummary
                headerText='숙소 검색'
                text='숙박 시설의 설정 및 입력 주소를 기반으로
                근처 숙박 장소의 정보를 얻을 수 있습니다.'
            />
            <div className={`row ${classes.select_container}`}>
                <div className={`col col-lg-6 ${classes.category_container}`}>
                    <HotelCategory onSetHotelType={setHotelTypeHandler}/>
                </div>
                <div className={`col col-lg-6 ${classes.input_container}`}>
                    <HotelSelect title={hotelType} image={hotelTypeImage}/>
                </div>
            </div>
            <DetailPageAddress
                header='근처 숙박 알아보기'
                text='입력하신 주소와 선택한 숙박 종류를 바탕으로 근처에 있는 숙박 업소를 찾아드립니다.'
                onPlaceLocation={getHotelLocation}
                onCurrentSelect={hotelType}
            />
            {hotelArray && (
                     <motion.div 
                        variants={variants}
                        key={Math.random()}
                        initial='initial'
                        animate='animate'
                        className={classes.result_container}>
                            <PlaceItemCarousel item={hotelArray}/>
                    </motion.div>
            )}
            <Footer/>
        </React.Fragment>
    )
};

export default HotelPage;