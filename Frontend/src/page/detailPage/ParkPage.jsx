import React, { useState } from "react";
import classes from "./ParkPage.module.css";
import Footer from "../../components/Footer";
import ParkCategory from "../../components/ParkPageComponents/ParkCategory";
import ParkSelect from "../../components/ParkPageComponents/ParkSelect";
import { getLocaleByAddress , getPlaceLocation  } from "../../api/LocationApiService";
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

const ParkPage = () => {

    const [placeType, setPlaceType] = useState(null);
    const [placeTypeImage,setPlaceTypeImage] = useState(null);
    const [parkArray,setParkArray] = useState([]);
    const [modalIsShown,setIsModalShown] = useState(false);
    const [isLoading,setIsLoading] = useState(false);

    const functionHandler = useAuthFunction();
    const fetchplaceItemHandler = useFetchPlaceItem();

    const setPlaceTypeHandler = ({ type,image}) => {
        setPlaceType(type);
        setPlaceTypeImage(image);
    };

    const closeModalHandler = () => {
        setIsModalShown(false);
    }


    const getParkLocation = async (address) => {
        if (!placeType){
            setIsModalShown(true);
            return;
        }
        setIsLoading(true);

        const localeResponseData = await functionHandler(getLocaleByAddress,{
            address
        });
   
        const parkResponseData =  await functionHandler(getPlaceLocation,{
            x : localeResponseData.x,
            y : localeResponseData.y,
            placeName : placeType,
        }); 
        const fetchDatas = await fetchplaceItemHandler({
            placeDatas : parkResponseData, 
            originX : localeResponseData.x,
            originY : localeResponseData.y,
        })
        setParkArray(fetchDatas);
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
            <DetailPageHeader selectCategory='Park'/>
            <DetailPageSummary
                headerText='공원 및 산책로 검색'
                text='입력 주소를 기반으로 근처 공원 및 문화유산, 유적지, 가볼만한 곳
                정보를 얻을 수 있습니다.'
            />
            <div className={`row ${classes.select_container}`}>
                <div className={`col col-lg-6 ${classes.description_container}`}>
                    <ParkCategory onSetPlaceType={setPlaceTypeHandler}/>
                </div>
                <div className={`col col-lg-6 ${classes.input_container}`}>
                    <ParkSelect title={placeType} image={placeTypeImage}/>
                </div>
            </div>
            <DetailPageAddress
                header='근처 명소 알아보기'
                text='입력하신 주소와 선택한 명소 종류를 바탕으로 근처에 있는 명소를 찾아드립니다.'
                onPlaceLocation={getParkLocation}
                onCurrentSelect={placeType}
            />
            {parkArray && (
                     <motion.div 
                        variants={variants}
                        key={Math.random()}
                        initial='initial'
                        animate='animate'
                        className={classes.result_container}>
                            <PlaceItemCarousel item={parkArray}/>
                    </motion.div>
            )}
            <Footer/>
        </React.Fragment>
    )
};

export default ParkPage;