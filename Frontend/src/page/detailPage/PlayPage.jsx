import React, { useState } from "react";
import classes from "./PlayPage.module.css";
import Footer from "../../components/Footer";
import PlayCategory from "../../components/PlayPageComponents/PlayCategory";
import PlaySelect from "../../components/PlayPageComponents/PlaySelect";
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


const PlayPage = () => {

    const [type,setType] = useState(null);
    const [place,setPlace] = useState(null);
    const [placeArray,setPlaceArray] = useState([]);
    const [modalIsShown,setIsModalShown] = useState(false);
    const [isLoading,setIsLoading] = useState(false);

    const functionHandler = useAuthFunction();
    const fetchplaceItemHandler = useFetchPlaceItem();
 
    const setTypeHandler = (type) => {
        setType(type);
    };

    const setPlaceHandler = (place) => {
        setPlace(place);
    }

    const closeModalHandler = () => {
        setIsModalShown(false);
    }

    const getPlayStationLocation = async (address) => {
        if (!place){
            setIsModalShown(true);
            return;
        }
        setIsLoading(true);
        const localeResponseData = await functionHandler(getLocaleByAddress,{
            address
        });
        const placeResponseData = await functionHandler(getPlaceLocation,{
            x : localeResponseData.x,
            y : localeResponseData.y,
            placeName : place,
        }); 
        
        const fetchDatas = await fetchplaceItemHandler({
            placeDatas : placeResponseData, 
            originX : localeResponseData.x,
            originY : localeResponseData.y,
        })
        setPlaceArray(fetchDatas);
        setIsLoading(false);
    };

    const variants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
        exit : {opacity : 0, y : 50}
    }

    return (
        <React.Fragment>
            {isLoading && <Loading/>}
            {modalIsShown && <Modal onClose={closeModalHandler}> <NotSelectTypeModal/> </Modal>}
            <DetailPageHeader selectCategory='Play'/>
            <DetailPageSummary
                headerText='놀거리 검색'
                text='입력 주소를 기반으로 피시방, 노래방, 백화점, 찜질방 등
                근처 놀거리의 정보를 얻을 수 있습니다.'
            />
            <div className={`row ${classes.select_container}`}>
                <div className={`col col-lg-6 ${classes.description_container}`}>
                    <PlayCategory onType={setTypeHandler}/>
                </div>
                <div className={`col col-lg-6 ${classes.input_container}`}>
                    <PlaySelect onType={setTypeHandler} type={type} onPlace={setPlaceHandler}/>
                </div>
            </div>
            <DetailPageAddress
                header='근처 놀거리 알아보기'
                text='입력하신 주소와 선택한 놀거리 종류를 바탕으로 근처에 있는 놀거리를 찾아드립니다.'
                onPlaceLocation={getPlayStationLocation}
                onCurrentSelect={place}
            />
            {placeArray && (
                     <motion.div 
                        variants={variants}
                        key={Math.random()}
                        initial='initial'
                        animate='animate'
                        className={classes.result_container}>
                            <PlaceItemCarousel item={placeArray}/>
                    </motion.div>
            )}
            <Footer/>
        </React.Fragment>
    );
};

export default PlayPage;