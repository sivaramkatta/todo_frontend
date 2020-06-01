import React from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';

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
  render() {
    return (
      <View>
        <Text>This is dashboard</Text>
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
});
