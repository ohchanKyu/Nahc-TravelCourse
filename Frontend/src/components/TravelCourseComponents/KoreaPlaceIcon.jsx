import React from "react";
import classes from "./KoreaPlaceIcon.module.css";

const KoreaPlaceIcon = (props) => {

    return (
        <div onClick={props.onSetPlace} className={classes.place_container}>
            <div className={classes.image_container}>
                <img  className={classes.place_image} src={props.image} alt={props.title}/>
            </div>
            <p className={classes.place_title}>{props.title}</p>
        </div>
    );
};

export default KoreaPlaceIcon;