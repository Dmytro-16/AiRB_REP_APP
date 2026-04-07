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
import { ActivityIndicator } from "react-native";
// import { AuthContext } from "../../context/AuthContext";

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms",
        );

        // console.log(response.data);
        setRooms(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("catch/fetchRooms", error);
        setIsLoading(false);
      }
    };
    fetchRooms();
  }, []);

  return isLoading ? (
    <ActivityIndicator style={styles.indicator} size="large" color="#ff3e61" />
  ) : (
    <View>
      <Text style={styles.title}>Rooms</Text>

      <FlatList
        style={styles.list}
        data={rooms}
        keyExtractor={({ _id }) => _id.toString()}
        renderItem={({ item }) => {
          // console.log(item);
          return (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "main/home/room",
                  params: {
                    id: item._id,
                    description: item.description,
                    title: item.title,
                    price: item.price,
                    reviews: item.reviews,
                    ratingValue: item.ratingValue,
                    photoUser: item.user.account.photo.url,
                    picture_id: item.photos[0].url,
                    name: item.user.account.username,
                  },
                })
              }
            >
              <View style={styles.card}>
                <Text>{item.description}</Text>
                <Text>{item.title}</Text>
                <Text>{item.price}</Text>
                <Text>{item.reviews} Reviews</Text>
                <Text>{item.ratingValue} Stars</Text>
                <Image
                  style={{ width: 50, height: 50, borderRadius: 25 }}
                  source={{
                    uri:
                      item.user?.account?.photo?.url ||
                      "https://www.gravatar.com/avatar/?d=mp", // image par défaut
                  }}
                />
                <Text>{item.user.account.username}</Text>

                <Image
                  style={{ width: 200, height: 200 }}
                  source={{ uri: item.photos[0].url }}
                />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff5f8", // fond doux rose clair
    alignItems: "center",
    paddingTop: 50,
  },

  list: {
    width: "100%",
    borderColor: "#ff3e61",
    borderWidth: 1,
    backgroundColor: "#8a7279",
  },

  indicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ff3e61",
    marginBottom: 30,
    textAlign: "center",
  },
  card: {
    width: "90%",
    alignSelf: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 15,
    // ombre légère pour effet carte
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5, // pour Android
  },

  cardText: {
    fontSize: 18,
    color: "#333",
  },
});
