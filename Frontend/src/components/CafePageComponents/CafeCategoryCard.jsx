import React from "react";
import classes from "./CafeCategoryCard.module.css";
import { MdOutlineNumbers } from "react-icons/md";

const CafeCategoryCard = (props) => {

    return (
        <div data-title={props.title} className={`card bg-light mb-3 ${classes.card_container}`} style={{ maxWidth : '18rem'}}>
            <div data-title={props.title} className={`card-header ${classes.card_header}`}>{props.header}</div>
            <div data-title={props.title} className={`card-body ${classes.card_body}`}>
                <h5 data-title={props.title} className={`card-title ${classes.card_title}`}><MdOutlineNumbers style={{ marginBottom : '5px' }}/> {props.title}</h5>
                <p data-title={props.title} className={`card-text ${classes.card_text}`}>{props.text}</p>
            </div>
        </div>
    );
};

export default CafeCategoryCard;