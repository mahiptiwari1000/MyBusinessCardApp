import {
  View,
  Text,
  Platform,
  StyleSheet,
  ScrollView,
  PermissionsAndroid,
} from 'react-native';
import {BleManager} from 'react-native-ble-plx';
import React, {useEffect, useState} from 'react';
import ProfilePanel from '../components/ProfilePanel';

const manager = new BleManager();

const requestBluetoothPermission = async () => {
  console.log('Requesting Bluetooth permission');

  if (Platform.OS === 'ios') {
    return true;
  }
  if (
    Platform.OS === 'android' &&
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  ) {
    const apiLevel = parseInt(Platform.Version.toString(), 10);

    if (apiLevel < 31) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    if (
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN &&
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
    ) {
      const result = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);

      return (
        result['android.permission.BLUETOOTH_CONNECT'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        result['android.permission.BLUETOOTH_SCAN'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        result['android.permission.ACCESS_FINE_LOCATION'] ===
          PermissionsAndroid.RESULTS.GRANTED
      );
    }
  }

  console.log('Permission have not been granted');

  return false;
};

const scanAndConnect = async () => {
  console.log('Scanning and connecting to BLE device');

  const result = await requestBluetoothPermission();
  console.log('Permission granted?', result);

  try {
    console.log('Inside try catch');
    manager.startDeviceScan(null, null, (error: any, device: any): any => {
      console.log('Scanning...');

      if (error) {
        // Handle error (scanning will be stopped automatically)
        console.log(error);
        return;
      }

      // Check if it is a device you are looking for based on advertisement data
      // or other criteria.
      if (
        device?.name === 'TI BLE Sensor Tag' ||
        device?.name === 'SensorTag'
      ) {
        console.log('Found a device', device);

        // Stop scanning as it's not necessary if you are scanning for one device.
        manager.stopDeviceScan();

        // Proceed with connection.
        device
          .connect()
          .then((device: any) => {
            return device.discoverAllServicesAndCharacteristics();
          })
          .catch((error: any) => {
            // Handle errors
            console.log(error);
          });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const Dashboard = () => {
  const [cardData, setCardData]: any = useState([]);

  useEffect(() => {
    const getCardData = async () => {
      const data = require('../assets/json/CardData.json');
      setCardData(data);
    };
    getCardData();
  }, []);

  useEffect(() => {
    console.log('Inside BLE useEffect');

    const subscription = manager.onStateChange(state => {
      console.log('Bluetooth state:', state);

      if (state === 'PoweredOn') {
        console.log('Bluetooth is powered on. Starting scan...');
        scanAndConnect();
        subscription.remove();
      }
    }, true);

    return () => {
      console.log('Removing BLE state change subscription');
      subscription.remove();
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.title}>Available Business Cards :</Text>
        {cardData &&
          cardData.map((d: any) => <ProfilePanel key={d.id} cardDetails={d} />)}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  avatar: {
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  scrollViewContent: {
    alignItems: 'center',
  },
});

export default Dashboard;
