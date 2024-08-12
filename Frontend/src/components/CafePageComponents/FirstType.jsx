import React, { useState } from "react";
import classes from "./FirstType.module.css";
import { FaCheck } from "react-icons/fa";
import StarBucksImage from "../../image/starbucks.png";
import MegaCoffeeImage from "../../image/mega_coffee.png";
import TwosomeCoffeeImage from "../../image/twosome_coffee.jpg";
import EdiyaCoffeeImage from "../../image/ediya_coffee.png";
import CafeIcon from "./CafeIcon";
import { motion } from "framer-motion";

const FirstType = (props) => {

    const [selectCafe, setSelectCafe] = useState(null);

    const setCafeHandler = (event) => {
        if (event.target.tagName === 'IMG') {
            const cafe = event.target.alt;
            setSelectCafe(cafe);
            props.onSelectCafe(cafe);
        } else if (event.target.tagName === 'P') {
            const cafe = event.target.innerHTML;
            setSelectCafe(cafe);
            props.onSelectCafe(cafe);
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
                    <motion.li  whileHover={{ scale:1.2 }} key={StarBucksImage}><CafeIcon onSetCafe={setCafeHandler} image={StarBucksImage} title='스타벅스'/></motion.li>
                    <motion.li  whileHover={{ scale:1.2 }} key={MegaCoffeeImage}><CafeIcon onSetCafe={setCafeHandler} image={MegaCoffeeImage} title='메가커피'/></motion.li>
                    <motion.li  whileHover={{ scale:1.2 }} key={TwosomeCoffeeImage}><CafeIcon onSetCafe={setCafeHandler} image={TwosomeCoffeeImage} title='투썸'/></motion.li>
                    <motion.li  whileHover={{ scale:1.2 }} key={EdiyaCoffeeImage}><CafeIcon onSetCafe={setCafeHandler} image={EdiyaCoffeeImage} title='이디야'/></motion.li>
                </motion.ul>
                {selectCafe && <motion.p variants={variants} key={selectCafe}
                    animate='animate'
                    initial='initial'
                    exit='exit'
                    className={classes.select_message}>
                        {selectCafe+' 선택 완료!'}
                    </motion.p>}
                {!selectCafe && <p className={classes.not_select_message}> 아직 선택하지 않았습니다! </p>}
                <p className={classes.category_list_text}>※ 위의 4가지 항목 중 하나를 선택해주세요.</p>
            </div>
            </div>
        </React.Fragment>
    );
};

export default FirstType;