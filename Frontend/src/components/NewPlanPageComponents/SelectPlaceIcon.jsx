import React from "react";
import classes from "./SelectPlaceIcon.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { MdCancel } from "react-icons/md";

const SelectPlaceIcon = (props) => {

    const variants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
        exit : {opacity : 0}
    }

    return (
        <AnimatePresence>
             <motion.div 
                key={props.image}
                variants={variants}
                animate='animate'
                initial='initial'
                exit='exit'
                className={classes.icon_container}>
                <img src={props.image} alt='place-image' className={classes.icon_image}/>
                <MdCancel className={classes.cancel_icon} onClick={props.onRemove}/>
                <p className={classes.icon_title}>{props.placeName}</p>
            </motion.div>
        </AnimatePresence>  
    )
};

export default SelectPlaceIcon;