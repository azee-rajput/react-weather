import React, {Component} from 'react';


class Footer extends Component{
    render(){
        return(
            <div className="footering">
                <p>This is a weather forecast website designed and developed by A.Zahir on React js</p>
                <p>Backend APIs are consumed from <b><a href="https://openweathermap.org/api" rel="noopener noreferrer" target="_blank">openweathermap.org</a></b>.</p>
                <p>Hope You'll like it</p>
                <p>contact me <i className="far fa-envelope"> azee.rajput.7@gmail.com</i></p>
            </div>
        )
    }
}

export default Footer;