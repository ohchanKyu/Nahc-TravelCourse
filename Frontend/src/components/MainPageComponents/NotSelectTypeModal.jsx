import React from "react";
import classes from './NotSelectTypeModal.module.css';
import { MdError } from "react-icons/md";
import { MdDoubleArrow } from "react-icons/md";
import { HiSpeakerphone } from "react-icons/hi";

const NotSelectTypeModal = () => {
    return (
        <div className={classes.container}>
            <h4><MdError style={{ marginBottom : '3px'}}/> 검색할 수 없습니다.</h4>
            <p>주소를 설정하기 전 카테고리 설정 또는 장소 입력을 완료해야 합니다.</p>
            <h5><HiSpeakerphone style={{ marginBottom : '5px'}}/> 아래 순서에 따라서 진행해주세요.</h5>
            <ul>
                <li key='1'><MdDoubleArrow style={{ marginBottom : '5px'}}/> 카테고리 설정 </li>
                <li key='2'><MdDoubleArrow style={{ marginBottom : '5px'}}/> 장소 선택 및 직접 입력 </li>
                <li key='3'><MdDoubleArrow style={{ marginBottom : '5px'}}/> 주소 설정 </li>
                <li key='4'><MdDoubleArrow style={{ marginBottom : '4px'}}/> 결과 확인 </li>
            </ul>
        </div>
    );
};

export default NotSelectTypeModal;