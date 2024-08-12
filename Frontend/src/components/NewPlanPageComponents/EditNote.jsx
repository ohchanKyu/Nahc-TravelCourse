import React, { useState } from "react";
import classes from "./EditNote.module.css";
import { CiStickyNote } from "react-icons/ci";
import { motion } from "framer-motion";

const EditNote = (props) => {

    const [text, setText] = useState("");
    const [state,setState] = useState({
      valid : true,
      message : ''
    });
    
    let headerText = '';
    if (props.onType === 'place'){
        if (props.onState){
            headerText = '메모 변경'
        }else{
            headerText = '메모 추가'
        }
    }else{
        headerText = '메모 변경'
    }
    const changeInputHandler = (event) => {
        setText(event.target.value);
    };
  
    const submitHandler = () => {
       if (text.trim().length === 0){
          setState(item => {
              return {
                  ...item,
                  valid :false,
                  message : '내용을 입력해주세요!'
              }
          })
          return;
       }
       props.onClose();
       props.onSubmit(text);
    };

    const removeHandler = () => {
        props.onClose();
        props.onSubmit('');
    }
  
    const handleSetTab = (event) => {
      if (event.keyCode === 9) {
        event.preventDefault();
        let val = event.target.value;
        let start = event.target.selectionStart;
        let end = event.target.selectionEnd;
        event.target.value = val.substring(0, start) + "\t" + val.substring(end);
        event.target.selectionStart = event.target.selectionEnd = start + 1;
        changeInputHandler(event);
        return false;
      }
    };
   
    const variants = {
      initial : { opacity : 0, y : -30},
      animate : { opacity : 1, y : 0},
    }
  
      return (
          <div className={classes.note_container}>
              <h4> {headerText}  <CiStickyNote style={{ marginBottom : '5px'}}/> </h4>
              <textarea
                  placeholder="잊기 쉬운 정보나 부분 일정을 메모해 보세요."
                  value={text}
                  onChange={(event) => changeInputHandler(event)}
                  onKeyDown={(event) => handleSetTab(event)}
              ></textarea>
              {!state.valid && <motion.p key={state.message}
                  animate='animate' initial='initial' variants={variants}
                  className={classes.message}>{state.message}</motion.p>}
              {props.onState && (
                <div className={classes.button_container}>
                    <motion.div 
                        whileHover={{backgroundColor:'#0260be', color:'#fff'}}
                        onClick={removeHandler}
                        className={classes.cancel_container}>
                        삭제
                    </motion.div>
                    <motion.div 
                        onClick={submitHandler}
                        whileHover={{backgroundColor:'#0260be', color:'#fff'}}
                        className={classes.submit_container}>
                        변경
                    </motion.div>
                </div>
              )}
              {!props.onState && (
                <div className={classes.button_container}>
                    <motion.div 
                        whileHover={{backgroundColor:'#0260be', color:'#fff'}}
                        onClick={props.onClose} 
                        className={classes.cancel_container}>
                        취소
                    </motion.div>
                    <motion.div 
                        onClick={submitHandler}
                        whileHover={{backgroundColor:'#0260be', color:'#fff'}}
                        className={classes.submit_container}>
                        저장
                    </motion.div>
                </div>
              )}
              
          </div>
      );
};

export default EditNote;