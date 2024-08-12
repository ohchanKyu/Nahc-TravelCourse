import route from "../image/route.png";
import startLocation from "../image/startLocation.png";
import endLocation from "../image/endLocation.png";
import midLocation from "../image/midLocation.png";
import monitor from "../image/monitor.png";
import React from "react";
import classes from "./Route.module.css";
import { motion } from "framer-motion";

const Route = () => {

    const mainImageVariant = {
      initial : {
        opacity : 0,
        x : 100
      },
      animate : {
        opacity : 1,
        x : 0
      }
    }

    const startLocationVariant = {
        initial: {
          opacity: 0,
          y: -100,
        },
        animate: {
          opacity: 1,
          y: 0,
          transition: {
            type: 'spring',
            damping: 10,
            stiffness: 100,
            delay: 0.3, 
          },
        },
      };
      
      const endLocationVariant = {
        initial: {
          opacity: 0,
          y: -100,
        },
        animate: {
          opacity: 1,
          y: 0,
          transition: {
            type: 'spring',
            damping: 10,
            stiffness: 100,
            delay: 0.6,
          },
        },
      };
      
      const midLocationVariant = {
        initial: {
          opacity: 0,
          y: -100,
        },
        animate: {
          opacity: 1,
          y: 0,
          transition: {
            type: 'spring',
            damping: 10,
            stiffness: 100,
            delay: 0.9, 
          },
        },
      };

    return (
        <React.Fragment>
            <div className={classes.container}>
                <img src={route} className={classes.route} alt='route'/>
                <motion.img src={monitor}
                  className={classes.image}
                  key={monitor}
                  variants={mainImageVariant}
                  whileInView={'animate'}
                  initial='initial'
                />
                <motion.img
                    alt='start_location'
                    src={startLocation}
                    className={classes.start_location}
                    key={startLocation}
                    variants={startLocationVariant} // 각 이미지에 다른 variants 객체를 적용
                    initial='initial'
                    whileInView={'animate'}
                />
                <motion.img
                    alt='end_location'
                    src={endLocation}
                    className={classes.end_location}
                    key={endLocation}
                    variants={endLocationVariant} // 각 이미지에 다른 variants 객체를 적용
                    initial='initial'
                    whileInView={'animate'}
                />
                <motion.img
                    alt='mid_location'
                    src={midLocation}
                    className={classes.mid_location}
                    key={midLocation}
                    variants={midLocationVariant} // 각 이미지에 다른 variants 객체를 적용
                    initial='initial'
                    whileInView={'animate'}
                />
            </div>
        </React.Fragment>
    )
};

export default Route;