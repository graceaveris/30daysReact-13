import React, { Component } from 'react';
import logo from './friedhead.svg';
import Titles from './Titles/Titles'
import Form from './Form/Form'
import Weather from './Weather/Weather'
import City from './City/Cities'
import './App.css';


class App extends Component {

//We start off with empty variables, we need to fetch the data
  state = {

  temperature: undefined,
  city: undefined,
  humidity: undefined,
  description: undefined,

  dataLoaded: false,

  urls: [`http://api.openweathermap.org/data/2.5/weather?q=auckland,nz&units=metric&appid=00bfc99b6c27236554f7ce710824818f`, `http://api.openweathermap.org/data/2.5/weather?q=wellington,nz&units=metric&appid=00bfc99b6c27236554f7ce710824818f`, `http://api.openweathermap.org/data/2.5/weather?q=christchurch,nz&units=metric&appid=00bfc99b6c27236554f7ce710824818f`]

  }

// ------  HANDLERS ------ //

getWeather = async (event) => {
  event.preventDefault();
  const Api_Key = '00bfc99b6c27236554f7ce710824818f'

//We collect the city and country input bu the user, and use them in the fetch
  const city = event.target.elements.city.value;
  const country = 'NZ'
  const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${Api_Key}`);

//we convert the reponse into a json file  
  const response = await api_call.json();
  console.log(response);

//we can then access elements from the json object and set them
  this.setState({
    temperature: response.main.temp,
    country: response.sys.country,
    humidity: response.main.humidity,
    description: response.weather[0].description,
    city: response.name,
  })
}


// ------ Reworking the new fetch ----- //

fetchStartWeather = async () => {

//grab the URL's from state  
  const urls = this.state.urls

//This holds our master array      
      let auckland = {}
      let wellington = {}
      let christchurch = {}

//Loop through them and fetch for each
  for (var i = 0; i < urls.length; i++ ) {
      const api_call = await fetch(urls[i]); 
      const response = await api_call.json();

// NEED TO REFRACTOR, NOT IDEAL!!
      if (i === 0) {
        auckland.name = response.name
        auckland.temp = response.main.temp

      } else if (i === 1) {
        wellington.name = response.name
        wellington.temp = response.main.temp

      } else if (i === 2) {
        christchurch.name = response.name
        christchurch.temp = response.main.temp
    }
  }
  this.setState({ auckland: auckland, christchurch: christchurch, wellington: wellington })
  this.setState({ dataLoaded: true })
}

// ------ API CALL ------ //

  componentDidMount() {
    this.fetchStartWeather()
  }

// ------  DEFINING AND RENDERING  ------ //

render() {

//This checks if there is an imput and only displays if there is data to show
const check = this.state.temperature;
let weather;

if (check !== undefined) {
  weather = (
      <div>
        <Weather 
        temperature={this.state.temperature}
        city={this.state.city}
        country={this.state.country}
        humidity={this.state.humidity}
        description={this.state.description}
        error={this.state.error}/>
      </div>) 
}


const loaded = this.state.dataLoaded
let startWeather;

if (loaded === true) {
 startWeather = (
       <div>
        <City
          name={this.state.auckland.name}
          temp={this.state.auckland.temp}/>
        <City
          name={this.state.wellington.name}
          temp={this.state.wellington.temp}/>    
        <City
          name={this.state.christchurch.name}
          temp={this.state.christchurch.temp}/>

      </div> )
  } else {
  startWeather = <p>Loading</p>
}



// ------  THE RETURN BLOCK  ------ //

return (
  <div className="App">


{/* HEADER */}

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>30 days of React</h1>
          <h2>Day Thirteen / New Zealand Weather</h2>
        </header>

{/* COMPONENTS */}

        <Titles />

        {startWeather}
        
        <h2>Select Another City</h2>
       
        <Form 
        loadWeather={this.getWeather}/>

        {weather}

   </div>
  );
 }
}

export default App;

