import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import axios from "axios";
import { ActivityIndicator } from "react-native";
import API_BASE_URL from "../../../constants/api";

const DEFAULT_AVATAR = "https://www.gravatar.com/avatar/?d=mp";

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/rooms`);
        setRooms(Array.isArray(data) ? data : []);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage("Impossible de charger les logements");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleOpenRoom = (room) => {
    const photoUser = room.user?.account?.photo?.url || DEFAULT_AVATAR;
    const picture = room.photos?.[0]?.url || DEFAULT_AVATAR;

    router.push({
      pathname: "main/home/room",
      params: {
        id: room._id,
        description: room.description || "",
        title: room.title || "Room",
        price: room.price || 0,
        reviews: room.reviews || 0,
        ratingValue: room.ratingValue || 0,
        photoUser,
        picture_id: picture,
        name: room.user?.account?.username || "Host",
      },
    });
  };

  const renderRoom = ({ item }) => {
    const roomImage = item.photos?.[0]?.url || DEFAULT_AVATAR;
    const hostPhoto = item.user?.account?.photo?.url || DEFAULT_AVATAR;
    const hostName = item.user?.account?.username || "Host";

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.card}
        onPress={() => handleOpenRoom(item)}
      >
        <Image source={{ uri: roomImage }} style={styles.roomImage} />

        <View style={styles.cardBody}>
          <View style={styles.titleRow}>
            <Text style={styles.roomTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.price}>{item.price} EUR</Text>
          </View>

          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>

          <View style={styles.metaRow}>
            <Text style={styles.metaText}>Rating: {item.ratingValue}</Text>
            <Text style={styles.metaText}>Reviews: {item.reviews}</Text>
          </View>

          <View style={styles.hostRow}>
            <Image source={{ uri: hostPhoto }} style={styles.hostAvatar} />
            <Text style={styles.hostName} numberOfLines={1}>
              {hostName}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rooms</Text>

      {isLoading ? (
        <ActivityIndicator style={styles.indicator} size="large" color="#ff3e61" />
      ) : (
        <FlatList
          data={rooms}
          renderItem={renderRoom}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              {errorMessage || "Aucun logement disponible pour le moment"}
            </Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff5f8",
    paddingTop: 24,
  },
  indicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ff3e61",
    marginTop: 10,
    marginBottom: 16,
    textAlign: "center",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 14,
  },
  card: {
    borderRadius: 16,
    backgroundColor: "#fff",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  roomImage: {
    width: "100%",
    height: 190,
  },
  cardBody: {
    padding: 12,
    gap: 8,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  roomTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    color: "#2b2b2b",
  },
  price: {
    fontSize: 15,
    fontWeight: "700",
    color: "#ff3e61",
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  metaRow: {
    flexDirection: "row",
    gap: 14,
  },
  metaText: {
    fontSize: 13,
    color: "#555",
  },
  hostRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 4,
  },
  hostAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  hostName: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
    marginTop: 24,
    fontSize: 14,
  },
});
