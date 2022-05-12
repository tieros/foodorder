import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import CartIcon from '../UI/CartIcon';
import './Navbar.scss';
import style from './Header.module.css';
import { useSelector } from 'react-redux';

export default function Navbar() {
    
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const [btnAnimated, setBtnAnimated] = useState(false);

    const items = useSelector(state => state.cart.items)

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
    const profileLink = <NavLink to='/profile'> Profile</NavLink>;
    const loginLink = <NavLink to='/login'>Login</NavLink>;
    return (
        <nav>
            <ul>
                <li>Logo</li>
                <li>{isLoggedIn ? profileLink : loginLink}</li>
                <li>
                    <NavLink to='/cart'>
                        <button className={btnClasses}>
                            <span className={style.icon}>
                                <CartIcon />
                            </span>
                            <span> Cart</span>
                            <span className={style.badge}>{numberOfCartItems}</span>
                        </button>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
