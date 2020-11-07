import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, TextInput, Button, View, FlatList, Text } from 'react-native';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state ={
      loading: false,
      error: null,
      data: undefined,
      value: undefined
    };


    // Este enlace es necesario para hacer que `this` funcione en el callback
    this.handlerButton = this.handlerButton.bind(this);
    this.handlerText = this.handlerText.bind(this);
  }

  peopleGetName = (name) => new Promise((resolve, reject) => { 
    fetch(`https://swapi.dev/api/people/?search=${name}`)
    .then(response => {
        if(response.status != 404) return response.json()
        return false
    })
    .then(json => resolve(json)) 
  })

  handlerText(e){
    
    this.setState({value : e});
  }


  handlerButton(){
    let name = this.state.value;   
    this.peopleGetName(name).then(data => {
      console.log(data)
      this.setState({
        loading: true,
        data: data
      });
    })
    console.log("me presionaron");
  }
  


  render(){

    const { error, loading, data, value } = this.state;
    

    if (!loading) {
      return (
      <View style={styles.container}>
         <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, width:  200 }}
          onChangeText={text => this.handlerText(text)}
          
          />
       <Button
          onPress={this.handlerButton}
          title="Consultar Api"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
      )

    } else if (Array.isArray(data.results) && data.results.length != 0){
      return  (
      <View style={styles.container}>
        
        <FlatList
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
        data={data.results}
        renderItem={({item}) => {
          return (
            <Text>{item.name}</Text>
          )
        }}
        keyExtractor={item => item.name}
        />

        
      </View>
      )
    }  else {
      return (
      <View style={styles.container} >
  
        <Text>No se encontraron datos</Text>
    
      </View>
      )
    
    }
    
    
  }
  
}

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
