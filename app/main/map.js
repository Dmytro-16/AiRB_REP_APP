import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { router } from "expo-router";

export default function MapScreen() {
  const [coords, setCoords] = useState(null); // Ma position
  const [markers, setMarkers] = useState([]); // Positions des logements
  const [error, setError] = useState(null); // Erreur
  const [isLoading, setIsLoading] = useState(true); // Chargement

  useEffect(() => {
    const startApp = async () => {
      // 1️⃣ Demande permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission refusée");
        setIsLoading(false);
        return;
      }

      // 2️⃣ Récupère position initiale
      let location = await Location.getCurrentPositionAsync({});
      const initialCoords = {
        // latitude: location.coords.latitude,
        // longitude: location.coords.longitude,
        latitude: 48.8564449,
        longitude: 2.4002913,
      };
      setCoords(initialCoords);

      // 3️⃣ Appel API pour récupérer logements autour
      try {
        const { data } = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms",
          {
            params: {
              latitude: initialCoords.latitude,
              longitude: initialCoords.longitude,
            },
          },
        );
        console.log(data);
        // 4️⃣ Formatage des markers
        const formattedMarkers = data.map((room) => {
          const [lng, lat] = room.location;
          return {
            id: room._id,
            latitude: Number(lat),
            longitude: Number(lng),
            title: room.title,
          };
        });

        setMarkers(formattedMarkers);
      } catch (err) {
        console.log("Erreur API:", err);
      }

      setIsLoading(false);
    };

    startApp();
  }, []);

  if (isLoading || !coords) {
    return (
      <ActivityIndicator
        style={styles.indicator}
        size="large"
        color="#ff3e61"
      />
    );
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <MapView
      style={{ flex: 1 }}
      region={{
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
      showsUserLocation={true} // Affiche ma position
      followsUserLocation={true} // La carte suit le mouvement de la position
    >
      {/* Marker de ta position */}
      <Marker coordinate={coords} pinColor="green" title="Vous êtes ici" />

      {/* Markers des logements */}
      {markers.map((marker) => (
        // console.log(marker),
        <Marker
          key={marker.id}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.title}
          pinColor="red"
          onPress={() => router.push(`/room/${marker.id}`)}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
