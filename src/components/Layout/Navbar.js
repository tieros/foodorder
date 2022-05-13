import { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../store/auth-context';
import CartContext from '../../store/cart-context';
import CartIcon from '../UI/CartIcon';
import './Navbar.scss';
export default function Navbar() {
    const authCtx = useContext(AuthContext);
    const [btnAnimated, setBtnAnimated] = useState(false);

    const ctx = useContext(CartContext);

    const { items } = ctx;

    const numberOfCartItems = items.reduce((currentNum, item) => {
        return currentNum + item.amount;
    }, 0);

    // const btnClasses = `${style.button} ${btnAnimated ? style.bump : ''}`;

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
        <>
            <nav>
                <ul>
                    <div>
                        <li>Logo</li>
                    </div>
                    <div>
                        <li>{authCtx.isLoggedIn ? profileLink : loginLink}</li>
                        <li>
                            <NavLink to='/cart'>
                                <span>
                                    <CartIcon />
                                </span>
                                <span> Cart</span>
                                <span>{numberOfCartItems}</span>
                            </NavLink>
                        </li>
                    </div>
                </ul>
            </nav>
        </>
    );
}
