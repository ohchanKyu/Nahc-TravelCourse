import React from "react";
import classes from "./CafeIcon.module.css";

const CafeIcon = (props) => {
    return (
        <div onClick={props.onSetCafe} className={classes.icon_container}>
            <img  className={classes.icon_image} src={props.image} alt={props.title}/>
            <p className={classes.icon_title}>{props.title}</p>
        </div>
    );
};

export default CafeIcon;