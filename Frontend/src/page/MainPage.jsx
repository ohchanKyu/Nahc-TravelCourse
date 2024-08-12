import React, { useRef } from "react";
import classes from "./Mainpage.module.css";
import Category from "../components/MainPageComponents/Category";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaArrowRight } from "react-icons/fa";
import sectionImage from "../image/main_page_section_img.jpg";
import { BiSolidMoviePlay } from "react-icons/bi";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaRoute } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import Route from "../components/Route";
import movieImage from '../image/main_page_movie_img.jpg'
import popCornImage from "../image/popcorn.png";
import movieTicket from '../image/movie-ticket.png';
import { IoCafe } from "react-icons/io5";
import { MdFoodBank } from "react-icons/md";
import { FaHotel } from "react-icons/fa";
import { PiParkFill } from "react-icons/pi";
import { IoGameControllerOutline } from "react-icons/io5";
import Icon from "../components/MainPageComponents/Icon";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { FaTruckPlane } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const MainPage = () => {

    const content1Ref = useRef();
    const content2Ref = useRef();
    const content3Ref = useRef();
    const navigate = useNavigate();

    const goMyPageHandler = () => {
        navigate("/NaHC/myDetail")
    }

    const goPlanPageHandler = () => {
        navigate("/NaHC/travelCourseDetail")
    }

    const onContent1Click = () => {
        content1Ref.current?.scrollIntoView({ behavior : 'smooth' });
    }
    const onContent2Click = () => {
        content2Ref.current?.scrollIntoView({ behavior: 'smooth' });
    }
    const onContent3Click = () => {
        content3Ref.current?.scrollIntoView({ behavior: 'smooth' });
    }

    const firstMovieImage = {
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
            delay: 0.3, 
          },
        },
      };
      
      const secondMovieImage = {
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
            delay: 0.6,
          },
        },
      };
      
      const thirdMovieImage = {
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
            delay: 0.9, 
          },
        },
      };

      const boxVariants = {
        out: {
            opacity: 0,
            y: -100,
        },
        in: {
            opacity: 1,
            y: 0,
          transition: {
            duration: 0.6,
          },
        },
      };
    return (
        <React.Fragment>
            <Header/>
            <div className={classes.header_container}>
                해당 어플리케이션은 <span style={{color:'red'}}>주소를</span> 바탕으로 다양한 장소의 정보를 제공합니다.<br/>
                영화, 음식점, 카페, 호텔, 놀거리 등의 정보를 제공하며<br/>
                <span style={{color:'red'}}>여행 및 데이트 코스</span>를 쉽게 계획할 수 있도록  <span style={{color:'red'}}>일정관리</span> 프로그램도 제공합니다.
            </div>
            <Category/>
            <div className={classes.section}>
                <h2 className={classes.section_header}> NaHC API </h2>
                <div className={`row ${classes.api_list}`}>
                    <div className={`col col-lg-3 ${classes.api_container}`}>
                        <div className={classes.api_title}>
                            Kakao Developer
                        </div>
                        <div className={classes.api_text}>
                            Kakao Developer API를 통해 <br/>
                            주소 입력 및 좌표 변환 <br/>
                            주소 기반 장소 검색 기능 제공
                        </div>
                    </div>
                    <div className={`col col-lg-3 ${classes.api_container}`}>
                        <div className={classes.api_title}>
                            TMap 
                        </div>
                        <div className={classes.api_text}>
                            TMap API를 통해 <br/>길찾기 및 소요 시간 계산
                        </div>
                    </div>
                    <div className={`col col-lg-3 ${classes.api_container}`}>
                        <div className={classes.api_title}>
                            KMDB & Kofic
                        </div>
                        <div className={classes.api_text}>
                            KMDB, Kofic API를 통해  <br/> 박스 오피스 Top 10 영화 정보 및 <br/> 사진 제공
                        </div>
                    </div>
                    <div className={classes.api_link_container}>
                        <p className={classes.api_link_text}>※ 사용 API에 대한 자세한 정보를 원허시면 아래 링크를 참조해주세요.</p>
                        <div className={classes.api_link_list}>
                            <div className={classes.api_link}>
                                KaKao Developer <FaArrowRight/> https://developers.kakao.com/
                            </div>
                            <div className={classes.api_link}>
                                TMap <FaArrowRight/> https://tmapapi.sktelecom.com/                        
                            </div>
                            <div className={classes.api_link}>
                                KMDB <FaArrowRight/> https://www.kmdb.or.kr/main <br/>
                                Kofic <FaArrowRight/> https://www.kobis.or.kr/kobisopenapi/homepg/main/main.do
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.main_section}>
                <img src={sectionImage} alt='section_img' className={classes.main_section_image}/>
                <div className={classes.main_text}>
                    NaHC Application을 이용하여 <br/>
                    다양한 정보를 얻어보세요.
                </div>
                <div className={classes.main_description}>
                    최근 박스오피스 Top 10 영화 정보 제공, <br/>
                    입력 주소를 기반으로 한 영화관, 음식점, 카페, 산책로, 놀거리 등  <br/>
                    여러가지 카테고리에 대한 장소 정보 제공. 장소 정보 뿐 아니라  <br/>
                    도보 및 자차를 통해 소요되는 시간 및 택시비 정보 제공  <br/>
                    데이트 코스 또는 여행 코스에 대한 일정을 계획할 수 있도록  <br/>
                    일정 관리 프로그램을 사용하실 수 있습니다.  <br/>
                    지금 바로 이용해보세요!  <br/>
                </div>
            </div>
            <div className={classes.section_list_container}>
                <ul className={`row ${classes.section_list}`}>
                    <motion.li onClick={onContent1Click} whileHover={{ backgroundColor:'rgb(233 116 37)', opacity:1 }} className={`col col-lg-4 ${classes.movie}`} ><BiSolidMoviePlay style={{ fontSize : '80px'}}/> <div>영화 정보</div></motion.li>
                    <motion.li onClick={onContent2Click} whileHover={{ backgroundColor:'rgb(233 116 37)', opacity:1}} className={`col col-lg-4 ${classes.location}`}><FaMapLocationDot style={{ fontSize : '80px'}}/> <div style={{marginTop:'5px'}}>주소 기반 장소 검색</div></motion.li>
                    <motion.li onClick={onContent3Click} whileHover={{ backgroundColor:'rgb(233 116 37)', opacity:1}} className={`col col-lg-4 ${classes.route}`}><FaRoute style={{ fontSize : '80px'}}/> <div style={{marginTop:'5px'}}>일정 계획</div></motion.li>
                </ul>
            </div>
            <div ref={content1Ref} className={`row ${classes.movie_container}`} >
                <div className='col col-lg-6'>
                    <h1 className={classes.movie_header}><BiSolidMoviePlay style={{ fontSize : '60px'}}/> 영화 정보 </h1>
                    <p className={classes.movie_text}> KMdb & Kofic API를 통하여 <br/>당일 박스 오피스 Top 10 영화 정보를 제공합니다. </p>
                </div>
                <div className="col col-lg-6">
                    <div className={classes.image_container}>
                        <AnimatePresence>
                            <motion.img   
                                whileInView={'animate'}
                                key={movieImage}
                                variants={firstMovieImage}
                                initial='initial'
                                src={movieImage} alt='movieImage' className={classes.movie_image}/>
                            <motion.img key={movieTicket}
                                whileInView={'animate'}
                                variants={secondMovieImage}
                                initial='initial'
                                src={movieTicket} alt='ticketImage' className={classes.ticket_image}/>
                            <motion.img  key={popCornImage}
                                whileInView={'animate'}
                                variants={thirdMovieImage}
                                initial='initial'
                                src={popCornImage} alt='popcornImage' className={classes.popcorn_image}/>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
            <div ref={content2Ref} className={`row ${classes.location_container}`} >
                <div className="col col-lg-6">
                    <motion.ul whileInView={'in'} className={classes.category_list}  variants={boxVariants} initial="out">
                        <li  key={FaHotel} ><Icon icon={FaHotel} title='숙소'/> </li>
                        <li  key={MdFoodBank} ><Icon icon={MdFoodBank} title='음식점'/> </li>
                        <li  key={IoCafe}><Icon  icon={IoCafe} title='카페'/></li>
                    </motion.ul>
                    <motion.ul whileInView={'in'} className={classes.category_list}  variants={boxVariants} initial="out">
                        <li key={PiParkFill}><Icon  icon={PiParkFill} title='공원 및 산책로'/></li>
                        <li key={IoGameControllerOutline}><Icon icon={IoGameControllerOutline} title='다양한 놀거리'/></li>
                    </motion.ul>
                </div>
                <div className="col col-lg-6">
                    <h1 className={classes.location_header}><FaMapLocationDot style={{ fontSize : '60px'}}/> 주소 기반 장소 검색 </h1>
                    <p className={classes.location_text}> Kakao API를 통해 주소를 입력받아 <br/> 해당 근처에 있는 장소 정보를 제공합니다. </p>
                </div>
            </div>
            <div ref={content3Ref} className={`row ${classes.route_container}`} >
               <div className='col col-lg-4'>
                    <h1 className={classes.route_header}><FaRoute style={{ fontSize : '60px'}}/> 일정 계획 </h1>
                    <p className={classes.route_text}> 
                            기간 설정 및 장소 등록을 통해  <br/>
                            최적의 데이트 및 여행 코스를 <br/> 
                            계획할 수 있습니다. 
                    </p>
               </div>
               <div className="col col-lg-6">
                    <Route />
               </div>
            </div>
            <div className={classes.footer_container}>
                <div className={`row ${classes.footer_sub_container}`}>
                    <div className={`col col-lg-6 ${classes.favorites_container}`}>
                        <h3 className={classes.favorites_header}> 나만의 즐겨찾기 </h3>
                        <p className={classes.favorites_text}>
                            자주 찾는 장소나 데이트 코스를 <br/> 즐겨찾기로 저장할 수 있습니다.
                        </p>
                        <FaStar className={classes.favorites_icon}/>
                        <motion.button 
                            onClick={goMyPageHandler}
                            whileHover={{scale:1.2 }} 
                            className={`btn btn-outline-light btn-sm ${classes.favorites_button}`}
                        >바로가기 <MdKeyboardDoubleArrowRight/></motion.button>
                    </div>
                    <div className={`col col-lg-6 ${classes.community_container}`}>
                        <h3 className={classes.community_header}> 여행 일정 계획 </h3>
                        <p className={classes.community_text}> 일정관리 프로그램을 통해 쉽게 <br/> 여행 및 데이트 코스를 계획할 수 있습니다. </p>
                        <FaTruckPlane className={classes.community_icon} />
                        <motion.button  
                            onClick={goPlanPageHandler}
                            whileHover={{scale:1.2 }} 
                            className={`btn btn-outline-light btn-sm ${classes.community_button}`}>바로가기 <MdKeyboardDoubleArrowRight/></motion.button>
                    </div>
                </div>
            </div>
            <Footer/>
        </React.Fragment>
        
    );
};

export default MainPage;