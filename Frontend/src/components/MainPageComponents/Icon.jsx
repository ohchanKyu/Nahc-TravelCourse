import classes from "./Icon.module.css";
import { motion } from "framer-motion";

const Icon = (props) => {
    return (
        <motion.div onClick={props.goPageHandler} className={classes.icon_container} whileHover={{scale:1.2, color:'rgb(233 116 37)'}}>
            <props.icon className={classes.icon_image}/>
            <div className={classes.icon_title}>{props.title}</div>
        </motion.div>
    )
}

export default Icon;