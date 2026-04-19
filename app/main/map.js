import { View, Text, StyleSheet, ActivityIndicator, Pressable } from "react-native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { router } from "expo-router";
import API_BASE_URL from "../../constants/api";

const DEFAULT_COORDS = {
  latitude: 48.8564449,
  longitude: 2.4002913,
};

export default function MapScreen() {
  const [coords, setCoords] = useState(null); // Ma position
  const [markers, setMarkers] = useState([]); // Positions des logements
  const [selectedMarker, setSelectedMarker] = useState(null);
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

      let initialCoords = { ...DEFAULT_COORDS };
      try {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        initialCoords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
      } catch {
        try {
          const last = await Location.getLastKnownPositionAsync({});
          if (last?.coords) {
            initialCoords = {
              latitude: last.coords.latitude,
              longitude: last.coords.longitude,
            };
          }
        } catch {
          // GPS / services desactives (emulateur, etc.) : carte centree sur Paris
        }
      }
      setCoords(initialCoords);

      // 3️⃣ Appel API pour récupérer logements autour
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/rooms`,
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
            price: room.price,
            reviews: room.reviews,
            ratingValue: room.ratingValue,
            description: room.description,
            picture: room.photos?.[0]?.url || "https://www.gravatar.com/avatar/?d=mp",
            hostPhoto:
              room.user?.account?.photo?.url || "https://www.gravatar.com/avatar/?d=mp",
            hostName: room.user?.account?.username || "Host",
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
      <View style={styles.screenState}>
        <ActivityIndicator style={styles.indicator} size="large" color="#ff3e61" />
        <Text style={styles.stateText}>Chargement de la carte...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.screenState}>
        <Text style={styles.errorTitle}>Impossible d'afficher la carte</Text>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation={true}
        followsUserLocation={true}
        onPress={() => setSelectedMarker(null)}
      >
        <Marker coordinate={coords} pinColor="green" title="Vous etes ici" />

        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            pinColor="#ff3e61"
            onPress={() => setSelectedMarker(marker)}
          />
        ))}
      </MapView>

      <View style={styles.overlayCard}>
        <Text style={styles.overlayTitle}>Explorer</Text>
        <Text style={styles.overlaySubtitle}>{markers.length} logements autour</Text>
      </View>

      {!!selectedMarker && (
        <View style={styles.markerCard}>
          <Text numberOfLines={1} style={styles.markerCardTitle}>
            {selectedMarker.title}
          </Text>
          <Text style={styles.markerCardMeta}>
            {selectedMarker.price} EUR - {selectedMarker.ratingValue} etoiles
          </Text>
          <Pressable
            style={styles.markerCardButton}
            onPress={() =>
              router.push({
                pathname: "main/home/room",
                params: {
                  id: selectedMarker.id,
                  description: selectedMarker.description,
                  title: selectedMarker.title,
                  price: selectedMarker.price,
                  reviews: selectedMarker.reviews,
                  ratingValue: selectedMarker.ratingValue,
                  picture_id: selectedMarker.picture,
                  photoUser: selectedMarker.hostPhoto,
                  name: selectedMarker.hostName,
                },
              })
            }
          >
            <Text style={styles.markerCardButtonText}>Voir les details</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff5f8",
  },
  map: {
    flex: 1,
  },
  screenState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff5f8",
    paddingHorizontal: 20,
  },
  indicator: {
    marginBottom: 12,
  },
  stateText: {
    color: "#666",
    fontSize: 14,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ff3e61",
    marginBottom: 6,
    textAlign: "center",
  },
  errorText: {
    color: "#666",
    fontSize: 14,
    textAlign: "center",
  },
  overlayCard: {
    position: "absolute",
    top: 16,
    left: 16,
    right: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#ffe4eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  overlayTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2b2b2b",
  },
  overlaySubtitle: {
    marginTop: 2,
    fontSize: 13,
    color: "#666",
  },
  markerCard: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#ffe4eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,
  },
  markerCardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2b2b2b",
    marginBottom: 4,
  },
  markerCardMeta: {
    color: "#666",
    fontSize: 13,
    marginBottom: 10,
  },
  markerCardButton: {
    backgroundColor: "#ff3e61",
    borderRadius: 999,
    alignItems: "center",
    paddingVertical: 10,
  },
  markerCardButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
});
