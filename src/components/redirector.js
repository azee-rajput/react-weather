import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';


class Redirector extends Component{
    render(){
        return(
            <Redirect to={'/search/'+this.props.match.params.value}/>
        )
    }
}

export default Redirector;