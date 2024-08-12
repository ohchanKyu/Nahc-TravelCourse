import React from "react";
import classes from "./PlayCategory.module.css";
import PlayCategoryCard from "./PlayCategoryCard";
import { MdCategory } from "react-icons/md";
import { motion } from "framer-motion";

const cardItem = [
    {
        id :1,
        title : '# Category 선택',
        description : '5가지의 Category 중 선택하여 찾고 싶은 장소를 선정합니다.',
        items : [
            '노래방', 'PC방', '방탈출', '쇼핑', '술집'
        ]
    },
    {
        id : 2,
        title : '# Category 선택',
        description : '4가지의 Category 중 선택하여 찾고 싶은 장소를 선정합니다.',
        items : [
            '박물관', '미술관', '찜질방', '동물원'
        ]
    },
    {
        id : 3,
        title : '# 직접 입력',
        description : '찾고싶은 장소를 직접 입력하여 주소 입력을 바탕으로 근처에 있는 장소 정보를 알려줍니다.',
        items : [
            '직접 입력'
        ]
    }
];  

const PlayCategory = (props) => {

    const setType = (type) => {
        props.onType(type);
    }

    const variants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
        exit : {opacity : 0, y : 50}
    }

    return (
        <React.Fragment>
            <div className={classes.container}>
                <h4><MdCategory style={{ marginBottom : '5px'}}/> 놀거리 카테고리 설정 방법 </h4>
                <motion.div variants={variants} whileInView={'animate'} exit='exit' initial='initial' className={classes.item_list}>
                    {cardItem.map(item => {
                        return (
                            <PlayCategoryCard onSelectType={setType} key={item.id} cardItem={item}/>
                        )
                    })}
                </motion.div>
                <p className={classes.message}>※ 위의 3개 항목 중 하나를 선택해주세요.</p>
            </div>
        </React.Fragment>
    );
};

export default PlayCategory;