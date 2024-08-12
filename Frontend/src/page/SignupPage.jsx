import Signup from "../components/UserComponents/Signup";
import React,{ useState} from "react";
import { Link } from "react-router-dom";
import classes from "./SignupPage.module.css";
import UserModal from "../components/UserComponents/UserModal";
import { motion } from "framer-motion";
import image from "../image/homeImg.jpg";

const defaultModalContent = {
    type : "",
    data : ""
}

const SignupPage = () => {

    const [modalIsShown,setIsModalShown] = useState(false);
    const [modalContent,setModalContent] = useState(defaultModalContent);

    const showModalHandler = () => {
        setIsModalShown(true);
    }

    const closeModalHandler = () => {
        setIsModalShown(false);
    }

    const changeModalContent = (newState) => {
        setModalContent(newState);
    };

    return (
        <React.Fragment>
            {modalIsShown && <UserModal onClose={closeModalHandler} modalContent={modalContent}/>}
            <div className={classes.box_container}>
                <div className={classes.container}>
                    <div className={classes.signup_box_container}>
                        <Signup onModalShown={showModalHandler} onChangeModal={changeModalContent}/>
                        <div className={classes.find_user}>
                            <Link className={classes.login} to="/"> 로그인 </Link>
                            <Link className={classes.find_id} to="/findId"> 이메일 찾기 </Link>
                            <Link className={classes.find_pass} to="/findPass"> 비밀번호 변경</Link>
                        </div>
                    </div>
                    <div className={classes.image_box_container}
                    >
                        <motion.img className={classes.image} src={image} alt='home-img'
                            initial={{ opacity : 0, y : 0}}
                            animate={{ opacity : 1,  y : 0}}/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );

};

export default SignupPage;