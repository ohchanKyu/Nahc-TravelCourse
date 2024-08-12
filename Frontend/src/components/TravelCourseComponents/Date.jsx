import React, { useState } from "react";
import './Date.css';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import moment from "moment";
import classes from './DateComponent.module.css';
import { FaCalendarDays } from "react-icons/fa6";
import Modal from "../../layout/Modal";

const Date = (props) => {
    
    const [nowDate, setNowDate] = useState("날짜 선택");
    const [isOpen, setIsOpen] = useState(false);

    const handleToggleCalendar = () => {
        setIsOpen(!isOpen);
    };

    const handleDateChange = (selectedDate) => {
        if (props.type === '1'){
            props.onChange(moment(selectedDate).format("YYYY-MM-DD"))
        }else if (props.type === '2'){
            if (props.order === 'first'){
                props.onChange(1,moment(selectedDate).format("YYYY-MM-DD"))
            }else{
                props.onChange(2,moment(selectedDate).format("YYYY-MM-DD"))
            }
        }
        setIsOpen(false);
        setNowDate(moment(selectedDate).format("YYYY-MM-DD"));
    };

    return (
        <React.Fragment>
            <div className={classes.toggle_container}>
                {nowDate}<FaCalendarDays onClick={handleToggleCalendar} className={classes.calendar_icon}/>
            </div>
            {isOpen && 
                <React.Fragment>
                    <Modal>
                        <div className={classes.calendar_modal_container}>
                            <Calendar value={props.date} onChange={handleDateChange}
                                formatDay={(locale, date) => moment(date).format("DD")}>
                            </Calendar>
                        </div>
                        <p className={classes.calendar_modal_message}>
                            ※ 원하는 날짜를 클릭하시면 선택이 완료됩니다.
                        </p>
                    </Modal>   
                </React.Fragment>
            }
        </React.Fragment>
    );
};

export default Date;

