import React, {Component} from 'react';

import Weather from './weather';

class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            city:null,
            url:this.props.match.params.city
        }
    }

    render(){
        return(
            <Weather city={this.props.match.params.value}/>
        )
    }
}

export default Search;