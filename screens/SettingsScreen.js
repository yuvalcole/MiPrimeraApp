import { View, Text, Button, StyleSheet, TextInput } from 'react-native';

export default function SettingsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>¡Configuración del usuario!</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu nombre"
      />
      <Button
        title="Volver"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 8,
    margin: 10,
    width: 200,
  },
});