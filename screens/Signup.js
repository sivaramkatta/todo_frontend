import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {POST} from '../utils/fetch';
import DropDownHolder from '../utils/dropdown';
import {
  ValidName,
  ValidUsername,
  ValidEmail,
  ValidPassword,
} from '../utils/validations';

class SignUp extends React.Component {
  state = {
    name: '',
    email: '',
    username: '',
    password: '',
    error: false,
  };

  validateForm() {
    const {name, email, username, password, error} = this.state;
    if (name === '' || email === '' || username === '' || password === '') {
      this.setState({error: true});
      DropDownHolder.dropDown.alertWithType(
        'error',
        'Error',
        'Please fill all details',
      );
    } else if (!ValidName(name)) {
      this.setState({error: true});
      DropDownHolder.dropDown.alertWithType(
        'error',
        'Error',
        'Please enter valid name',
      );
    } else if (!ValidUsername(username)) {
      this.setState({error: true});
      DropDownHolder.dropDown.alertWithType(
        'error',
        'Error',
        'Username must be only alphanumeric',
      );
    } else if (!ValidEmail(email)) {
      this.setState({error: true});
      DropDownHolder.dropDown.alertWithType(
        'error',
        'Error',
        'Please enter valid email id',
      );
    } else if (!ValidPassword(password)) {
      this.setState({error: true});
      DropDownHolder.dropDown.alertWithType(
        'error',
        'Error',
        'Password must have atleast 5 characters',
      );
    }
  }

  handleSubmit = async () => {
    await this.validateForm();
    const {username, password, email, name, error} = this.state;
    if (!error) {
      const data = await POST('signup', {
        username,
        password,
        email,
        name,
      });
      if (data.data) {
        await AsyncStorage.setItem('token', data.data.token);
      } else if (data.error) {
        DropDownHolder.dropDown.alertWithType('error', 'Error', data.error.msg);
      }
    }
  };

  render() {
    return (
      <View style={styles.Container}>
        <Text style={styles.Title}>Welcome to Todo</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Name"
          autoCapitalize="none"
          placeholderTextColor="#686868"
          onChangeText={(name) => this.setState({name, error: false})}
        />
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          autoCapitalize="none"
          placeholderTextColor="#686868"
          onChangeText={(username) => this.setState({username, error: false})}
        />
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          autoCapitalize="none"
          placeholderTextColor="#686868"
          onChangeText={(email) => this.setState({email, error: false})}
        />
        <TextInput
          style={[styles.TextInput, styles.margin]}
          placeholder="Password"
          autoCapitalize="none"
          placeholderTextColor="#686868"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({password, error: false})}
        />
        <TouchableOpacity onPress={this.handleSubmit} style={styles.button}>
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('SignIn');
          }}>
          <Text style={styles.helpText}>
            Already a user? <Text style={styles.button2}> Sign in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SignUp;

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
