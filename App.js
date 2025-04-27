
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

const products = [
  { id: 1, name: 'Cesta de Orgânicos', description: 'Frutas e vegetais orgânicos frescos.', price: 50.00 },
  { id: 2, name: 'Arroz Sustentável', description: 'Arroz produzido com práticas agroecológicas.', price: 20.00 },
  { id: 3, name: 'Feijão Orgânico', description: 'Feijão livre de agrotóxicos.', price: 15.00 },
];

function ProductCard({ product, onPress }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
      <Button title="Ver detalhes" onPress={onPress} />
    </View>
  );
}

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fome Zero App</Text>
      <Text style={styles.subtitle}>Alimentando Esperança, Cultivando o Futuro</Text>
      <Button title="Começar" onPress={() => navigation.navigate('Purpose')} />
    </View>
  );
}

function PurposeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nosso Propósito</Text>
      <Text style={styles.text}>
        Este app conecta pequenos agricultores a consumidores e promove doações para combater a fome.
      </Text>
      <Button title="Ver Produtos" onPress={() => navigation.navigate('Products')} />
    </View>
  );
}

function ProductListScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
          />
        )}
      />
      <View style={{ margin: 10 }}>
        <Button title="Doar Alimentos" onPress={() => navigation.navigate('Donation')} />
      </View>
    </View>
  );
}

function ProductDetailScreen({ route }) {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.text}>{product.description}</Text>
      <Text style={styles.price}>Preço: R$ {product.price.toFixed(2)}</Text>
    </View>
  );
}

function DonationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Doação de Alimentos</Text>
      <Text style={styles.text}>
        Aqui você poderá doar alimentos para ONGs que ajudam no combate à fome.
      </Text>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Purpose" component={PurposeScreen} />
        <Stack.Screen name="Products" component={ProductListScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="Donation" component={DonationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  subtitle: { fontSize: 18, marginBottom: 40, textAlign: 'center' },
  text: { fontSize: 16, marginBottom: 20, textAlign: 'center' },
  card: { backgroundColor: '#f9f9f9', padding: 20, margin: 10, borderRadius: 8 },
  name: { fontSize: 20, fontWeight: 'bold' },
  price: { fontSize: 16, marginBottom: 10 },
});
