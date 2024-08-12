import React from "react";
import classes from "./CafeCategory.module.css";
import { MdCategory } from "react-icons/md";
import CafeCategoryCard from "./CafeCategoryCard";
import { motion } from "framer-motion";


const cardText = [
    {   
        header : 'Choose!',
        title : '카테고리 선택',
        text : '대표적인 카페 4곳에 대하여 선택이 가능합니다. 입력 주소와 선택한 카페에 따라 근처에 있는 카페 정보를 가져옵니다.'
    },
    {
        header : 'Choose!',
        title : '통합 검색',
        text : '카테고리 선택 및 직접 입력이 아닌 통합 검색을 통해 입력 주소에 근처에 있는 카페 정보를 가져옵니다.'
    },
    {
        header : 'Choose!',
        title : '직접 입력',
        text : '직접 카페명을 입력하여 검색이 가능합니다. 입력 주소와 입력한 카페명에 따라 근처에 있는 카페 정보를 가져옵니다.'
    }
]


const CafeCategory = (props) => {

    const variants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
        exit : {opacity : 0, y : 50}
    }

    const selectTypeHandler = (event) => {
        const type = event.target.dataset.title;
        props.onType(type);
        props.onCafe("통합 검색");
    }

    return (
        <div className={classes.container}>
            <h4><MdCategory style={{ marginBottom : '5px' }}/> 카페 카테고리 설정 방법 </h4>
            <motion.div variants={variants} whileInView={'animate'} exit='exit' initial='initial' className={`row ${classes.category_container}`}>
                {
                    cardText.map(item => {
                        return (
                            <motion.div onClick={selectTypeHandler} data-title={item.title} whileHover={{ scale : 1.1 }} className='col col-lg-4'>
                                <CafeCategoryCard header={item.header} title={item.title} text={item.text}/>
                            </motion.div>
                        );
                    })

                }
            </motion.div>
            <p className={classes.message}>※ 위의 3가지 항목 중 하나를 선택해주세요.</p>
        </div>
    );
};

export default CafeCategory;