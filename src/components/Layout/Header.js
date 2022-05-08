import style from './Header.module.css';
import mealimage from '../../assets/hamburger1.jpg';
import CartIcon from '../../components/UI/CartIcon';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import { AuthContext } from '../../store/auth-context';
import Navbar from './Navbar';
export default function Header(props) {
    const [btnAnimated, setBtnAnimated] = useState(false);

    const ctx = useContext(CartContext);
    const authCtx = useContext(AuthContext);

    const { items } = ctx;

    const numberOfCartItems = items.reduce((currentNum, item) => {
        return currentNum + item.amount;
    }, 0);

    const btnClasses = `${style.button} ${btnAnimated ? style.bump : ''}`;

    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnAnimated(true);

        const timer = setTimeout(() => {
            setBtnAnimated(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    return (
        <>
            <header className={style.header}>
                <div className={style.headerButtons}>
                    <Navbar />
                    <button onClick={props.onShowCart} className={btnClasses}>
                        <span className={style.icon}>
                            <CartIcon />
                        </span>
                        <span> Cart</span>
                        <span className={style.badge}>{numberOfCartItems}</span>
                    </button>
                </div>
            </header>
            <div className={style['main-image']}>
                <img src={mealimage} alt='meal' />
            </div>
        </>
    );
}
