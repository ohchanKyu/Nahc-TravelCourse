import React from "react";
import classes from "./ParkCategory.module.css";
import { MdCategory } from "react-icons/md";
import ParkIcon from "./ParkIcon";
import ParkImage from "../../image/park.png";
import HeritageImage from "../../image/column.png";
import HistoricSiteImage from "../../image/historic-site.png";
import PlaceImage from "../../image/place.png";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { HiSpeakerphone } from "react-icons/hi";

const ParkCategory = (props) => {

    const setParkHandler = (event) => {
        if (event.target.tagName === 'IMG') {
            const type = event.target.alt;
            let image;
            if (type === "공원"){
                image = ParkImage;
            }else if (type === "문화유산"){
                image = HeritageImage;
            }else if (type === "가볼만한 곳"){
                image = PlaceImage;
            }else{
                image = HistoricSiteImage;
            }
            props.onSetPlaceType({ type, image });
        } else if (event.target.tagName === 'P') {
            const type = event.target.innerHTML;
            let image;
            if (type === "공원"){
                image = ParkImage;
            }else if (type === "문화유산"){
                image = HeritageImage;
            }else if (type === "가볼만한 곳"){
                image = PlaceImage;
            }else{
                image = HistoricSiteImage;
            }
            props.onSetPlaceType({ type, image });
        }else{
            return;
        }
    };

    const variants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
        exit : {opacity : 0, y : 50}
    }

    return (
        <React.Fragment>
            <div className={classes.container}>
                <h4><MdCategory style={{ marginBottom : '5px'}}/> 명소 카테고리 설정하기 </h4>
            </div>
            <div className={classes.category_list}>
                <p className={classes.category_list_header}><FaCheck style={{ marginBottom : '5px'}}/> 선택 가능한 카테고리</p>
                <motion.ul whileInView={'animate'} variants={variants} initial='initial' exit='exit'>
                    <motion.li  whileHover={{ scale:1.2 }} key={ParkImage}><ParkIcon onSetPark={setParkHandler} image={ParkImage} title='공원'/></motion.li>
                    <motion.li  whileHover={{ scale:1.2 }} key={HeritageImage}><ParkIcon onSetPark={setParkHandler} image={HeritageImage} title='문화유산'/></motion.li>
                    <motion.li  whileHover={{ scale:1.2 }} key={HistoricSiteImage}><ParkIcon onSetPark={setParkHandler} image={HistoricSiteImage} title='유적지'/></motion.li>
                    <motion.li  whileHover={{ scale:1.2 }} key={PlaceImage}><ParkIcon onSetPark={setParkHandler} image={PlaceImage} title='가볼만한 곳'/></motion.li>
                </motion.ul>
                <p className={classes.category_list_text}>※ 위의 4가지 항목 중 하나를 선택해주세요.</p>
                <p className={classes.description_header}><HiSpeakerphone/> Notice!</p>
                <p className={classes.description}>
                    <span>가볼만한 곳</span> 카테고리는 유적지, 문화유산<br/>
                    음식점, 백화점 등 주위 명소를 모두 포함할 수 있습니다. <br/>
                    다양한 장소를 얻고 싶으시다면 골라보세요! <br/>
                </p>
            </div>
        </React.Fragment>
       
    );

};

export default ParkCategory;