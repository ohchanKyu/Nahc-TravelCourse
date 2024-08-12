import React, { useState } from "react";
import classes from "./NoteCard.module.css";
import { CiStickyNote } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "../../layout/Modal";
import Time from "./Time";
import EditNote from "./EditNote";
import { FaStickyNote } from "react-icons/fa";
import { MdTimer } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";

const NoteCard = (props) => {

    const [isTimeOpen,setIsTimeOpen] = useState(false);
    const [isNoteOpen,setIsNoteOpen] = useState(false);

    const timeState = props.item.time ? true : false;

    const editItemHandler = ({ type,kind,data,newData }) => {
        props.onEdit({
            type,kind,data,newData
        })
    };

    const removeItemHandler = ({ type,data }) => {
        props.onRemove({
            type,data
        })
    }

    const openTimeHandler = () => {
        setIsTimeOpen(true);
    };

    const closeTimeHandler = () => {
        setIsTimeOpen(false);
    }

    const openNoteHandler = () => {
        setIsNoteOpen(true);
    }

    const closeNoteHandler = () => {
        setIsNoteOpen(false);
    }

    const submitTimeHandler = (timeText) => {
        editItemHandler({ type : "EDIT", kind : "TIME", data : props.item, newData : timeText});
    };

    const submitNoteHandler = (text) => {
        editItemHandler({ type : "EDIT", kind : "NOTE", data : props.item, newData : text});
    };


    const variants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
        exit : {opacity : 0, y: -30}
    }


    return (
        <div className={classes.container}>
            <div className={classes.order_bar}>
                <CiStickyNote style={{ marginBottom : '5px'}}/>
                <AnimatePresence>
                        {props.item.time && 
                            <div className={classes.time_box}>
                                <motion.p 
                                    variants={variants}
                                    animate='animate' initial='initial' exit='exit'
                                    key={props.item.time}
                                    className={classes.time}>
                                    {props.item.time}
                                </motion.p>
                            </div>
                        }
                </AnimatePresence>
            </div>
            <div className={classes.note_card_container}>
                <motion.p
                    key={props.item.data.text} 
                    variants={variants}
                    animate='animate'
                    initial='initial'
                    exit='exit'
                    className={classes.note_text_container}>
                    {props.item.data.text}
                </motion.p>
                <div className={classes.button_container}>
                    <motion.p whileHover={{ scale : 1.1 }}
                                    onClick={openNoteHandler}>
                        <FaStickyNote style={{ marginBottom : '5px'}}/> 메모 변경 
                    </motion.p>
                    <motion.p 
                        onClick={openTimeHandler}
                        whileHover={{ scale : 1.1 }}><MdTimer style={{ marginBottom : '5px'}}/> 
                            {timeState ? ' 시간 변경' : ' 시간 추가'}
                    </motion.p>
                    <motion.p 
                        onClick={() => removeItemHandler({ type : "REMOVE", data : props.item})}
                        whileHover={{ scale : 1.1 }}><FaTrashAlt style={{ marginBottom : '5px'}}/>  삭제 
                    </motion.p>
                </div>
            </div>
            {isTimeOpen && (
                    <Modal onClose={closeTimeHandler}>
                        <Time 
                            onSubmit={submitTimeHandler}
                            onState={timeState}
                            onClose={closeTimeHandler}/>
                    </Modal>
                )}
            {isNoteOpen &&  (
                <Modal onClose={closeNoteHandler}>
                    <EditNote
                        onType='note'
                        onState={false}
                        onClose={closeNoteHandler}
                        onSubmit={submitNoteHandler}
                    />
                </Modal>
            )}
        </div>
    );
};

export default NoteCard;

