// import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "expo-router";
// import Constant from "expo-constants";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator } from "react-native";
// import { AuthContext } from "../../context/AuthContext";

export default function RoomPage() {
  const router = useRouter();
  const {
    id,
    description,
    title,
    price,
    reviews,
    ratingValue,
    picture_id,
    photoUser,
    name,
  } = useLocalSearchParams();

  return (
    <View>
      <Text>{title} </Text>
      <Text>{description} </Text>
      <Text>{price} € </Text>
      <Text>{name}</Text>
      <Image
        style={{ width: 50, height: 50, borderRadius: 25 }}
        source={{ uri: photoUser }}
      />
      <Image style={{ width: 200, height: 200 }} source={{ uri: picture_id }} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});
