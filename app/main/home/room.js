import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function RoomPage() {
  const {
    description,
    title,
    price,
    reviews,
    ratingValue,
    picture_id,
    photoUser,
    name,
  } = useLocalSearchParams();

  const displayTitle = title || "Room";
  const displayDescription =
    description || "Aucune description disponible pour ce logement.";
  const displayPrice = price ? `${price} EUR` : "-";
  const displayReviews = reviews || "0";
  const displayRating = ratingValue || "0";
  const displayName = name || "Host";
  const displayRoomImage = picture_id || "https://www.gravatar.com/avatar/?d=mp";
  const displayHostPhoto = photoUser || "https://www.gravatar.com/avatar/?d=mp";

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Image source={{ uri: displayRoomImage }} style={styles.heroImage} />

      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{displayTitle}</Text>
          <Text style={styles.price}>{displayPrice}</Text>
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.metaText}>Rating: {displayRating}</Text>
          <Text style={styles.metaText}>Reviews: {displayReviews}</Text>
        </View>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{displayDescription}</Text>

        <View style={styles.hostCard}>
          <Image source={{ uri: displayHostPhoto }} style={styles.hostAvatar} />
          <View style={styles.hostInfo}>
            <Text style={styles.hostLabel}>Hosted by</Text>
            <Text style={styles.hostName}>{displayName}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff5f8",
  },
  content: {
    paddingBottom: 24,
  },
  heroImage: {
    width: "100%",
    height: 250,
    backgroundColor: "#eee",
  },
  card: {
    marginHorizontal: 16,
    marginTop: -20,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ffe4eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    gap: 12,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 10,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: "700",
    color: "#2b2b2b",
    marginTop: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ff3e61",
  },
  metaRow: {
    flexDirection: "row",
    gap: 16,
  },
  metaText: {
    fontSize: 14,
    color: "#555",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2b2b2b",
  },
  description: {
    fontSize: 14,
    color: "#555",
    lineHeight: 21,
  },
  hostCard: {
    marginTop: 2,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#fff5f8",
    borderRadius: 14,
    padding: 10,
  },
  hostAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#ddd",
  },
  hostInfo: {
    flex: 1,
  },
  hostLabel: {
    fontSize: 12,
    color: "#777",
    marginBottom: 2,
  },
  hostName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2b2b2b",
  },
});
