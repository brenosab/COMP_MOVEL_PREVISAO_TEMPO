import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from "react";
import data from './data.json';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

type Weather = {
  state: string;
  city: string;
  date: string;
  temperature: string;
  daily_summary: string;
  wind: string;
  humidity: string;
  visibility: string;
};

enum WeatherType {
  Ensolarado = "Ensolarado",
  Nublado = "Nublado",
  Chuvoso = "Chuvoso",
};

export default function App() {
  const [form, setForm] = useState<Weather>();
  const [weatherType, setWeatherType] = useState<WeatherType>();

  useEffect(() => {
    const max = data.length;
    const randomNumber = getRandomNumber(max);
    const _form = data[randomNumber];
    const weatherType = getWeatherType(_form.daily_summary.toLowerCase());
    setForm(_form);
    setWeatherType(weatherType);
  }, []);

  const isEnsolarado = (text: string) => (text.includes('ensolarado') || text.includes('sol') || text.includes('quente'));
  const isNublado = (text: string) => (text.includes('nublado') || text.includes('encoberto') || text.includes('nuvens'));
  const isChuvoso = (text: string) => (text.includes('chuvoso') || text.includes('chuva'));

  const getWeatherType = (text: string) => {
    if (isEnsolarado(text)) {
      return WeatherType.Ensolarado;
    }
    if (isNublado(text)) {
      return WeatherType.Nublado;
    }
    if (isChuvoso(text)) {
      return WeatherType.Chuvoso;
    }
  }

  const getRandomNumber = (max: number) => Math.floor(Math.random() * max);

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.row, { flex: 1 }]}>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
          {form?.city} - {form?.state}
        </Text>
      </View>
      <View style={[styles.row, styles.boxDate, { flex: 0.6 }]}>
        <Text style={[styles.text, { color: 'white' }]}>
          {form?.date}
        </Text>
      </View>
      <View style={[styles.row, { flex: 1 }]}>
        <Text style={styles.text}>
          {weatherType}
        </Text>
      </View>
      <View style={[styles.row, { flex: 2 }]}>
        <Text style={{ fontSize: 144, fontWeight: '700' }}>
          {form?.temperature}
        </Text>
      </View>
      <View style={[styles.rowStart]}>
        <Text style={styles.text}>
          Resumo diário
        </Text>
      </View>
      <View style={[styles.rowStart]}>
        <Text style={styles.text}>
          {form?.daily_summary}
        </Text>
      </View>
      <View style={styles.boxWidget}>
        <View style={styles.column}>
          <View style={styles.row}>
            <FontAwesome5 name="wind" size={48} color="#F9F93B" />
          </View>
          <View style={styles.row}>
            <Text style={[styles.text, { color: '#F9F93B' }]}>
              {form?.wind}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={{ color: '#F9F93B', fontSize: 12 }}>
              vento
            </Text>
          </View>
        </View>
        <View style={styles.column}>
          <View style={styles.row}>
            <MaterialIcons name="waves" size={48} color="#F9F93B" />
          </View>
          <View style={styles.row}>
            <Text style={[styles.text, { color: '#F9F93B' }]}>
              {form?.humidity}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={{ color: '#F9F93B', fontSize: 12 }}>
              humidade
            </Text>
          </View>
        </View>
        <View style={styles.column}>
          <View style={styles.row}>
            <MaterialIcons name="visibility" size={48} color="#F9F93B" />
          </View>
          <View style={styles.row}>
            <Text style={[styles.text, { color: '#F9F93B' }]}>
              {form?.visibility}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={{ color: '#F9F93B', fontSize: 12 }}>
              visibilidade
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F93B",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center'
  },
  rowStart: {
    display: "flex",
    flex: 0.5,
    flexDirection: "row",
    paddingLeft: 30,
    alignItems: 'center',
  },
  column: {
    display: "flex",
    flex: 1,
    padding: 0,
    flexDirection: "column",
    justifyContent: 'center'
  },
  text: {
    fontSize: 16,
    color: "black",
    fontWeight: '700'
  },
  boxDate: {
    borderWidth: 1,
    paddingLeft: 25,
    paddingRight: 25,
    marginLeft: '15%',
    marginRight: '15%',
    borderRadius: 40,
    backgroundColor: '#030006'
  },
  boxWidget: {
    display: "flex",
    flex: 1.3,
    flexDirection: "row",
    borderWidth: 1,
    margin: '7%',
    borderRadius: 10,
    backgroundColor: '#010001'
  },
});
