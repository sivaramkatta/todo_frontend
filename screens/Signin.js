import React from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';

class Login extends React.Component {
  render() {
    return (
      <View style={styles.Container}>
        <Text style={styles.Title}>Welcome to Todo</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          autoCapitalize="none"
          placeholderTextColor="#686868"
        />
        <TextInput
          style={[styles.TextInput, styles.margin]}
          placeholder="Password"
          autoCapitalize="none"
          placeholderTextColor="#686868"
          secureTextEntry={true}
        />
        <Button title="Login" />
      </View>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
  Title: {
    fontSize: 25,
    marginTop: 32,
    padding: 16,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  TextInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    margin: 16,
    padding: 16,
    color: 'black',
    fontSize: 16,
    borderRadius: 30,
    paddingHorizontal: 20,
  },
  margin: {
    marginTop: 25,
  },
});
