import React, { useState, useEffect } from 'react';
import { Text, Switch, View } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import styles from '../styles';

const GyroscopeManager = () => {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [gyro, setGyro] = useState(false);

  useEffect(() => {
    let subscription;

    const startGyroUpdates = () => {
      Gyroscope.setUpdateInterval(1000);
      subscription = Gyroscope.addListener((gyroscopeData) => {
        setData({
          x: gyroscopeData.x.toFixed(5),
          y: gyroscopeData.y.toFixed(5),
          z: gyroscopeData.z.toFixed(5),
        });
      });
    };

    if (gyro) {
      startGyroUpdates();
    }

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [gyro]);

  const toggleGyro = (value) => {
    setGyro(value);
  };

  return (
    <View style={styles.widget}>
      <Text style={styles.welcome}>Gyroscope</Text>
      <Text style={styles.dataText}>x: {data.x}</Text>
      <Text style={styles.dataText}>y: {data.y}</Text>
      <Text style={styles.dataText}>z: {data.z}</Text>
      <Switch
        style={styles.switch}
        onValueChange={toggleGyro}
        value={gyro}
      />
      <Text style={styles.switchLabel}>
        {gyro ? "Gyroscope Active" : "Gyroscope Inactive"}
      </Text>
    </View>
  );
};

export default GyroscopeManager;
