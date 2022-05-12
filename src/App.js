import Cart from './pages/Cart';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import { Provider, useSelector } from 'react-redux';
import Profile from './pages/Profile';
import { store } from './store/index';

function App() {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    return (
        <>
        <Provider store={store}>
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    {!isLoggedIn ? 
                        <Route path='/login' component={LoginPage} /> : 
                        <Route path='/profile' component={Profile} />}
                    <Route path='/cart' component={Cart} />
                </Switch>
        </Provider>
        </>
    );
}

export default App;
