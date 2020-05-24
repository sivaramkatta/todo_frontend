import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DropdownAlert from 'react-native-dropdownalert';
import SignIn from './screens/Signin';
import SignUp from './screens/Signup';
import DropDownHolder from './utils/dropdown';

const Stack = createStackNavigator();
class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
        <DropdownAlert ref={(ref) => DropDownHolder.setDropDown(ref)} />
      </NavigationContainer>
    );
  }
}

export default App;
