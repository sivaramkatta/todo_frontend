import React from 'react';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import {GetFromStorage} from './utils/storage';
import DropDownHolder from './utils/dropdown';
import createRootNavigation from './utils/router';

class App extends React.Component {
  state = {
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
    const {loading, loggedin} = this.state;
    if (loading) {
      return <ActivityIndicator style={styles.loader} />;
    }
    const AppRouter = createRootNavigation(loggedin);
    return (
      <View style={styles.container}>
        <AppRouter />
        <DropdownAlert ref={(ref) => DropDownHolder.setDropDown(ref)} />
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    marginTop: 50,
  },
});
