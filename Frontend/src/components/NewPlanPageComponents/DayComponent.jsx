import React, { useState, useEffect, useReducer } from "react";
import classes from "./DayComponent.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "../../layout/Modal";
import Note from "./Note";
import SearchPlace from "./SearchPlace";
import NoteCard from "./NoteCard";
import PlaceCard from "./PlaceCard";

const initialDetail = {
    dayCardDetail : false,
}

const placeReducer = (state,action) => {

    if (action.type === 'RESET'){
        return [];
    }

    if (action.type === "INITIAL"){
        return action.data;
    }

    if (action.type === 'ADD'){
        if (action.placeType === "PLACE"){        
            const newDataArray = [];
            for(var i=0;i<action.data.length;i++){
                const allNumber = state.length + i + 1;
                const placeNumber =  state.filter(item => item.type === "PLACE").length + i + 1;
                const data = action.data[i].data;
                newDataArray.push({
                    type : "PLACE",
                    data : data,
                    allNumber,
                    placeNumber,
                })
            }
            const fetchDataArray = [
                ...state,
                ...newDataArray
            ]
            for(i=0;i<fetchDataArray.length;i++){
                const type = fetchDataArray[i].type;
                if (type !== "NOTE"){
                    const placeNumber = fetchDataArray[i].placeNumber;
                    if (parseInt(placeNumber) !== 1){
                        const previousPlaceIndex =  fetchDataArray.findIndex(
                            item =>  item.placeNumber === (parseInt(placeNumber) - 1)
                        );
                        const previousItem = fetchDataArray[previousPlaceIndex];
                        fetchDataArray[i] = {
                            ...fetchDataArray[i],
                            previousItem : {
                                ...previousItem
                            }
                        }
                    }
                }
            }
            return fetchDataArray

        }else if (action.placeType === "NOTE"){
            const allNumber = state.length + 1;
            const newData = {
                type : "NOTE",
                data : action.data,
                allNumber
            }
            return [...state,newData]
        }
       
    }

    if (action.type === "REMOVE"){

        let removeItemArray;
        const newDataArray = [];
        removeItemArray =  state.filter(
            item =>  item.allNumber !== action.data.allNumber
        );
        let placeCount = 0;
        for(i=0;i<removeItemArray.length;i++){
            const type = removeItemArray[i].type;
            const allNumber = i + 1;
            if (type === "PLACE"){
                placeCount += 1;
                newDataArray.push({
                    ...removeItemArray[i],
                    allNumber,
                    placeNumber : placeCount
                })
            }else if (type === "NOTE"){
                newDataArray.push({
                    ...removeItemArray[i],
                    allNumber,
                })
            }
        }
        for(i=0;i<newDataArray.length;i++){
            const type = newDataArray[i].type;
            if (type !== "NOTE"){
                const placeNumber = newDataArray[i].placeNumber;
                if (parseInt(placeNumber) === 1){
                    newDataArray[i] = {
                        ...newDataArray[i],
                    }
                    delete newDataArray[i].previousItem;
                }else{
                    const previousPlaceIndex =  newDataArray.findIndex(
                        item =>  item.placeNumber === (parseInt(placeNumber) - 1)
                    );
                    const previousItem = newDataArray[previousPlaceIndex];
                    newDataArray[i] = {
                        ...newDataArray[i],
                        previousItem : {
                            ...previousItem
                        }
                        
                    }
                }
            }
        }
        return [
            ...newDataArray
        ]
    }

    if (action.type === "EDIT"){
        const editType = action.data.type;
        const newData = action.newData;
       
        let editItemIndex;
        let newDataArray = [...state];

        if (editType === "PLACE"){
            editItemIndex =  state.findIndex(
                item =>  item.allNumber === action.data.allNumber
            );
            if (action.kind === "NOTE"){
                if (newData.trim().length === 0){
                    newDataArray[editItemIndex] = {
                        ...newDataArray[editItemIndex],
                    }
                    delete newDataArray[editItemIndex].note;
                }else{
                    newDataArray[editItemIndex] = {
                        ...newDataArray[editItemIndex],
                        note : newData
                    }
                }
            }else if (action.kind === "TIME"){
                if (newData.trim().length === 0){
                    newDataArray[editItemIndex] = {
                        ...newDataArray[editItemIndex],
                    }
                    delete newDataArray[editItemIndex].time;
                }else{
                    newDataArray[editItemIndex] = {
                        ...newDataArray[editItemIndex],
                        time : newData
                    }
                }
            }
        }else if (editType === "NOTE"){
            editItemIndex =  state.findIndex(
                item =>  item.allNumber === action.data.allNumber
            );
            if (action.kind === "NOTE"){
                newDataArray[editItemIndex] = {
                    ...newDataArray[editItemIndex],
                    data : {
                        text : newData,
                    }
                }
            }else if (action.kind === "TIME"){
                if (newData.trim().length === 0){
                    newDataArray[editItemIndex] = {
                        ...newDataArray[editItemIndex],
                    }
                    delete newDataArray[editItemIndex].time;
                }else{
                    newDataArray[editItemIndex] = {
                        ...newDataArray[editItemIndex],
                        time : newData
                    }
                }
            }
        }
        return [
            ...newDataArray
        ]
    }
};

const detailReducer = (state,action) => {
    if (action.type === "DAYCARD"){
        return {
            ...state,
            dayCardDetail : !state.dayCardDetail
        }
    }
};

const DayComponent = (props) => {

    const [isSearchModalOpen,setIsSearchModalOpen] = useState(false);
    const [isNoteOpen,setIsNoteOpen] = useState(false);

    const [placeState, placeDispatch] = useReducer(placeReducer, props.initialState);
    const [detailState,detailDispatch] = useReducer(detailReducer,initialDetail);

    const addItem = (itemData) => {
        placeDispatch({ 
            type : 'ADD',
            placeType : itemData.type,
            data : itemData.data
         });
    }

    const editDateInitialItems = (itemData) => {
        placeDispatch({
            type : "INITIAL",
            data : itemData
        })
    }

    const editItem = (itemData) => {
        placeDispatch(itemData);
    }

    const removeItem = (itemData) => {
        placeDispatch(itemData);
    }
    
    const removeAllItemHandler = () => {
        placeDispatch({
            type : 'RESET'
        })
    };

    const showSearchPlaceHandler = () => {
        setIsSearchModalOpen(true);
    }

    const closeSearchPlaceHandler = () => {
        setIsSearchModalOpen(false);
    }

    const showNoteHandler = () => {
        setIsNoteOpen(true);
    }

    const closeNoteHandler = () => {
        setIsNoteOpen(false);
    }

    useEffect(() => {
        props.onSave(props.componentId,placeState);
    },[placeState])

    useEffect(() => {
        editDateInitialItems(props.initialState);
    },[props.initialState]);

    const variants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
        exit : {opacity : 0, y: -30}
    }

    return (
        <React.Fragment>
            <div className={classes.container}>
                <div className={classes.day_container}>
                    <span className={classes.day}># Day {props.order}</span>
                    <span className={classes.date}>{props.date} / {props.dayOfWeekString}</span>
                    <IoIosArrowDown style={{ cursor : 'pointer', marginBottom : '10px' }} className={`${classes.rotate180} ${detailState.dayCardDetail ? classes.active : ''}`} onClick={() => detailDispatch({type : 'DAYCARD'})}/>
                </div>
                <AnimatePresence>
                    {detailState.dayCardDetail && 
                        <motion.div
                            variants={variants} 
                            animate='animate'
                            initial='initial'
                            exit='exit'
                            className={classes.component_container} >
                            <AnimatePresence>
                                {placeState.length !== 0 && (
                                    <div className={classes.place_list_container}>
                                            <motion.ul exit={{ opacity : 0, y: -30 }}className={classes.place_list}>
                                                <AnimatePresence>
                                                    {placeState.map(item => {
                                                        if (item.type === "PLACE"){
                                                            return (
                                                                <motion.div 
                                                                    key={item.allNumber} 
                                                                    variants={variants} 
                                                                    animate='animate'
                                                                    initial='initial'
                                                                    exit='exit'>
                                                                    <PlaceCard 
                                                                    onEdit={editItem}
                                                                    onRemove={removeItem}
                                                                    item={item}/>    
                                                                </motion.div>
                                                                
                                                            )
                                                        }else if (item.type === "NOTE"){
                                                            return (
                                                                <motion.div
                                                                    key={item.allNumber} 
                                                                    variants={variants} 
                                                                    animate='animate'
                                                                    initial='initial'
                                                                    exit='exit'>
                                                                        <NoteCard 
                                                                        onEdit={editItem}
                                                                        onRemove={removeItem} 
                                                                        item={item}/>
                                                                </motion.div>
                                                            )
                                                        }
                                                    })}
                                                </AnimatePresence>
                                            </motion.ul>
                                    </div>
                                )}   
                            </AnimatePresence> 
                            <div className={classes.button_container}>
                                <motion.button whileHover={{ scale : 1.1 }} onClick={showSearchPlaceHandler}>장소 추가</motion.button>
                                <motion.button whileHover={{ scale : 1.1 }} onClick={showNoteHandler}>메모 추가</motion.button>
                                <motion.button whileHover={{ scale : 1.1 }} onClick={removeAllItemHandler}>초기화 하기</motion.button>
                            </div>
                            {isNoteOpen && (
                                <Modal>
                                    <Note 
                                        onSubmit={addItem}
                                        onClose={closeNoteHandler}/>
                                </Modal>
                            )}
                            {isSearchModalOpen &&  (
                                <Modal>
                                    <SearchPlace
                                        onSubmit={addItem}
                                        locationX={props.locationX}
                                        locationY={props.locationY}
                                        onClose={closeSearchPlaceHandler}/>
                                </Modal>
                            )}
                        </motion.div>
                    }
                </AnimatePresence>
              
            </div>
        </React.Fragment>
    );
};

export default DayComponent;