import {BrowserRouter,Route,Switch} from 'react-router-dom';

import Home from './pages/Home';
import Header from './components/Header';
import SignIn from './pages/signin';



const Routes = ()=>{
    return(
        <BrowserRouter>
        <Header/>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/signin" component={SignIn}/>
         
        </Switch>
        </BrowserRouter>
    )
}

export default Routes;

