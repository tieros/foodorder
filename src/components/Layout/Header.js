import style from './Header.module.css';
import mealimage from '../../assets/hamburger1.jpg';
import Navbar from './Navbar';

export default function Header(props) {

    return (
        <>
            <header className={style.header}>
                <Navbar />
            </header>
            <div className={style['main-image']}>
                <img src={mealimage} alt='meal' />
            </div>
        </>
    );
}
