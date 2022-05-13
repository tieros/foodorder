import { useContext } from 'react';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import CartProvider from './store/CartProvider';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import { AuthContext } from './store/auth-context';
import ProfileInfo from './components/Profile/ProfileInfo';

function App() {
    const authCtx = useContext(AuthContext);

    return (
        <>
            <CartProvider>
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    {!authCtx.isLoggedIn ? <Route path='/login' component={LoginPage} /> : <Route path='/profile' component={ProfileInfo} />}
                    <Route path='/cart' component={Cart} />
                </Switch>
            </CartProvider>
        </>
    );
}

export default App;
