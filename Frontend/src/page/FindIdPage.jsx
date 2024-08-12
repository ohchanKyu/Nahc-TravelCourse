import classes from "./FindIdPage.module.css";
import FindId from "../components/UserComponents/FindId";
import { motion } from "framer-motion";
import image from "../image/homeImg.jpg";
import { Link } from "react-router-dom";
import React from "react";

const FindIdPage = () => {
    return (
        <React.Fragment>
            <div className={classes.box_container}>
                <div className={classes.container}>
                    <div className={classes.login_box_container}>
                        <FindId/>
                        <div className={classes.find_user}>
                            <Link className={classes.new_user} to="/"> 로그인 </Link>
                            <Link className={classes.find_id} to="/signup"> 회원가입 </Link>
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

export default FindIdPage;