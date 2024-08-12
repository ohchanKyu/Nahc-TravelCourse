import React from "react";
import classes from "./PlayCategoryCard.module.css";
import { motion } from "framer-motion";
import { VscDebugBreakpointLog } from "react-icons/vsc";

const PlayCategoryCard = (props) => {

    const passTypeHandler = (event) => {
        const type = event.target.dataset.id;
        if (event.target.tagName === "path" || event.target.tagName === "svg"){
            props.onSelectType(`${props.cardItem.id}`);
            return;
        }
        props.onSelectType(type);
    };

    return (
        <motion.div data-id={props.cardItem.id} whileHover={{ scale:1.1 }} onClick={passTypeHandler} className={`card ${classes.category_card}`}>
            <div data-id={props.cardItem.id} className={`card-body ${classes.category_body}`}>
                <h5 data-id={props.cardItem.id} className={`card-title ${classes.category_title}`}>{props.cardItem.title}</h5>
                <p data-id={props.cardItem.id} className={`card-text ${classes.category_text}`}>{props.cardItem.description}</p>
            </div>
            {props.cardItem.items && 
                <ul data-id={props.cardItem.id} className={`list-group list-group-flush ${classes.category_list}`}>
                    {props.cardItem.items.map(item => {
                        return (
                            <li key={item} data-id={props.cardItem.id} className={`list-group-item ${classes.category_item}`}><VscDebugBreakpointLog /> {item}</li>
                        )
                    })}
                </ul>
            }
            {props.cardItem.id === 3 && <motion.p data-id={props.cardItem.id} whileHover={{ scale:1.1, color:'red'}} className={classes.message}>※ 장소의 입력이 부정확한 경우 <br/> 검색 결과가 없을 수 있습니다.</motion.p>}
        </motion.div>
    );

};

export default PlayCategoryCard;