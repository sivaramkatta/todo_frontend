import React from 'react';
import {Text, Button, View, Image, StyleSheet} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import {DeleteStorage} from '../utils/storage';
import {GET} from '../utils/fetch';

class Dashboard extends React.Component {
  state = {
    name: '',
    username: '',
    email: '',
  };

  async componentDidMount() {
    this.getProfile();
  }

  async getProfile() {
    const data = await GET('user');
    if (data.data) {
      const {
        data: {name, username, email},
      } = data;
      this.setState({name, email, username});
    }
  }

  render() {
    const {name, email, username} = this.state;
    return (
      <View style={styles.container}>
        <NavigationEvents onDidFocus={() => this.getProfile()} />
        <Image
          source={require('../images/profile_pic.jpg')}
          style={styles.image}
        />
        <View style={styles.margin}>
          <Text style={styles.text}>
            <Text style={styles.bold}>Name :</Text> {name}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Email :</Text> {email}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Username :</Text> {username}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Edit Details"
            onPress={async () => {
              console.log('edit profile screen');
              this.props.navigation.navigate('EditProfile');
            }}
          />
          <View style={styles.margin1}>
            <Button
              title="Logout"
              color="red"
              onPress={async () => {
                await DeleteStorage();
                this.props.navigation.navigate('SignIn');
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    height: 120,
    width: 120,
    marginRight: 16,
    alignSelf: 'center',
    marginTop: 100,
    marginLeft: 20,
  },
  text: {
    fontSize: 18,
    marginVertical: 12,
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
  },
  margin: {
    marginLeft: 20,
    marginTop: 40,
  },
  margin1: {
    marginLeft: 20,
  },
  bold: {
    fontWeight: '500',
  },
});
