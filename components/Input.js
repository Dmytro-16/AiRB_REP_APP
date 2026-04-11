import { TextInput, StyleSheet } from "react-native";

export default function Input({
  value,
  onChangeText,
  placeholder,
  multiline,
  secureTrue,
  keyboardType,
  autoCapitalize,
}) {
  return (
    // Composant réutilisable pour tous les champs
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      style={multiline ? [styles.input, styles.multiline] : styles.input}
      multiline={multiline}
      secureTextEntry={secureTrue}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.2)",
    paddingVertical: 3,
    paddingHorizontal: 3,
    height: 30,
  },
  multiline: {
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.2)",
    height: 100,
  },
});
