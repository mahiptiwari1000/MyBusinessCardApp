import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import ProfilePanel from "./ProfilePanel";

const SavedCards = () => {

const [cardData,setCardData]:any = useState([]);

useEffect(() => {
  const getCardData = async () => {
    const data = require('./assets/json/CardData.json');
    setCardData(data);
  };
  getCardData();
},[])

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
            <Text style={styles.title}>Saved Business Cards :</Text>
            {cardData && cardData.map((d: any) =>
                <ProfilePanel key={d.id}  cardDetails = {d} />)}
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
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

export default SavedCards;