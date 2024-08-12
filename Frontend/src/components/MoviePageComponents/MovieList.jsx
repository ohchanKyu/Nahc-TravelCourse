import React from "react";
import Movie from "./Movie";
import classes from "./MovieList.module.css";
import { motion } from "framer-motion";

const MovieList = (props) => {

    const variants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
        exit : {opacity : 0, y : 50}
    }

    return (
        <React.Fragment>
            <motion.ul className={classes.list_container}variants={variants}
                        initial="initial"
                        animate="animate"
                        exit="exit">
                {props.movieData.map(movieElement => (
                    <Movie key={movieElement.id} movieElement={movieElement}/>
                ))}
            </motion.ul>
        </React.Fragment>
    );
};

export default MovieList;