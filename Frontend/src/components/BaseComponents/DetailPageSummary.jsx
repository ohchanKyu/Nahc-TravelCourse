import React from "react";
import classes from "./DetailPageSummary.module.css";
import Route from "../Route";
import { FaRoute } from "react-icons/fa6";

const DetailPageSummary = (props) => {

    return (
        <div className={`row ${classes.summary_container}`}>
            <div className={`col-lg-4 ${classes.summary_text}`}>
                <h1 className={classes.summary_header}>
                    <FaRoute className={classes.icon}/> {props.headerText} 
                </h1>
                <p className={classes.summary_sub_text}> 
                    {props.text}
                </p>
            </div>
            <div className={`col-lg-6 ${classes.route}`}>
                <Route/>
            </div>
        </div>
    )
};

export default DetailPageSummary;