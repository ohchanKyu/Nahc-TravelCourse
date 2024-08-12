import classes from "./PlaceDetailModal.module.css"
import React from 'react';
import ReactDOM from 'react-dom';

const Backdrop = props => {
    return <div className={classes.backdrop} onClick={props.onClose}></div>
};

const ModalOverlay = (props) => {

    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
};

const PlaceDetailModal = (props) => {

    const portalElement = document.getElementById('placeDetail');
    
    return (
        <React.Fragment>
           {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>,portalElement)} 
           {ReactDOM.createPortal(<ModalOverlay type={props.type}>{props.children}</ModalOverlay>,portalElement)}
        </React.Fragment>
    );
}

export default PlaceDetailModal;