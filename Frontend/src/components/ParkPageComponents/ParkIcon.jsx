import React from "react";
import classes from "./ParkIcon.module.css";

const ParkIcon = (props) => {

    return (
        <React.Fragment>
             <div onClick={props.onSetPark} className={classes.icon_container}>
                <img  className={classes.icon_image} src={props.image} alt={props.title}/>
                <p className={classes.icon_title}>{props.title}</p>
            </div>
        </React.Fragment>
       
    );
}

export default ParkIcon;