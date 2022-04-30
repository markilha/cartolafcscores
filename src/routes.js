import {BrowserRouter,Route,Switch} from 'react-router-dom';

import Home from './pages/Home';
import Atletas from './pages/Atletas';
import Escalacao from './pages/escalacao';
import Header from './components/Header';
import Edit from './pages/escalacao/edit'


const Routes = ()=>{
    return(
        <BrowserRouter>
        <Header/>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/atletas" component={Atletas}/>
            <Route exact path="/escalacao" component={Escalacao}/>
            <Route exact path="/escalacao/edit/:id" component={Edit}/>
            <Route exact path="/escalacao/new/:rodada" component={Edit}/>
        </Switch>
        </BrowserRouter>
    )
}

export default Routes;

