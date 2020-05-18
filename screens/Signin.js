import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {POST} from './fetch';

class Login extends React.Component {
  state = {
    username: '',
    password: '',
  };

  handleSubmit = async () => {
    const {username, password} = this.state;
    const data = await POST('signin', {
      username,
      password,
    });
    if (data.data) {
      AsyncStorage.setItem('token', data.data.token);
    } else if (data.error) {
      // handle error
    }
  };

  render() {
    return (
      <View style={styles.Container}>
        <Text style={styles.Title}>Welcome to Todo</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          autoCapitalize="none"
          placeholderTextColor="#686868"
          onChangeText={(username) => this.setState({username})}
        />
        <TextInput
          style={[styles.TextInput, styles.margin]}
          placeholder="Password"
          autoCapitalize="none"
          placeholderTextColor="#686868"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({password})}
        />
        <TouchableOpacity onPress={this.handleSubmit} style={styles.button}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('SignUp');
          }}>
          <Text style={styles.helpText}>
            New user? <Text style={styles.button2}> Sign up</Text>
          </Text>
        </TouchableOpacity>
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
  loginText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 12,
    margin: 16,
    borderRadius: 10,
  },
  helpText: {
    fontSize: 16,
    color: '#383838',
    textAlign: 'center',
  },
  button2: {
    color: '#1E90FF',
  },
});
