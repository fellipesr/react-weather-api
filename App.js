import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
navigator.geolocation = require('@react-native-community/geolocation');

import { API_KEY } from './src/utils/WeatherAPIKey';

import Weather from './src/components/Weather';

import "./src/config/StatusBarConfig";

export default class App extends React.Component {
  state = {
    isLoading: true,
    temperature: undefined,
    feels_like: undefined,
    pressure: undefined,
    humidity: undefined,
    wind: undefined,
    city: "",
    country: "",
    description: "",
    icon: undefined,
    error: null
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: 'Erro ao obter condições meteorológicas'
        });
      }
    );
  }

  updateWeather = () => {
    this.componentDidMount();
  };

  fetchWeather(lat, lon) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&lang=pt&units=metric`
    )
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({
          temperature: json.main.temp,
          feels_like: json.main.feels_like,
          humidity: json.main.humidity,
          pressure: json.main.pressure,
          wind: json.wind.speed,
          city: json.name,
          country: json.sys.country,
          description: json.weather[0].description,
          icon: json.weather[0].icon,
          isLoading: false
        });
      });
  }

  render() {
    const { isLoading, temperature, pressure, feels_like, city, description, icon, humidity, wind, country } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.horizontal}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : (
            <Weather updateWeather={this.updateWeather} temperature={temperature} pressure={pressure} feels_like={feels_like} humidity={humidity} wind={wind} city={city} country={country} description={description} icon={icon} />
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(56, 172, 236, 1)',
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});