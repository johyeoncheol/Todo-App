import React from 'react';
import { 
  StyleSheet, 
  StatusBar, 
  View, 
  Text, 
  TextInput, 
  Dimensions, 
  Platform, 
  ScrollView, 
  AsyncStorage 
} from 'react-native';
import ToDo from './Todo';
import { AppLoading } from "expo";
import uuidv1 from "uuid";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
const seed = () => {
  const one = Math.floor((Math.random() * 100) / 3.92);
  const two = Math.floor((Math.random() * 100) / 3.92);
  const three = Math.floor((Math.random() * 100) / 3.92);
  const four = Math.floor((Math.random() * 100) / 3.92);
  const five = Math.floor((Math.random() * 100) / 3.92);
  const six = Math.floor((Math.random() * 100) / 3.92);
  const seven = Math.floor((Math.random() * 100) / 3.92);
  const eight = Math.floor((Math.random() * 100) / 3.92);
  const nine = Math.floor((Math.random() * 100) / 3.92);
  const ten = Math.floor((Math.random() * 100) / 3.92);
  const eleven = Math.floor((Math.random() * 100) / 3.92);
  const twelve = Math.floor((Math.random() * 100) / 3.92);
  const thirteen = Math.floor((Math.random() * 100) / 3.92);
  const fourteen = Math.floor((Math.random() * 100) / 3.92);
  const fifteen = Math.floor((Math.random() * 100) / 3.92);
  const sixteen = Math.floor((Math.random() * 100) / 3.92);
  return [
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    nine,
    ten,
    eleven,
    twelve,
    thirteen,
    fourteen,
    fifteen,
    sixteen
  ];
}

const { width, height } = Dimensions.get("window");

export default class App extends React.Component {
  state ={
    loadedToDos: true,
    newToDo: "",
    toDos:{}
  };
  componentDidMount = () => {
    this._loadToDos();
  }
  render() {
    const { newToDo, loadedToDos,toDos } = this.state;
    if (!loadedToDos) {
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>ToDo App</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={"New To Do"}
            value={newToDo}
            onChangeText={this._controllNewToDo}
            placeholderTextColor={"#999"}
            returnKeyType={"done"}
            autoCorrect={false}
            onSubmitEditing={this._addToDo}
          />
          <ScrollView contentContainerStyle={styles.toDos}>
            {Object.values(toDos)
              .reverse()
              .map(toDo=> (
              <ToDo 
              key={toDo.id} 
              deleteToDo={this._deleteToDo}
              uncompleteToDo={this._uncompleteToDo}
              completeToDo={this._completeToDo}
              updateToDo={this._updateToDo}
              {...toDo} 
              />
              ))}
          </ScrollView>
        </View>
      </View>
    )
  };

  _controllNewToDo = text => {
    this.setState({
      newToDo: text
    });
  };

  _loadToDos = async () => {
    // this.setState({
    //   loadedToDos:true
    // })
    try {
      const toDos = await AsyncStorage.getItem("toDos");
      this.setState({
        loadedTodos: true,
        toDos: JSON.parse(toDos)
      });
    } catch(err) {
      console.log(err);
    }
  };

/*
   Todo Obj Modeling
   const toDos = {
     id: 123456,
     text: 'hello',
     isCompleted: false,
     date: 231321561
   },
   {
     id: 456123,
     text: 'Hi',
     isCompleted: false,
     date: 231321561
   }
 */

  _addToDo = () => {
    const { newToDo } = this.state;
    if (newToDo !== "") {
      this.setState(prevState => {
        const ID = uuidv4({ random: seed() });
        const newToDoObject = {
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newToDo,
            createAt: Date.now()
          }
        };
        const newState = {
          ...prevState,
          newToDo: "",
          toDos: {
            ...prevState.toDos,
            ...newToDoObject
          }};
        this._saveToDos(newState.toDos)
        return { ...newState };
      });
    }
  };

  _deleteToDo = id =>{
    this.setState(prevState=>{
      const toDos = prevState.toDos;
      delete toDos[id];
      const newState={
        ...prevState,
        ...toDos
      };
      this._saveToDos(newState.toDos)
      return {...newState};
    });
  };
  // 해당 id를 갖고 있는 항목을 덮음
  _uncompleteToDo = id => { 
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isCompleted:false
          }
        }
      }
      this._saveToDos(newState.toDos)
      return { ...newState }
    })
  }
  _completeToDo = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isCompleted: true
          }
        }
      }
      this._saveToDos(newState.toDos)
      return { ...newState }
    })
  }
  _updateToDo = (id, text) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: { ...prevState.toDos[id], text: text }
        }
      }
      this._saveToDos(newState.toDos)
      return { ...newState }
    })
  }
  _saveToDos = (newToDos) => {
    const saveToDos = AsyncStorage.setItem("toDos"
    , JSON.stringify(newToDos));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f23657',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 50,
    marginBottom: 30,
    fontWeight: "200"
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 50,
    // borderRadius:10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowOpacity: 0.5,
        shadowColor: "rgb(50,50,50)",
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 3
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25
  },
  toDos: {

  }
});
