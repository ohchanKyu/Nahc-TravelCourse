import React from "react";
import classes from "./HotelIcon.module.css";

const HotelIcon = (props) => {
    return (
        <div onClick={props.onSetHotel} className={classes.icon_container}>
            <img  className={classes.icon_image} src={props.image} alt={props.title}/>
            <p className={classes.icon_title}>{props.title}</p>
        </div>
    );
};

export default HotelIcon