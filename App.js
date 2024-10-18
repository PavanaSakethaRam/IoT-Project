import React from "react";
import { SafeAreaView, StyleSheet, ScrollView, Text } from "react-native";
import AccelerometerManager from "./components/accelerometer";
import GyroscopeManager from "./components/gyroscope";
import MagnetometerManager from "./components/magnetometer";
import GeolocationManager from "./components/geolocation";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.innerContainer} contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>IoT Project</Text>
        <AccelerometerManager />
        <GyroscopeManager />
        <MagnetometerManager />
        <GeolocationManager />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  innerContainer: {
    width: "100%",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
});

