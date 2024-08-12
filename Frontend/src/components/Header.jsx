import classes from "./Header.module.css";

const Header = () => {
    return (
        <header className={classes.header}>
            <div className={classes.header_text}>
                <h1>NaHC</h1>
                <h3>Travel Course Application</h3>
                <p>
                    NaHC App을 통해 원하는 장소에 대해
                </p>
                <p>검색 및 여행 코스를 알려줍니다!</p>
            </div>
        </header>
    )
};

export default Header;