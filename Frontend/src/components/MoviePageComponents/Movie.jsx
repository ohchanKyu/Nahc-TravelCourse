import React, { useState } from "react";
import classes from "./Movie.module.css";
import { motion } from "framer-motion";
import Modal from "../../layout/Modal";
import { CiStickyNote } from "react-icons/ci";

const Movie = (props) => {

    const [isDetail,setIsDetail] = useState(false);

    const showMovieDetailHandler = () => {
        setIsDetail(true);
    }

    const closeMovieDetailHandler = () => {
        setIsDetail(false);
    }

    const formatTotalCount = props.movieElement.totalCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    const defaultContent = (
        <React.Fragment>
            <img className="card-img-top" src={props.movieElement.imageURL} alt="Card image cap"/>
            <div className="card-body">
                <h5 className={`card-title ${classes.title}`}>{props.movieElement.title}</h5>
                <p className={classes.card_text}>{props.movieElement.description}</p>
            </div>
        </React.Fragment>
    )

    const modalContent = (
        <div className={classes.modal_container}>
            <div className={`card ${classes.card_container} `}>
                <img className="card-img-top" 
                    src={props.movieElement.imageURL} 
                    alt="movie-image"/>
                <div className={classes.card_text_container}>
                    <div className="card-body">
                        <h5 className={`card-title ${classes.title}`}>{props.movieElement.title}</h5>
                    </div>
                    <ul className={`list-group list-group-flush ${classes.modal_list_group}`}>
                        <li className={`list-group-item ${classes.modal_director}`}><span style={{color:'blue'}}>감독</span> <span style={{float:'right'}}>{props.movieElement.directorName}</span></li>
                        <li className={`list-group-item ${classes.modal_rating}`}><span style={{color:'blue'}}>연령가</span>  <span style={{float:'right'}}>{props.movieElement.rating}</span></li>
                        <li className={`list-group-item ${classes.modal_runtime}`}><span style={{color:'blue'}}>상영시간</span> <span style={{float:'right'}}>{props.movieElement.runtime}분</span></li>
                        <li className={`list-group-item ${classes.modal_releaseDate}`}><span style={{color:'blue'}}>개봉일</span>  <span style={{float:'right'}}>{props.movieElement.releaseDate}</span></li>
                        <li className={`list-group-item ${classes.modal_totalCount}`}><span style={{color:'blue'}}>누적관객수</span>  <span style={{float:'right'}}>{formatTotalCount}명</span></li>
                    </ul>
                </div>
            </div>
            <p className={classes.modal_description}>
                <h2 className={classes.modal_summary}><CiStickyNote/> Summary</h2>
                {props.movieElement.description}
            </p>
        </div>
    );

    return (
        <React.Fragment>
           {isDetail &&  <Modal onClose={closeMovieDetailHandler}>{modalContent}</Modal>}
           {!isDetail &&  <motion.div className={`card ${classes.card_container}`}
                onClick={showMovieDetailHandler}
                whileHover={{scale:1.1, zIndex:1.1}}
                >
               {defaultContent}
            </motion.div>}
        </React.Fragment>
    );
};

export default Movie;