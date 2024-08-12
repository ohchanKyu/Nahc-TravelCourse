import React, { useState } from "react";
import classes from "./CafePage.module.css";
import Footer from "../../components/Footer";
import CafeCategory from "../../components/CafePageComponents/CafeCategory";
import CafeSelect from "../../components/CafePageComponents/CafeSelect";
import { getLocaleByAddress,  getPlaceLocation } from "../../api/LocationApiService";
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

const CafePage = () => {

    const [type,setType] = useState(null);
    const [cafe,setCafe] = useState(null);
    const [cafeArray,setCafeArray] = useState([]);
    const [modalIsShown,setIsModalShown] = useState(false);
    const [isLoading,setIsLoading] = useState(false);

    const functionHandler = useAuthFunction();
    const fetchplaceItemHandler = useFetchPlaceItem();

    const typeHandler = (type) => {
        setType(type);
    }

    const cafeHandler = (cafe) => {
        setCafe(cafe);
    }

    const closeModalHandler = () => {
        setIsModalShown(false);
    }

    const getCafeLocation =  async (address) => {
        if (!cafe){
            setIsModalShown(true);
            return;
        }
        setIsLoading(true);

        const localeResponseData = await functionHandler(getLocaleByAddress,{
            address
        });
       
        let cafePlaceName;
        if (cafe === '통합 검색'){
            cafePlaceName = '카페'
        }else{
            cafePlaceName = cafe;
        }
      
        const cafeResponseData =  await functionHandler(getPlaceLocation,{
            x : localeResponseData.x,
            y : localeResponseData.y,
            placeName : cafePlaceName,
        }); 
        const fetchDatas = await fetchplaceItemHandler({
            placeDatas : cafeResponseData, 
            originX : localeResponseData.x,
            originY : localeResponseData.y,
        })
        setCafeArray(fetchDatas);
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
            <DetailPageHeader selectCategory='Cafe'/>
            <DetailPageSummary
                headerText='카페 검색'
                text='카페 이름 및 입력 주소를 기반으로 
                근처 카페의 정보를 얻을 수 있습니다.'
            />
            <div className={`row ${classes.select_container}`}>
                <div className={`col col-lg-6 ${classes.description_container}`}>
                    <CafeCategory onType={typeHandler} onCafe={cafeHandler}/>
                </div>
                <div className={`col col-lg-6 ${classes.input_container}`}>
                    <CafeSelect type={type} onCafe={cafeHandler}/>
                </div>
            </div>
            <DetailPageAddress
                header='근처 카페 알아보기'
                text='입력하신 주소와 선택한 카페를 바탕으로 근처에 있는 카페를 찾아드립니다.'
                onPlaceLocation={getCafeLocation}
                onCurrentSelect={cafe}
            />
            {cafeArray && (
                     <motion.div 
                        variants={variants}
                        key={Math.random()}
                        initial='initial'
                        animate='animate'
                        className={classes.result_container}>
                            <PlaceItemCarousel item={cafeArray}/>
                    </motion.div>
            )}
            <Footer/>
        </React.Fragment>
    );
};

export default CafePage;