import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { motion } from "framer-motion";

const MainNavigation = (props) => {

    const logout = () => {
        props.logout();
    }

    return (
        <nav id={classes.main_header} className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor:"#201d2e"}}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/NaHC/main"> NaHC </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/NaHC/main">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/NaHC/myDetail">My Page</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Category
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to="/NaHC/movieDetail" style={{fontWeight:'bold'}}>영화</Link></li>
                                <li><Link className="dropdown-item" to="/NaHC/hotelDetail" style={{fontWeight:'bold'}}>숙소</Link></li>
                                <li><Link className="dropdown-item" to="/NaHC/foodStoreDetail" style={{fontWeight:'bold'}}>음식점</Link></li>
                                <li><Link className="dropdown-item" to="/NaHC/cafeDetail" style={{fontWeight:'bold'}}>카페</Link></li>
                                <li><Link className="dropdown-item" to="/NaHC/parkDetail" style={{fontWeight:'bold'}}>공원 및 산책로</Link></li>
                                <li><Link className="dropdown-item" to="/NaHC/playDetail" style={{fontWeight:'bold'}}>놀거리</Link></li>
                                <li><Link className="dropdown-item" to="/NaHC/travelCourseDetail" style={{fontWeight:'bold'}}>일정 계획</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <motion.span whileHover={{scale:1.1}} className="nav-link" onClick={logout} style={{cursor:"pointer"}}>Logout</motion.span>
                        </li>
                    </ul>
                    <Link to="#" className={classes.user_name} style={{float:"right", color:'white'}}>{props.name}님</Link>
                </div>
            </div>
        </nav>
    );
};

export default MainNavigation;