import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {POST, GET} from '../utils/fetch';
import DropDownHolder from '../utils/dropdown';
import {
  ValidName,
  ValidUsername,
  ValidEmail,
  ValidPassword,
} from '../utils/validations';

class EditProfile extends React.Component {
  state = {
    name: '',
    email: '',
    username: '',
    password: '',
    error: false,
  };

  async componentDidMount() {
    const data = await GET('user');
    if (data.data) {
      const {
        data: {name, username, email, password},
      } = data;
      this.setState({name, email, username, password});
    }
  }

  validateForm() {
    const {name, email, username, password} = this.state;
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
      const data = await POST('edit', {
        username,
        password,
        email,
        name,
      });
      if (data.success) {
        this.props.navigation.navigate('Profile');
      } else if (data.error) {
        DropDownHolder.dropDown.alertWithType('error', 'Error', data.error.msg);
      }
    }
  };

  render() {
    const {name, email, password, username} = this.state;
    return (
      <View style={styles.Container}>
        <TextInput
          style={styles.TextInput}
          value={name}
          placeholder="Name"
          autoCapitalize="none"
          placeholderTextColor="#686868"
          onChangeText={(name_value) =>
            this.setState({name: name_value, error: false})
          }
        />
        <TextInput
          style={styles.TextInput}
          value={username}
          placeholder="Username"
          autoCapitalize="none"
          placeholderTextColor="#686868"
          onChangeText={(username_value) =>
            this.setState({username: username_value, error: false})
          }
        />
        <TextInput
          style={styles.TextInput}
          value={email}
          placeholder="Email"
          autoCapitalize="none"
          placeholderTextColor="#686868"
          onChangeText={(email_value) =>
            this.setState({email: email_value, error: false})
          }
        />
        <TextInput
          style={[styles.TextInput, styles.margin]}
          placeholder="Password"
          value={password}
          autoCapitalize="none"
          placeholderTextColor="#686868"
          secureTextEntry={true}
          onChangeText={(password_value) =>
            this.setState({password: password_value, error: false})
          }
        />
        <TouchableOpacity onPress={this.handleSubmit} style={styles.button}>
          <Text style={styles.loginText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default EditProfile;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 30,
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
