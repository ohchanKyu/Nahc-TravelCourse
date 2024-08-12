import React, { useState } from "react";
import classes from "./FoodStorePage.module.css";
import Footer from "../../components/Footer";
import FoodCategory from "../../components/FoodStorePageComponents/FoodCategory";
import FoodInput from "../../components/FoodStorePageComponents/FoodInput";
import { motion, AnimatePresence } from "framer-motion";
import { MdCategory } from "react-icons/md";
import { MdChecklist } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";
import { MdOutlineCategory } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { getLocaleByAddress, getPlaceLocation } from "../../api/LocationApiService";
import PlaceItemCarousel from "../../components/MainPageComponents/PlaceItemCarousel";
import Modal from "../../layout/Modal";
import NotSelectTypeModal from "../../components/MainPageComponents/NotSelectTypeModal";
import Loading from "../../components/Loading";
import useAuthFunction from "../../hooks/useAuthFunction";
import useFetchPlaceItem from "../../hooks/useFetchPlaceItem";
import DetailPageHeader from "../../components/BaseComponents/DetailPageHeader";
import DetailPageSummary from "../../components/BaseComponents/DetailPageSummary";
import DetailPageAddress from "../../components/BaseComponents/DetailPageAddress";


const FoodStorePage = () => {

    const [selectState, setSelectState ] = useState(null);
    const [foodName, setFoodName ] = useState(null);
    const [foodArray , setFoodArray ] = useState([]);
    const [modalIsShown,setIsModalShown] = useState(false);
    const [isLoading,setIsLoading] = useState(false);

    const functionHandler = useAuthFunction();
    const fetchplaceItemHandler = useFetchPlaceItem();
    
    const closeModalHandler = () => {
        setIsModalShown(false);
    }

    const getFoodStoreLocation = async (address) => {
        if (!foodName){
            setIsModalShown(true);
            return;
        }
        setIsLoading(true);
        const localeResponseData = await functionHandler(getLocaleByAddress,{
            address
        });
       
        const foodStoreResponseData = await functionHandler(getPlaceLocation,{
            x : localeResponseData.x,
            y : localeResponseData.y,
            placeName : foodName,
        });
    
        const fetchDatas = await fetchplaceItemHandler({
            placeDatas : foodStoreResponseData, 
            originX : localeResponseData.x,
            originY : localeResponseData.y,
        })
        setFoodArray(fetchDatas);
        setIsLoading(false);
    };

    const chooseSelectHandler = () => {
        setSelectState('select');
    };

    const chooseInputHandler = () => {
        setSelectState('input');
    }

    const inputBoxVariants = {
        initial: {
          opacity: 0,
          y: -100,
        },
        animate: {
          opacity: 1,
          y: 0,
          transition: {
            type: 'spring',
            damping: 10,
            stiffness: 100,
          },
        },
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
            <DetailPageHeader selectCategory='Food Store'/>
            <DetailPageSummary
                headerText='음식점 검색'
                text=' 음식 종류별 카테고리 설정 및 입력 주소를 기반으로
                근처 음식점 정보를 얻을 수 있습니다.'
            />
            <div className={`row ${classes.select_container}`}>
                <div className={`col col-lg-6 ${classes.select_text_container}`}>
                    <h4 className={classes.select_header}><MdCategory/> 음식 카테고리 설정 방법 </h4>
                    <div className={`row ${classes.description_container}`}>
                        <div className={`col col-lg-6 ${classes.select_description}`}>
                            <h5><MdChecklist/> 주어진 카테고리에서 선택</h5>
                            <ul>
                                <motion.li whileHover={{ scale :1.2, opacity:1}} key={'korea'}>한식</motion.li>
                                <motion.li whileHover={{ scale :1.2, opacity:1}} key={'china'}>중식</motion.li>
                                <motion.li whileHover={{ scale :1.2, opacity:1}} key={'japan'}>일식</motion.li>
                                <motion.li whileHover={{ scale :1.2, opacity:1}} key={'america'}>양식</motion.li>
                            </ul>
                            <p> 
                                직접 입력을 하지 않으신다면 <br/> 4가지의 카테고리 중 선택이 가능합니다.
                                주소와 선택하신 카테고리에 맞게 근처 음식점 정보를 제공합니다.
                            </p>
                        </div>
                        <div className={`col col-lg-6 ${classes.select_second_description}`}>
                            <h5><FaPencil/> 직접 입력 방식</h5>
                            <motion.div whileHover={{ scale :1.2, opacity:1, color:'red'}} 
                                className={classes.error}> 
                                ※ 부정확한 정보 입력 시 <br/>제대로 된 정보를 제공할 수 없습니다. 
                            </motion.div>
                            <p> 
                                카테고리 설정보다 더욱 정확한 음식 종류를 입력하고 싶으시다면
                                카테고리 설정이 아닌 직접 입력이 가능합니다.
                                주소와 입력하신 종류에 맞게 근처 음식점 정보를 제공합니다.
                            </p>
                        </div>
                    </div>
                </div>
                <div className={`col col-lg-6 ${classes.input_text_container}`}>
                    <div className={classes.input_type_select_container}>
                        <h4><MdOutlineCategory/> 카테고리 설정하기 </h4>
                        <ul>
                            <motion.li whileHover={{ color:'rgb(233 116 37)', scale : 1.2 }} 
                                key={chooseSelectHandler} 
                                onClick={chooseSelectHandler}> 
                                <h5><MdChecklist/> 카테고리에서 선택 </h5>
                            </motion.li>
                            <motion.li whileHover={{ color:'rgb(233 116 37)', scale : 1.2 }} 
                                key={chooseInputHandler} 
                                onClick={chooseInputHandler}> 
                                <h5><FaPencil/> 직접 입력하기 </h5>
                            </motion.li>
                        </ul>
                    </div>
                    <div className={classes.input_container}>
                        {!selectState && <p className={classes.none_input}><FaCheck/> 카테고리 설정 방법을 선택해주세요! </p>}
                        {selectState && selectState ==='select' &&
                            <AnimatePresence>
                                <motion.div variants={inputBoxVariants} animate='animate' initial='initial' className={classes.input_text}>
                                    <FoodCategory onSetFoodName={setFoodName} />
                                </motion.div>
                            </AnimatePresence>
                        }
                        {selectState && selectState ==='input' && 
                            <AnimatePresence>
                                <motion.div variants={inputBoxVariants} animate='animate' initial='initial' className={classes.input_text}>
                                    <FoodInput onSetFoodName={setFoodName}/>
                                </motion.div>
                            </AnimatePresence>
                        }
                    </div>
                </div>
            </div>
            <DetailPageAddress
                header='근처 음식점 알아보기'
                text='입력하신 주소와 선택한 메뉴를 바탕으로 근처에 있는 음식점을 찾아드립니다.'
                onPlaceLocation={getFoodStoreLocation}
                onCurrentSelect={foodName}
            />
            {foodArray && (
                     <motion.div 
                        variants={variants}
                        key={Math.random()}
                        initial='initial'
                        animate='animate'
                        className={classes.result_container}>
                            <PlaceItemCarousel item={foodArray}/>
                    </motion.div>
            )}
            <Footer/>
        </React.Fragment>
    );
};

export default FoodStorePage;