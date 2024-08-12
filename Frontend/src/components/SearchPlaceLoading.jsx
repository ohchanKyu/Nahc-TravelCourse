import React from "react";
import classes from "./SearchPlaceLoading.module.css";
import { CiNoWaitingSign } from "react-icons/ci";
import SpinnerImage from "../image/Spinner.gif";

const SearchPlaceLoading = () => {
    return (
        <div className={classes.loading_container}>
            <div className={classes.container}>
                <div className={classes.container_text_box}>
                    <h1><CiNoWaitingSign style={{ marginBottom : '5px'}}/>Loading...</h1>
                    <p> 검색 중입니다. </p>
                    <img style={{ width:'100px'}} src={SpinnerImage} alt="loading"/>
                </div>
            </div>
        </div>
    )
};

export default SearchPlaceLoading;