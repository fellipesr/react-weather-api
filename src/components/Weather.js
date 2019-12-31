import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, Divider } from 'react-native-elements';


const Weather = ({ updateWeather, temperature, pressure, humidity, wind, city, country, description, icon, feels_like }) => {
    if (city != null) {

        let time;

        var date = new Date();

        var hours = date.getHours();

        var minutes = "0" + date.getMinutes();

        time = hours + ':' + minutes.substr(-2);

        return (
            <View style={styles.container}>
                <Text style={styles.city}>{city}, {country}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.temperature}>{temperature}&#8451;</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.feels_like}>Sensação {feels_like}&#8451; </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 30, }}>
                    <Image style={{ width: 70, height: 70 }} source={{ uri: "https://openweathermap.org/img/w/" + icon + ".png" }} />
                    <Text style={styles.description}>{description}</Text>
                </View>
                <Divider style={{ backgroundColor: '#dfe6e9', marginVertical: 20, marginBottom: 30, }} />
                <View style={{ flexDirection: 'row', justifyContent: "flex-start" }}>
                    <Text style={styles.notes}>Horário: </Text>
                    <Text style={styles.notes}>{time}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <Text style={styles.notes}>Umidade: {humidity}%</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <Text style={styles.notes}>Vento: {wind} m/s</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <Text style={styles.notes}>Pressão: {pressure}hpa</Text>
                </View>
                <TouchableOpacity
                    TouchableOpacity style={styles.updateButton}
                    onPress={updateWeather}
                ><Text style={styles.updateButtonText}>Atualizar Clima</Text>
                </TouchableOpacity>
            </View>
        );
    } else {
        return (
            <View>
                <Text>Algo deu errado :(</Text>
            </View>
        )
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(56, 172, 236, 1)",
        padding: 20,
    },
    temperature: {
        fontSize: 34,
        color: '#fff',
        marginTop: 30,
    },
    feels_like: {
        fontSize: 12,
        color: '#fff',
    },
    city: {
        fontSize: 38,
        color: '#fff',
        textAlign: 'center',
        marginTop: 30,
    },
    notes: {
        fontSize: 20,
        color: '#fff',
    },
    description: {
        fontSize: 22,
        color: '#fff',
        textTransform: 'capitalize'
    },
    updateButton: {
        height: 42,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#fff",
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40
    },
    updateButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold"
    }
});

export default Weather;