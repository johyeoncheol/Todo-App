import React from 'react';
import { 
  StyleSheet, 
  Text,
  View,
  StatusBar, 
  TextInput, 
  Dimensions,
  Platform
} from 'react-native';

const {height,width} = Dimensions.get("window");

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>ToDo app</Text>
      <View style={styles.card}>
        <TextInput style={styles.input} placeholder={"New ToDo"}></TextInput>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F23657',
    alignItems: 'center'
  },
  title:{
    color:"white",
    fontSize:30,
    marginTop:40,
    fontWeight:"100",
    marginBottom: 30
  },
  card:{
    backgroundColor:"white",
    flex:1,
    width: width - 25,
    borderRadius: 10,
    borderTopRightRadius:10,
    ...Platform.select({
      ios:{
        shadowColor:"rgb(50,50,50)",
        shadowOpacity:0.5,
        shadowOffset:{
          height:-1,
          width:0
        }
      },
      android:{
        elevation:3
      }
    })
  }
});
