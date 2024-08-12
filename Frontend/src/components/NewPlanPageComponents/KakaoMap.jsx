import React,{ useEffect } from "react";

const { kakao } = window;

const KakaoMap = (props) => {
 
    useEffect(() => {
        const container = document.getElementById('map');
        const options = {
            center : new kakao.maps.LatLng(props.locationY,props.locationX),
            level : 3
        };
        const map = new kakao.maps.Map(container,options);
    },[]);

    return (
        <div id='map' style={{
            width : '300px',
            height:'300px'
        }}></div>
    )
};

export default KakaoMap;