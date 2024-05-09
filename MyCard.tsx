import React, { useState } from 'react';
import { View, StyleSheet, Modal, Button } from 'react-native';
import { Card, Title, Avatar, Caption, IconButton } from 'react-native-paper';

const MyCard = ({ cardData }: any) => {

  const [visible, setVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleCardPress = () => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 100);
    showDialog();
  };

//   const printToFile = async () => {
//     const html = `
//     <html>
//     <head>
//       <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
//       <style>
//         body {
//           text-align: center;
//         }
    
//         .card {
//           width: 80%;
//           margin: 0 auto;
//           border: 1px solid #ccc;
//           border-radius: 8px;
//           padding: 20px;
//           margin-bottom: 20px;
//           box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//         }
    
//         .avatar {
//           width: 100px;
//           height: 100px;
//           border-radius: 50px;
//           margin-bottom: 20px;
//         }
    
//         .name {
//           font-size: 24px;
//           font-family: 'Helvetica Neue';
//           font-weight: bold;
//           margin-bottom: 10px;
//         }
    
//         .email {
//           font-size: 20px;
//           font-family: 'Helvetica Neue';
//           font-weight: normal;
//           color: #666;
//           margin-bottom: 20px;
//         }

//         .designation {
//           font-size: 20px;
//           font-family: 'Helvetica Neue';
//           font-weight: normal;
//           color: #666;
//           margin-bottom: 30px;
//         }

//         .phone {
//           font-size: 20px;
//           font-family: 'Helvetica Neue';
//           font-weight: normal;
//           color: #666;
//           margin-bottom: 40px;
//         }
//       </style>
//     </head>
//     <body>
//       <div class="card">
//         <h1 class="name">John Doe</h1>
//         <h1 class="email">johndoe@uic.edu</h1>
//         <h1 class="designation">Associate Professor</h1>
//         <h1 class="phone">(+1)-321-221-0062</h1>
//         <img src="./assets/icons/avatar2.png" class="avatar">
//       </div>
//     </body>
//     </html>
// `;
//     const { uri } = await Print.printToFileAsync({ html });
//     console.log('File has been saved to:', uri);
//     await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
//   };


  return (
    <View style={styles.container}>
      <Card
        style={[styles.card, isPressed && styles.pressedCard]}
        onPress={handleCardPress}>
        <Card.Content style={styles.content}>
          <Avatar.Image
            size={80}
            source={require("./assets/icons/avatar2.png")}
            style={styles.avatar}
          />
          <Caption style={styles.distance}>{"5ft away"}</Caption>
          <Title style={styles.name}>{"John Doe"}</Title>
          <Caption style={styles.email}>{"johndoe@uic.edu"}</Caption>
        </Card.Content>
      </Card>
      <Modal visible={visible} onDismiss={hideDialog} animationType="slide">
        <View style={styles.modalContent}>
          <Avatar.Image
            size={80}
            source={require("./assets/icons/avatar2.png")}
            style={styles.avatar}
          />
          <Title style={styles.name}>{"John Doe"}</Title>
          <Caption style={styles.email}>{"johndoe@uic.edu"}</Caption>
          <Caption style={styles.designation}>{"Associate Professor"}</Caption>
          <Caption style={styles.phone}>{"(+1)-321-221-0062"}</Caption>

          <Button onPress={hideDialog} title="Close" />
          {/* <Button onPress={printToFile} title="Download PDF" /> */}
        </View>
        </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '80%',
  },
  pressedCard: {
    backgroundColor: 'lightgray',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: 'lightblue',
    marginBottom: 10,
  },
  distance: {
    marginLeft: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
  },
  designation: {
    fontSize: 16,
  },
  phone: {
    fontSize: 16,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default MyCard;