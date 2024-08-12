import React, { useState }  from "react";
import classes from "./PlaySecondType.module.css";
import { motion } from "framer-motion"; 
import { FaCheck } from "react-icons/fa";
import PlaceIcon from "./PlaceIcon";
import mesuemImage from '../../image/museum.png';
import artMesuemImage from "../../image/art-gallery.png";
import zooImage from "../../image/zoo.png";
import saunaImage from "../../image/sauna.png";

const PlaySecondType = (props) => {

    const [selectPlace, setSelectPlace] = useState(null);

    const setPlaceHandler = (event) => {
        if (event.target.tagName === 'IMG') {
            const place = event.target.alt;
            setSelectPlace(place);
            props.onSelectPlace(place);
        } else if (event.target.tagName === 'P') {
            const place = event.target.innerHTML;
            setSelectPlace(place);
            props.onSelectPlace(place);
        }else{
            return;
        }
    }

    const variants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
        exit : {opacity : 0, y : 50}
    }

    
    return (
        <React.Fragment>
            <div className={classes.container}>
                <div className={classes.category_list}>
                    <p className={classes.category_list_header}><FaCheck style={{ marginBottom : '5px'}}/> 선택 가능한 카테고리</p>
                    <motion.ul whileInView={'animate'} variants={variants} initial='initial' exit='exit'>
                        <motion.li  whileHover={{ scale:1.2 }} key={mesuemImage}><PlaceIcon onSetPlace={setPlaceHandler} image={mesuemImage} title='박물관'/></motion.li>
                        <motion.li  whileHover={{ scale:1.2 }} key={artMesuemImage}><PlaceIcon onSetPlace={setPlaceHandler} image={artMesuemImage} title='미술관'/></motion.li>
                        <motion.li  whileHover={{ scale:1.2 }} key={zooImage}><PlaceIcon onSetPlace={setPlaceHandler} image={zooImage} title='동물원'/></motion.li>
                        <motion.li  whileHover={{ scale:1.2 }} key={saunaImage}><PlaceIcon onSetPlace={setPlaceHandler} image={saunaImage} title='찜질방'/></motion.li>
                    </motion.ul>
                    {selectPlace && <motion.p variants={variants} key={selectPlace}
                        animate='animate'
                        initial='initial'
                        exit='exit'
                        className={classes.select_message}>
                            {selectPlace+' 선택 완료!'}
                        </motion.p>}
                    {!selectPlace && <p className={classes.not_select_message}> 아직 선택하지 않았습니다! </p>}
                    <p className={classes.category_list_text}>※ 위의 4가지 항목 중 하나를 선택해주세요.</p>
                </div>
            </div>
        </React.Fragment>
    );

};

export default PlaySecondType;