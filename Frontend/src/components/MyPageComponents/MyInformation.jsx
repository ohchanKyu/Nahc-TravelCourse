import React, { useState, useContext } from "react";
import classes from "./MyInformation.module.css";
import UserDetail from "./UserDetail";
import Modal from '../../layout/Modal';
import loginContext from "../../store/login-context";
import EditName from "./EditName";
import EditEmail from "./EditEmail";
import EditPassword from "./EditPassword";
import DeleteUser from "./DeleteUser";

const MyInformation = () => {

    const [isModal,setIsModal] = useState(false);
    const [modalType,setModalType] = useState(null);
    const loginCtx = useContext(loginContext);

    const modalHandler = (type) => {
        setIsModal(true);
        setModalType(type);
    };

    const closeModalHandler = () => {
        setIsModal(false);
    }

    return (
       <React.Fragment>
         {isModal && modalType === 'name' && (
            <Modal>
                <EditName onClose={closeModalHandler}/>
            </Modal>
         )}
        {isModal && modalType === 'email' && (
            <Modal>
                <EditEmail onClose={closeModalHandler}/>
            </Modal>
         )}
          {isModal && modalType === 'password' && (
            <Modal>
                <EditPassword onClose={closeModalHandler}/>
            </Modal>
         )}
          {isModal && modalType === 'delete' && (
            <Modal>
                <DeleteUser onClose={closeModalHandler}/>
            </Modal>
         )}  
         <div className={classes.container}>
            <div className={classes.user_header}>
                <h4>NaHC Travel</h4>
                <div className={classes.user_text_box}>
                    <p className={classes.user_name}>{loginCtx.name}</p>
                    <p className={classes.user_email}>{loginCtx.email}</p>
                </div>
            </div>
            <div className={classes.user_detail_container}>
                <UserDetail onShowModal={modalHandler}/>
            </div>
         </div>
       </React.Fragment>
    )
};

export default MyInformation;