import React from "react";
import classes from "./PlaceIcon.module.css";

const PlaceIcon = (props) => {
    return (
        <div onClick={props.onSetPlace} className={classes.icon_container}>
            <img  className={classes.icon_image} src={props.image} alt={props.title}/>
            <p className={classes.icon_title}>{props.title}</p>
        </div>
    );
};

export default PlaceIcon;