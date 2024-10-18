import React, { useState, useEffect } from 'react';
import { Text, Switch, View } from 'react-native';
import { Magnetometer } from 'expo-sensors';
import styles from '../styles';

const MagnetometerManager = ({ mqttClient, deviceId }) => {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [magnetometerActive, setMagnetometerActive] = useState(false);

  useEffect(() => {
    let subscription;

    const startMagnetometerUpdates = () => {
      Magnetometer.setUpdateInterval(1000);
      subscription = Magnetometer.addListener((magnetometerData) => {
        if (magnetometerData) {
          if (magnetometerActive && mqttClient && deviceId) {
            const mqttData = JSON.stringify({ meaning: "magnetometer", value: magnetometerData });
            mqttClient.publish(`/v1/${deviceId}/data`, mqttData, 0, false);
          }
          setData({
            x: magnetometerData.x.toFixed(5),
            y: magnetometerData.y.toFixed(5),
            z: magnetometerData.z.toFixed(5),
          });
        } else {
          console.warn("Magnetometer data is not available");
        }
      });
    };

    if (magnetometerActive) {
      startMagnetometerUpdates();
    }

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [magnetometerActive, mqttClient, deviceId]);

  const toggleMagnetometer = (value) => {
    setMagnetometerActive(value);
  };

  return (
    <View style={styles.widget}>
      <Text style={styles.welcome}>Magnetometer</Text>
      <Text style={styles.dataText}>x: {data.x}</Text>
      <Text style={styles.dataText}>y: {data.y}</Text>
      <Text style={styles.dataText}>z: {data.z}</Text>
      <Switch
        style={styles.switch}
        onValueChange={toggleMagnetometer}
        value={magnetometerActive}
      />
      <Text style={styles.switchLabel}>
        {magnetometerActive ? "Magnetometer Active" : "Magnetometer Inactive"}
      </Text>
    </View>
  );
};

export default MagnetometerManager;
