import React, { useState, useEffect } from 'react';
import { Text, Switch, View } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import styles from '../styles';

const GyroscopeManager = ({ mqttClient, deviceId }) => {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [gyroActive, setGyroActive] = useState(false);

  useEffect(() => {
    let subscription;

    const startGyroUpdates = () => {
      Gyroscope.setUpdateInterval(1000);
      subscription = Gyroscope.addListener((gyroscopeData) => {
        // console.log('Raw Gyroscope Data:', gyroscopeData);

        if (gyroActive && mqttClient && deviceId) {
          const mqttData = JSON.stringify({ meaning: "gyroscope", value: gyroscopeData });
          mqttClient.publish(`/v1/${deviceId}/data`, mqttData, 0, false);
        }

        setData({
          x: gyroscopeData.x.toFixed(5),
          y: gyroscopeData.y.toFixed(5),
          z: gyroscopeData.z.toFixed(5),
        });
      });
    };

    if (gyroActive) {
      startGyroUpdates();
    }

    return () => {
      if (subscription) {
        subscription.remove();
        console.log("Gyroscope subscription removed");
      }
    };
  }, [gyroActive, mqttClient, deviceId]);

  const toggleGyro = (value) => {
    console.log('Toggling Gyroscope:', value);
    setGyroActive(value);
  };

  return (
    <View style={styles.widget}>
      <Text style={styles.welcome}>Accelorometer</Text>
      <Text style={styles.dataText}>x: {data.x}</Text>
      <Text style={styles.dataText}>y: {data.y}</Text>
      <Text style={styles.dataText}>z: {data.z}</Text>
      <Switch
        style={styles.switch}
        onValueChange={toggleGyro}
        value={gyroActive}
      />
      <Text style={styles.switchLabel}>
        {gyroActive ? "Gyroscope Active" : "Gyroscope Inactive"}
      </Text>
    </View>
  );
};

export default GyroscopeManager;
