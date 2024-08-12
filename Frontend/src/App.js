import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './page/HomePage';
import MainPage from './page/MainPage';
import RootLayout from './page/Root';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import SignupPage from "./page/SignupPage";
import FindIdPage from "./page/FindIdPage";
import FindPassPage from "./page/FindPassPage";
import AuthProvider from "./store/AuthProvider";
import LoginProvider from './store/LoginProvider';
import MoviePage from "./page/detailPage/MoviePage";
import FoodStorePage from './page/detailPage/FoodStorePage';
import HotelPage from './page/detailPage/HotelPage';
import CafePage from './page/detailPage/CafePage';
import ParkPage from './page/detailPage/ParkPage';
import PlayPage from './page/detailPage/PlayPage';
import TravelCoursePage from './page/detailPage/TravelCoursePage';
import MyPage from "./page/detailPage/Mypage";
import DayComponentPage from "./page/detailPage/DayComponentPage";

const router = createBrowserRouter([

  { path : '/' , 
    element : <HomePage/>, 
  },
  {
    path : '/signup',
    element : <SignupPage/>
  },
  {
    path : '/findId',
    element : <FindIdPage/>
  },
  {
    path : '/findPass',
    element : <FindPassPage/>
  },
  {
    path : '/NaHC',
    element : <RootLayout/>,
    children : [
      {
        path : "main",
        element : <MainPage/>,
      },
      {
        path : 'movieDetail',
        element : <MoviePage/>,
      },
      {
        path : 'foodStoreDetail',
        element : <FoodStorePage/>
      },
      {
        path : 'hotelDetail',
        element : <HotelPage/>
      },
      {
        path : 'cafeDetail',
        element : <CafePage/>
      },
      {
        path : 'parkDetail',
        element : <ParkPage/>
      },
      {
        path : 'playDetail',
        element : <PlayPage/>
      },
      {
        path : 'travelCourseDetail',
        element : <TravelCoursePage/>
      },
      {
        path : 'dayComponentDetail',
        element : <DayComponentPage/>
      },
      {
        path : 'myDetail',
        element : <MyPage/>,
      },
    ]
  }

]);


function App() {

  return (
    <LoginProvider>
        <AuthProvider>
          <RouterProvider 
            router={router}  
          >
          </RouterProvider>
        </AuthProvider>
    </LoginProvider>
  );

}

export default App;
