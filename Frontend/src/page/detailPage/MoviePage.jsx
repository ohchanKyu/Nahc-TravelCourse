import React, { useState, useEffect } from 'react';
import classes from "./MoviePage.module.css";
import useAuthFunction from '../../hooks/useAuthFunction';
import useFetchPlaceItem from '../../hooks/useFetchPlaceItem';
import { motion } from 'framer-motion';
import { getLocaleByAddress, getCinemaLocation } from "../../api/LocationApiService";
import { getAllMovie } from '../../api/CategoryApiService';
import { BiCameraMovie } from "react-icons/bi";
import DetailPageHeader from '../../components/BaseComponents/DetailPageHeader';
import DetailPageSummary from '../../components/BaseComponents/DetailPageSummary';
import DetailPageAddress from '../../components/BaseComponents/DetailPageAddress';
import MovieList from '../../components/MoviePageComponents/MovieList';
import PlaceItemCarousel from '../../components/MainPageComponents/PlaceItemCarousel';
import Loading from '../../components/Loading';
import Footer from '../../components/Footer';

const MoviePage = () => {

    const [movieData,setMovieData] = useState([]);
    const [cinema,setCinema] = useState([]);
    const [isLoading,setIsLoading] = useState(false);

    const functionHandler = useAuthFunction();
    const fetchplaceItemHandler = useFetchPlaceItem();

    const getMovieLocation = async (address) => {
        setIsLoading(true);
        const localeResponseData = await functionHandler(getLocaleByAddress,{
            address
        });
        const cinemaResponseData = await functionHandler(getCinemaLocation,{
            x : localeResponseData.x,
            y : localeResponseData.y,
        });
        const fetchDatas = await fetchplaceItemHandler({
            placeDatas : cinemaResponseData, 
            originX : localeResponseData.x,
            originY : localeResponseData.y,
        })
        setCinema(fetchDatas);
        setIsLoading(false);
    };

    const variants = {
        initial : { opacity : 0, y : -50},
        animate : { opacity : 1, y : 0},
    }

    useEffect(() => {
        const getMovies =  async () => {
            setIsLoading(true);
            const getMoviesResponseData = await functionHandler(getAllMovie);
            setMovieData(getMoviesResponseData);
            setIsLoading(false);
        }
        getMovies();
     },[]);


    return (
        <React.Fragment>
            {isLoading && <Loading/>}
            <DetailPageHeader selectCategory='Movie'/>
            <DetailPageSummary headerText='영화관 검색'
                text='현재 상영중인 박스 오피스 TOP 10 영화와 
                입력 주소를 기반으로 근처 영화관 정보를 
                얻을 수 있습니다.'
            />
            <div className={classes.movie_container}>
                <h2 className={classes.movie_header}>현재 상영중인 <span style={{color : 'rgb(233 116 37)'}}>박스 오피스 Top 10</span> 영화를 만나보세요!</h2>
                <h1 className={classes.movie_text}><BiCameraMovie/> Box Office Top 10 </h1>
                <div className={classes.movie_list_container}>
                    <MovieList movieData={movieData}/>
                </div>
            </div>
            <DetailPageAddress 
                header='근처 영화관 알아보기'
                text='입력하신 주소를 바탕으로 근처에 있는 영화관을 찾아드립니다.'
                onPlaceLocation={getMovieLocation}/>
            {cinema && (
                     <motion.div 
                        variants={variants}
                        key={Math.random()}
                        initial='initial'
                        animate='animate'
                        className={classes.result_container}>
                            <PlaceItemCarousel item={cinema}/>
                    </motion.div>
            )}
            <Footer/>
        </React.Fragment>
        
    );
};

export default MoviePage;