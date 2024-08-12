import React from "react";
import classes from "./SelectDate.module.css";
import Date from "./Date";

const SelectDate = (props) => {
    
    return (
        <React.Fragment>
            {props.type === '1' && 
                <div className={classes.date_container}>
                    <Date type={props.type} onChange={props.onChangeDate}/>
                </div>
            }
            {props.type === '2' && 
                    <div className={classes.date_container}>
                        <Date type={props.type} order='first' onChange={props.onDoubleChangeDate}/>
                        <span>~</span>
                        <Date type={props.type} order='second' onChange={props.onDoubleChangeDate}/>
                    </div>
            }
        </React.Fragment>
    );
};

export default SelectDate;