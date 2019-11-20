import React,{Component} from 'react';

import {Redirect, Link} from 'react-router-dom';

class Weather extends Component{
    constructor(props){
        super(props);
        this.state = {
            latitude : props.latitude,
            longitude : props.longitude,
            city : props.city,
            year:null,
            month:null,
            time:null,
            day:null,
            name:null,
            country:null,
            description:null,
            temp:null,
            condition:null,
            wind:null,
            humidity:null,
            pressure:null,
            icon:null,
            dn:null,
            timezone:null,
            sunrise:null,
            sunset:null,

            forecast:[],
            updated:false,
            day1:null,
            day2:null,
            day3:null,
            day4:null,
            day5:null,
            pressure1:null,
            pressure2:null,
            pressure3:null,
            pressure4:null,
            pressure5:null,
            humidity1:null,
            humidity2:null,
            humidity3:null,
            humidity4:null,
            humidity5:null,
            wind1:null,
            wind2:null,
            wind3:null,
            wind4:null,
            wind5:null,
            icon1:null,
            icon2:null,
            icon3:null,
            icon4:null,
            icon5:null,
            description1:null,
            description2:null,
            description3:null,
            description4:null,
            description5:null,

            mounted:false,
            value:null,
            clicked:false,
            error:false,
            searchFailed:null,

        }
    }

    componentDidMount(){
        var date = new Date();
        var year = date.getUTCFullYear();
        var month = date.getUTCMonth()+1;
        var day = date.getUTCDate();
        //var fdate = day+"/"+month+"/"+year;
        
        var hours = date.getUTCHours();
        var minutes = date.getUTCMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        
        var url;
        
        if(!this.state.city){
            url = "https://api.openweathermap.org/data/2.5/weather?lat="+this.state.latitude+"&lon="+this.state.longitude+"&APPID=585205b943a316d3502569db71a3fca9"
        }else{
            url = "https://api.openweathermap.org/data/2.5/weather?q="+this.state.city+"&APPID=585205b943a316d3502569db71a3fca9"
        }

        fetch(url)
        .then(response=>response.json())
        .then(json => this.setState({
            latitude:json.coord.lat,
            longitude:json.coord.lon,
            name:json.name,
            country:json.sys.country,
            description:json.weather[0].description,
            dn:json.weather[0].icon,
            temp: json.main.temp-273,
            condition: json.weather[0].main,
            humidity: json.main.humidity+"%",
            pressure: json.main.pressure+" hpa",
            wind: json.wind.speed+" m/s",
            time:strTime,
            day:day,
            month:month,
            year:year,
            timezone: json.timezone,
            sunrise:json.sys.sunrise,
            sunset:json.sys.sunset,

            mounted:true,
        }))
        .catch((error)=>{
            this.setState({error:true})
        })

    }

    componentDidUpdate(){
        if(this.state.mounted){
            fetch("https://api.openweathermap.org/data/2.5/forecast?lat="+this.state.latitude+"&lon="+this.state.longitude+"&APPID=585205b943a316d3502569db71a3fca9")
            .then(response=>response.json())
            .then(data=>this.setState({
                    forecast:data.list,
                    updated:true,
                    mounted:false,
            }))
        }
        if(this.state.updated){
//////////////////////timezone
            var date = new Date(this.state.timezone);
            // Hours part from the timestamp
            var hours = date.getHours();
            // Minutes part from the timestamp
            var minutes = "0" + date.getMinutes();

            // Will display time in 10:30:23 format
            var formattedTimezone = hours + ':' + minutes.substr(-2)
            if(hours>=0){
                formattedTimezone = "GMT +"+formattedTimezone;
            }else{
                formattedTimezone = "GMT -"+formattedTimezone;
            }
/////////////////////////sun rise time
            var riseTime = new Date(this.state.sunrise*1000);
             hours = riseTime.getHours();
             minutes = riseTime.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0'+minutes : minutes;
            var sunrise =hours + ':' + minutes + ' ' + ampm;

/////////////////////sun set time
            var setTime = new Date(this.state.sunset*1000);
             hours = setTime.getHours();
             minutes = setTime.getMinutes();
             ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0'+minutes : minutes;
            var sunset =hours + ':' + minutes + ' ' + ampm;

////////////////5-day forecast
            let temp=0;
            let per=0;
            let win = 0;
            let hum = 0;
            let day1, day2, day3, day4, day5;
            let p1,p2,p3,p4,p5;
            let h1,h2,h3,h4,h5;
            let w1, w2, w3, w4, w5;
            let d1,d2,d3,d4,d5;
            let ic =[];
            let icn = [];

            for(let i = 0; i < 8; i++){
                temp += this.state.forecast[i].main.temp;
                per += this.state.forecast[i].main.pressure;
                hum += this.state.forecast[i].main.humidity;
                win += this.state.forecast[i].wind.speed;
            }
            day1=((temp/8)-273);
            p1 = Math.round(per/8);
            h1 = Math.round(hum/8);
            w1 = Math.round(win/8);
            ic[0] = this.state.forecast[4].weather[0].main;
            d1 = this.state.forecast[4].weather[0].description;
            temp=0;
            per=0;
            win=0;
            hum=0;

            for(let i = 8; i < 16; i++){
                temp += this.state.forecast[i].main.temp;
                per += this.state.forecast[i].main.pressure;
                hum += this.state.forecast[i].main.humidity;
                win += this.state.forecast[i].wind.speed;
            }
            day2=((temp/8)-273);
            p2 = Math.round(per/8);
            h2 = Math.round(hum/8);
            w2 = Math.round(win/8);
            ic[1] = this.state.forecast[12].weather[0].main;
            d2 = this.state.forecast[12].weather[0].description;
            temp=0;
            per=0;
            win=0;
            hum=0;
            
            for(let i = 16; i < 24; i++){
                temp += this.state.forecast[i].main.temp;
                per += this.state.forecast[i].main.pressure;
                hum += this.state.forecast[i].main.humidity;
                win += this.state.forecast[i].wind.speed;
            }
            day3=((temp/8)-273);
            p3 = Math.round(per/8);
            h3 = Math.round(hum/8);
            w3 = Math.round(win/8);
            ic[2] = this.state.forecast[20].weather[0].main;
            d3 = this.state.forecast[20].weather[0].description;
            temp=0;
            per=0;
            win=0;
            hum=0;

            for(let i = 24; i < 32; i++){
                temp += this.state.forecast[i].main.temp;
                per += this.state.forecast[i].main.pressure;
                hum += this.state.forecast[i].main.humidity;
                win += this.state.forecast[i].wind.speed;
            }
            day4=((temp/8)-273);
            p4 = Math.round(per/8);
            h4 = Math.round(hum/8);
            w4 = Math.round(win/8);
            ic[3] = this.state.forecast[28].weather[0].main;
            d4 = this.state.forecast[28].weather[0].description;
            temp=0;
            per=0;
            win=0;
            hum=0;
            
            for(let i = 32; i < 40; i++){
                temp += this.state.forecast[i].main.temp;
                per += this.state.forecast[i].main.pressure;
                hum += this.state.forecast[i].main.humidity;
                win += this.state.forecast[i].wind.speed;
            }
            day5=((temp/8)-273);
            p5 = Math.round(per/8);
            h5 = Math.round(hum/8);
            w5 = Math.round(win/8);
            ic[4] = this.state.forecast[36].weather[0].main;
            d5 = this.state.forecast[36].weather[0].description;
            temp=0;
            per=0;
            win=0;
            hum=0;

            for(let j=0; j<5; j++){
                switch (ic[j]){
                    case "Thunderstorm":
                        icn[j] = "las la-poo-storm"
                        break;
                    case "Rain":
                        icn[j] = "las la-cloud-rain"
                        break;
                    case "Drizzle":
                        icn[j] = "las la-cloud-sun-rain"
                        break;
                    case "Snow":
                        icn[j] = "lar la-snowflake"
                        break;
                    case "Clear":
                        icn[j] = "las la-sun"
                        break;
                    case "Clouds":
                        icn[j] = "las la-cloud"
                        break;
                    default:
                        icn[j] = "las la-smog"
                        break;
                }
            }

            this.setState({
                timezone:formattedTimezone,
                sunrise:sunrise,
                sunset:sunset,
                day1:day1,
                day2: day2,
                day3: day3,
                day4: day4,
                day5:day5,
                pressure1:p1+" hpa",
                pressure2:p2+" hpa",
                pressure3:p3+" hpa",
                pressure4:p4+" hpa",
                pressure5:p5+" hpa",
                humidity1:h1+"%",
                humidity2:h2+"%",
                humidity3:h3+"%",
                humidity4:h4+"%",
                humidity5:h5+"%",
                wind1:w1+" m/s",
                wind2:w2+" m/s",
                wind3:w3+" m/s",
                wind4:w4+" m/s",
                wind5:w5+" m/s",
                icon1:icn[0],
                icon2:icn[1],
                icon3:icn[2],
                icon4:icn[3],
                icon5:icn[4],
                description1:d1,
                description2:d2,
                description3:d3,
                description4:d4,
                description5:d5,
                updated:false,
            })

            let dn;
            switch (this.state.condition){
                case "Thunderstorm":
                    this.setState({icon:"las la-poo-storm"});
                    break;
                case "Rain":
                    this.setState({icon:"las la-cloud-rain"});
                    break;
                case "Drizzle":
                    if(this.state.dn.includes("d")){
                        dn = "las la-cloud-sun-rain"
                    }else{
                        dn = "las la-cloud-moon-rain"
                    }
                    this.setState({icon:dn});
                    break;
                case "Snow":
                    this.setState({icon:"lar la-snowflake"});
                    break;
                case "Clear":
                    if(this.state.dn.includes("d")){
                        dn = "las la-sun"
                    }else{
                        dn = "las la-moon"
                    }
                    this.setState({icon:dn});
                    break;
                case "Clouds":
                    this.setState({icon:"las la-cloud"});
                    break;
                default:
                    this.setState({icon:"las la-smog"});
                    break;
            }
        }
       
    }

    changed(e){
         this.setState({value: e.target.value});
    }

    search(){
        if(this.state.value===null||this.state.value===""||this.state.value===undefined){
            alert("search bar is empty");
        }else{
            let value = this.state.value.split(' ').join('+');
            this.setState({
                value: value,
                clicked:true,
            })
        }
    }

    render(){
        if(this.state.clicked){
            return(
                <Redirect to={"/redirector/"+this.state.value}/>
            )
        }

        if(this.state.error){
            return (
                <div className="row text-center p-3" style={{width:"100%", margin:"auto"}}>
                    <Link to="/" onClick={() => window.location.reload()} className="col-lg-2 mb-3 display-4" style={{color:"white"}}><i className="fas fa-sun">My Weather</i></Link>
                    <div className="col-lg-10">
                        <input type="text" placeholder="search city" className="searchTerm" onChange={(e)=>this.changed(e)}/>
                        <button className="searchButton" onClick={()=>this.search()}><i className="fa fa-search"></i></button>
                    </div>
                    <p className="display-1 mt-5 col-sm-12" style={{color:"white"}}>"{this.state.city}" Not Found</p>
                </div>
            )
        }else{
            return(
                <div className="row text-center p-3" style={{width:"100%", margin:"auto"}} >
                    <Link to="/" onClick={() => window.location.reload()} className="col-lg-2 display-4 mb-3" style={{color:"white"}}><i className="fas fa-sun">My Weather</i></Link>
                    <div className="col-lg-10" style={{ margin:"auto"}}>
                        <input type="text" placeholder="search city" className="searchTerm" onChange={(e)=>this.changed(e)}/>
                        <button className="searchButton" onClick={()=>this.search()}><i className="fa fa-search"></i></button>
                    </div>

                    <div className="col-sm-12 mt-3 row text-center" style={{color:"white", margin:"auto", justifyContent:"center"}}>
                        <div className="col-md-4 wthr shadow mt-2">
                            <h1 className="col-12 mb-3">Today</h1>
                            <div className="row col-12 mb-3" style={{margin:"auto"}}>
                                <span className="col-sm-12 mb-3">Time and Date are in Coordinated Universal Time (UTC)</span>
                                <span className="col-lg-3">{this.state.day}/{this.state.month}/{this.state.year}</span>
                                <span className="col-lg-6">{this.state.name},{this.state.country}</span>
                                <span className="col-lg-3">{this.state.time}</span>
                            </div>
                            <h1 className="display-1 mb-3">{Math.round(this.state.temp)}&deg;C</h1>
                            <h1 className="display-1 mb-3"><i className={this.state.icon}></i></h1>
                            <h2 className="display-5 mb-3">{this.state.description}</h2>
                            
                            <table className=" table table-borderless table-striped">
                                <tbody>
                                    <tr>
                                        <td> Pressure <br/> <i className="las la-tachometer-alt"></i></td>
                                        <td><h6>{this.state.pressure}</h6></td>
                                    </tr>
                                    <tr>
                                        <td> Humidity <br/> <i className="las la-tint"></i></td>
                                        <td><h6>{this.state.humidity}</h6></td>
                                    </tr>
                                    <tr>
                                        <td> Wind <br/> <i className="las la-wind"></i></td>
                                        <td><h6>{this.state.wind}</h6></td>
                                    </tr>
                                    <tr>
                                        <td> Sunrise <br/> <i className="las la-hourglass-start"></i></td>
                                        <td><h6>{this.state.sunrise}</h6></td>
                                    </tr>
                                    <tr>
                                        <td> Sunset <br/> <i className="las la-hourglass-end"></i></td>
                                        <td><h6>{this.state.sunset}</h6></td>
                                    </tr>
                                    {/* <tr>
                                        <td> Timezone <br/> <i className="las la-clock"></i></td>
                                        <td><h6>{this.state.timezone}</h6></td>
                                    </tr> */}
                                </tbody>
                            </table>  
                        </div>

                        <div className="row col-md-8 text-center wthr mt-2" style={{justifyContent:"center"}}>  
                            <h1 className="col-12 mb-3">5-day forecast</h1> 
                            <div className="col-sm-12 row shadow wthrinner">
                                <div className="col-sm-4">
                                    <h6>{this.state.day+1}/{this.state.month}/{this.state.year}</h6>
                                    <span className="display-4">{Math.round(this.state.day1)}&deg;C <i className={this.state.icon1}></i></span>
                                </div>
                                <div className="col-sm-8 row">
                                    <h6 className="col-sm-6"><i className="las la-tachometer-alt"></i> {this.state.pressure1}</h6>
                                    <h6 className="col-sm-6"><i className="las la-tint"></i> {this.state.humidity1}</h6>
                                    <h6 className="col-sm-6"><i className={this.state.icon1}></i> {this.state.description1}</h6>
                                    <h6 className="col-sm-6"><i className="la la-wind"></i> {this.state.wind1}</h6>
                                </div>
                            </div>

                            <div className="col-sm-12 row shadow wthrinner">
                                <div className="col-sm-4">
                                    <h6>{this.state.day+2}/{this.state.month}/{this.state.year}</h6>
                                    <span className="display-4">{Math.round(this.state.day2)}&deg;C <i className={this.state.icon2}></i></span>
                                </div>
                                <div className="col-sm-8 row">
                                    <h6 className="col-sm-6"><i className="las la-tachometer-alt"></i> {this.state.pressure2}</h6>
                                    <h6 className="col-sm-6"><i className="las la-tint"></i> {this.state.humidity2}</h6>
                                    <h6 className="col-sm-6"><i className={this.state.icon2}></i> {this.state.description2}</h6>
                                    <h6 className="col-sm-6"><i className="la la-wind"></i> {this.state.wind2}</h6>
                                </div>
                                
                            </div>

                            <div className="col-sm-12 row shadow wthrinner">
                                <div className="col-sm-4">
                                    <h6>{this.state.day+3}/{this.state.month}/{this.state.year}</h6>
                                    <span className="display-4">{Math.round(this.state.day3)}&deg;C <i className={this.state.icon3}></i></span>
                                </div>
                                <div className="col-sm-8 row">
                                    <h6 className="col-sm-6"><i className="las la-tachometer-alt"></i> {this.state.pressure3}</h6>
                                    <h6 className="col-sm-6"><i className="las la-tint"></i> {this.state.humidity3}</h6>
                                    <h6 className="col-sm-6"><i className={this.state.icon3}></i> {this.state.description3}</h6>
                                    <h6 className="col-sm-6"><i className="la la-wind"></i> {this.state.wind3}</h6>
                                </div>                           
                            </div>

                            <div className="col-sm-12 row shadow wthrinner">
                                <div className="col-sm-4">
                                    <h6>{this.state.day+4}/{this.state.month}/{this.state.year}</h6>
                                    <span className="display-4">{Math.round(this.state.day4)}&deg;C <i className={this.state.icon4}></i></span>                             
                                </div>
                                <div className="col-sm-8 row">
                                    <h6 className="col-sm-6"><i className="las la-tachometer-alt"></i> {this.state.pressure4}</h6>
                                    <h6 className="col-sm-6"><i className="las la-tint"></i> {this.state.humidity4}</h6>
                                    <h6 className="col-sm-6"><i className={this.state.icon4}></i> {this.state.description4}</h6>
                                    <h6 className="col-sm-6"><i className="la la-wind"></i> {this.state.wind4}</h6>
                                </div>
                            </div>

                            <div className="col-sm-12 row mb-2 shadow wthrinner">
                                <div className="col-sm-4">
                                    <h6>{this.state.day+5}/{this.state.month}/{this.state.year}</h6>
                                    <span className="display-4">{Math.round(this.state.day5)}&deg;C <i className={this.state.icon5}></i></span>
                                </div>
                                <div className="col-sm-8 row">
                                    <h6 className="col-sm-6"><i className="las la-tachometer-alt"></i> {this.state.pressure5}</h6>
                                    <h6 className="col-sm-6"><i className="las la-tint"></i> {this.state.humidity5}</h6>
                                    <h6 className="col-sm-6"><i className={this.state.icon5}></i> {this.state.description5}</h6>
                                    <h6 className="col-sm-6"><i className="la la-wind"></i> {this.state.wind5}</h6>
                                </div>
                            </div>
                        </div>
                    
                        
                    </div>
                        
                </div>
            )
        }
    }
}

export default Weather;