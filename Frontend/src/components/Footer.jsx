import React from "react";
import classes from './Footer.module.css';
import { MdOutlineMailOutline } from "react-icons/md";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <React.Fragment>
            <footer className={classes.footer}>
                 <div className={classes.footer_text_container}>
                    <div className={classes.footer_logo}>NaHC</div>
                    <div className={classes.footer_description}>Travel Course Application</div>
                    <div className={classes.copyright}>@Ohkyuchan Web Developer</div>
                    <span className={classes.email}><MdOutlineMailOutline/> okc0202@naver.com</span>
                    <span className={classes.git_hut}><FaGithub/> https://github.com/ohchanKyu</span>
                </div>
            </footer>
            
        </React.Fragment>
    );
};

export default Footer;