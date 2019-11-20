import React, {Component} from 'react';

import Weather from './weather';

class Landing extends Component{
    constructor(props){
        super(props);
        this.state = {
            lat : 36.7783,
            lon : -119.417931,
            found : false,
            location : [],
            watch: null
        }
    }

    componentDidMount(){
        this.state.watch = navigator.geolocation.watchPosition(
            position => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    this.setState({
                        lat:latitude,
                        lon:longitude,
                        found: true,
                    })
                    console.log(this.state.lat+"..."+this.state.lon)
                    },
            error => console.log(error)
        );
        
    }


    render(){
        if(this.state.found){
            navigator.geolocation.clearWatch(this.state.watch);
            return(
                <Weather latitude={this.state.lat} longitude={this.state.lon} city={false}/>
            )
        }
        return(
            <div>
                <p>Landing</p>
                <Weather latitude={this.state.lat} longitude={this.state.lon} city={false}/>
            </div>
        )
    }
}

export default Landing;