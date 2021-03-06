import React from "react";
import Info from "../info";
import Form from "../form";
import Weather from "../weather";

const API_KEY = "b8700f10b203b79cff3a2237de1ed4f2";



class App extends React.Component {

  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    sunrise: undefined,
    sunset: undefined,
    error: undefined
  }

  gettingWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;

    if (city) {
      const api_url = await 
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},&appid=${API_KEY}&units=metric`);
      const data = await api_url.json();
      console.log(data);

      this.setState(
        {
          temp: data.main.temp,
          city: data.name,
          country: data.sys.country,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          error: undefined
        }
      )
    } else {
      this.setState(
        {
          temp: undefined,
          city: undefined,
          country: undefined,
          sunrise: undefined,
          sunset: undefined,
          error: "Введите название города"
        }
      )
    };
  }

  render() {
    return (
      <div className="wrapper">
        <Info />
        <Form weatherMethod={this.gettingWeather}/>
        <Weather 
          temp={this.state.temp}
          city={this.state.city}
          country={this.state.country}
          sunrise={this.state.sunrise}
          sunset={this.state.sunset}
          error={this.state.error}
        />
      </div>
    );
  }
}

export default App;
