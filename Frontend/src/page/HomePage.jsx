import Login from "../components/UserComponents/Login";
import React from "react";
import image from "../image/homeImg.jpg";
import classes from "./Homepage.module.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HomePage = () => {
    return (
        <React.Fragment>
            <div className={classes.box_container}>
                <div className={classes.container}>
                    <div className={classes.login_box_container}>
                        <Login/>
                        <div className={classes.find_user}>
                            <Link className={classes.new_user} to="/signup"> 회원가입 </Link>
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

export default HomePage;