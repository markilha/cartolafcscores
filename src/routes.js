import {BrowserRouter,Route,Switch} from 'react-router-dom';

import Home from './pages/Home';
import Atletas from './pages/Atletas';
import Header from './components/Header';


const Routes = ()=>{
    return(
        <BrowserRouter>
        <Header/>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/atletas" component={Atletas}/>
        </Switch>
        </BrowserRouter>
    )
}

export default Routes;
