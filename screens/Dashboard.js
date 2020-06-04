import React from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Button from '../components/Button';
import {GET} from '../utils/fetch';

function formatDate(date) {
  return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
}

class Dashboard extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Profile');
          }}>
          <Image
            source={require('../images/default_pp.png')}
            style={styles.image}
          />
        </TouchableOpacity>
      ),
    };
  };

  state = {
    selected: 'TODAY',
    todos: [],
  };

  componentDidMount() {
    this.getTODO();
  }

  async getTODO(date) {
    const date_value = date ? date : new Date();
    const data = await GET(`todo/?date=${formatDate(date_value)}`);
    if (data.data) {
      const {data: todos} = data;
      this.setState({todos});
    }
  }

  handleButtonClick(value) {
    this.setState({selected: value});
  }

  render() {
    const {selected} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            title="Yesterday"
            handleOnClick={() => this.handleButtonClick('YESTERDAY')}
            style={selected === 'YESTERDAY' ? styles.green : {}}
          />
          <Button
            title="Today"
            handleOnClick={() => this.handleButtonClick('TODAY')}
            style={selected === 'TODAY' ? styles.green : {}}
          />
          <Button
            title="Tomorrow"
            handleOnClick={() => this.handleButtonClick('TOMORROW')}
            style={selected === 'TOMORROW' ? styles.green : {}}
          />
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Search');
            }}>
            <View style={styles.search}>
              <Text style={styles.searchText}>&#x2315;</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Dashboard;

const styles = StyleSheet.create({
  image: {
    height: 30,
    width: 30,
    marginRight: 16,
    backgroundColor: 'white',
  },
  container: {
    margin: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  green: {
    backgroundColor: 'green',
  },
  search: {
    backgroundColor: '#0b7bfe',
    paddingHorizontal: 11,
    paddingVertical: 1,
    borderRadius: 20,
  },
  searchText: {
    color: 'white',
    fontSize: 30,
  },
});
