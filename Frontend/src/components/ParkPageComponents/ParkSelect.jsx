import React from "react";
import classes from "./ParkSelect.module.css";
import { MdOutlineCategory } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";

const ParkSelect = (props) => {

    const variants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
        exit : {opacity : 0, y : 50}
    }

    const notSelectElement = (
        <React.Fragment>
            <div className={classes.not_select_container}>
                <h5><FaCheck/> 아직 선택하지 않았습니다!</h5>
                <p> 왼쪽 카테고리에서 장소 종류를 선택해주세요. </p>
            </div>
        </React.Fragment>
    );

    return (
        <div className={classes.container}>
            <h4><MdOutlineCategory/> 현재 선택한 카테고리</h4>
            {props.title &&  (
                <React.Fragment>
                     <motion.div key={props.title} variants={variants} animate='animate' initial='initial' exit="exit">
                        <p className={classes.select_title}><FaCheck style={{ marginBottom : '5px'}}/> {props.title} 선택 완료!</p>
                        <img className={classes.select_image} src={props.image} alt={props.title}/>
                    </motion.div>
                    {props.title === "문화유산" && 
                        <p className={classes.main_message}>
                            ※ 근처에 문화유산이 없는 경우 검색 결과가 없을 수도 있습니다.
                        </p>}
                    {props.title === "유적지" && 
                        <p className={classes.main_message}>
                            ※ 근처에 유적지가 없는 경우 검색 결과가 없을 수도 있습니다.
                        </p>}
                    {props.title === "가볼만한 곳" && 
                        <p className={classes.main_message}>
                            해당 카테고리는 근처 가볼만한 곳을 추천합니다! <br/>
                            상세 정보를 원하신다면 <span>공원</span> <span>문화유산</span> <span>유적지</span> 중에 선택해주세요!
                        </p>}
                    <p className={classes.message}>※ 변경을 원하시면 왼쪽에서 다시 선택해주세요.</p>
                </React.Fragment>
                )
            }
            {!props.title && notSelectElement}
        </div>
    );
};

export default ParkSelect;