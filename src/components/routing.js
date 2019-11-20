import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import Landing from './landing';
import Search from './search';
import Redirector from './redirector';

class Routing extends Component{
    render(){
        return(
            
            <Switch>
                <Route exact path={'/'} component={Landing}/>
                <Route path={'/search/:value'} component={Search}/>
                <Route path={'/redirector/:value'} component={Redirector}/>
            </Switch>
        )
    }
}
export default Routing;