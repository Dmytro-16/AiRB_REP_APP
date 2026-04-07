// import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import * as Location from "expo-location";

// export default function Geoloc() {
//   const [error, setError] = useState();
//   const [isLoading, setIsLoading] = useState(true);
//   const [coords, setCoords] = useState();

//   useEffect(() => {
//     const askPermission = async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();

//       if (status === "granted") {
//         let location = await Location.getCurrentPositionAsync({});

//         const obj = {
//           latitude: location.coords.latitude,
//           longitude: location.coords.longitude,
//         };
//         setCoords(obj);
//         // console.log(obj);
//       } else {
//         setError(true);
//       }

//       setIsLoading(false);
//     };

//     askPermission();
//   }, []);

//   return isLoading ? (
//     <ActivityIndicator style={styles.indicator} size="large" color="#ff3e61" />
//   ) : error ? (
//     <Text>Autorisation refusée</Text>
//   ) : (
//     // <MapView
//     //   style={{ flex: 1 }}
//     //   initialRegion={{
//     //     latitude: coords.latitude,
//     //     longitude: coords.longitude,
//     //     latitudeDelta: 0.2,
//     //     longitudeDelta: 0.2,
//     //   }}
//     //   showsUserLocation={true}
//     // >
//     //   <Marker coordinate={coords} />
//     // </MapView>
//     <Text>
//       {coords.latitude} {coords.longitude}
//     </Text>
//   );
// }

// const styles = StyleSheet.create({
//   indicator: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
