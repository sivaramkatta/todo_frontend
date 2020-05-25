import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DropdownAlert from 'react-native-dropdownalert';
import {GetFromStorage} from './utils/storage';
import SignIn from './screens/Signin';
import SignUp from './screens/Signup';
import Dashboard from './screens/Dashboard';
import DropDownHolder from './utils/dropdown';
import {ActivityIndicator} from 'react-native';

const Stack = createStackNavigator();
class App extends React.Component {
  state = {
    loggedin: false,
    loading: true,
  };

  async componentDidMount() {
    const token = await GetFromStorage('token');
    this.setState({loading: false});
    if (token) {
      this.setState({loggedin: true});
    }
  }

  render() {
    const {loggedin, loading} = this.state;
    if (loading) {
      return <ActivityIndicator style={styles.loader} />;
    }
    return (
      <NavigationContainer>
        {loggedin ? (
          <Stack.Navigator>
            <Stack.Screen name="Dashboard" component={Dashboard} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </Stack.Navigator>
        )}
        <DropdownAlert ref={(ref) => DropDownHolder.setDropDown(ref)} />
      </NavigationContainer>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  loader: {
    marginTop: 50,
  },
});
