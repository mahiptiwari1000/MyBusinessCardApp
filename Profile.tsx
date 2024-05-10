import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
      <Avatar.Image
            size={100}
            source={require("./assets/icons/avatar3.png")}
            style={styles.avatar}
          />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>John Doe</Text>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>john.doe@example.com</Text>
        <Text style={styles.label}>Designation:</Text>
        <Text style={styles.value}>Software Engineer</Text>
        <Text style={styles.label}>Mobile Number:</Text>
        <Text style={styles.value}>+1 (123) 456-7890</Text>
      </View>
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  infoContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 15,
  },
  logoutButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;
