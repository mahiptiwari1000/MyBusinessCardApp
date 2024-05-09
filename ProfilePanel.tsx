import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from './MyCard';

const ProfilePanel = ({ cardData }:any) => {
    
  return (
    <View style={styles.container}>
      <Card
        cardData={cardData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
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
});

export default ProfilePanel;