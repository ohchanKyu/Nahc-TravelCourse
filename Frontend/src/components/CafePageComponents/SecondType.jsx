import React from "react";
import classes from "./SecondType.module.css";

const SecondType = () => {

    return (
        <React.Fragment>
            <div className={classes.container}>
                <h4> # 통합 검색 </h4>
                <p className={classes.text}> 
                    통합 검색은 특정 카페명으로 장소를 제공하지 않습니다. <br/>
                    주소 입력을 통해 근처에 있는 모든 카페를 조회하여 <br/>
                    사용자에게 제공합니다.
                </p>
                <p className={classes.message}>
                    ※ 원하시는 카페가 있으시다면 <br/>
                    <span style={{color:'rgb(233 116 37)'}}> 카테고리 선택</span> 또는 
                    <span style={{color:'rgb(233 116 37)'}}> 직접 입력</span>을 선택해주세요.
                </p>
            </div>
        </React.Fragment>
    );
};

export default SecondType;