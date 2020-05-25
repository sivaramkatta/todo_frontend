import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Dashboard from '../screens/Dashboard';
import SignIn from '../screens/Signin';
import SignUp from '../screens/Signup';

const LoggedInStack = createStackNavigator({
  Dashboard: {
    screen: Dashboard,
  },
});

const LoggedOutStack = createStackNavigator({
  SignIn: {
    screen: SignIn,
  },
  SignUp: {
    screen: SignUp,
  },
});

const createRootNavigation = (loggedin = false) => {
  const switchNavigator = createSwitchNavigator(
    {
      loggedin: {
        screen: LoggedInStack,
      },
      loggedout: {
        screen: LoggedOutStack,
      },
    },
    {
      initialRouteName: loggedin ? 'loggedin' : 'loggedout',
    },
  );
  return createAppContainer(switchNavigator);
};

export default createRootNavigation;
