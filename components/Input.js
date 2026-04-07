import { TextInput, StyleSheet } from "react-native";

export default function Input({
  value,
  onChangeText,
  placeholder,
  multiline,
  secureTrue,
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
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    paddingVertical: 3,
    paddingHorizontal: 3,
    height: 30,
  },
  multiline: {
    borderWidth: 1,
    height: 100,
  },
});
