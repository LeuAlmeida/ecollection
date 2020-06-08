import React, { useState, useEffect } from "react";
import { Feather as Icon } from "@expo/vector-icons";
import { Image, View, ImageBackground, Text, StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

interface SelectItem {
  label: string;
  value: string;
}

const Home = () => {
  const [ufs, setUfs] = useState<SelectItem[]>([]);
  const [cities, setCities] = useState<SelectItem[]>([]);

  const [selectedUf, setSelectedUf] = useState("0");
  const [selectedCity, setSelectedCity] = useState("0");

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        "http://servicodados.ibge.gov.br/api/v1/localidades/estados"
      )
      .then((response) => {
        const ufInitials = response.data.map((uf) => ({
          label: uf.sigla,
          value: uf.sigla,
          key: uf.sigla,
        }));

        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    axios
      .get<IBGECityResponse[]>(
        `http://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then((response) => {
        const citiesNames = response.data.map((uf) => ({
          label: uf.nome,
          value: uf.nome,
          key: uf.nome,
        }));

        setCities(citiesNames);
      });
  }, [selectedUf]);

  const navigation = useNavigation();

  function handleNavigateToPoints() {
    navigation.navigate("Points", { selectedUf, selectedCity });
  }

  function handleSelectedUf(value: string) {
    setSelectedUf(value);
  }

  function handleSelectedCity(value: string) {
    setSelectedCity(value);
  }

  return (
    <ImageBackground
      source={require("../../assets/home-background.png")}
      style={styles.container}
      imageStyle={{ width: 274, height: 368 }}
    >
      <View style={styles.main}>
        <Image source={require("../../assets/logo.png")} />
        <Text style={styles.title}>Your waste collection marketplace</Text>
        <Text style={styles.description}>
          We help people find collection points efficiently.
        </Text>
      </View>

      <View style={styles.footer}>
        <RNPickerSelect
          style={select}
          onValueChange={(value) => handleSelectedUf(value)}
          placeholder={{ label: "Select a state", key: "State" }}
          items={ufs}
          Icon={() => <Icon name="chevron-down" size={24} color="gray" />}
        />

        <RNPickerSelect
          style={cities.length <= 0 ? disabledSelect : select}
          onValueChange={(value) => handleSelectedCity(value)}
          placeholder={{ label: "Select a city", key: "City" }}
          items={cities}
          disabled={cities.length <= 0 ? true : false}
          Icon={() =>
            cities.length <= 0 ? null : (
              <Icon name="chevron-down" size={24} color="gray" />
            )
          }
        />
        <RectButton style={styles.button} onPress={handleNavigateToPoints}>
          <View style={styles.buttonIcon}>
            <Text>
              <Icon name="arrow-right" color="#FFF" size={24} />
            </Text>
          </View>
          <Text style={styles.buttonText}>Entrar</Text>
        </RectButton>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    color: "#322153",
    fontSize: 32,
    fontFamily: "Ubuntu_700Bold",
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: "#6C6C80",
    fontSize: 16,
    marginTop: 16,
    fontFamily: "Roboto_400Regular",
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  button: {
    backgroundColor: "#34CB79",
    height: 60,
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    color: "#FFF",
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
  },
});

const select = {
  viewContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  inputAndroid: {
    fontSize: 18,
    height: 60,
    color: "#333",
  },
};

const disabledSelect = {
  viewContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  inputAndroid: {
    fontSize: 18,
    height: 60,
    color: "#333",
  },
};

export default Home;
