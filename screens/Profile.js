import React from 'react';
import {Text, Button, View} from 'react-native';
import {DeleteStorage} from '../utils/storage';

class Dashboard extends React.Component {
  render() {
    return (
      <View>
        <Text>This is Profile</Text>
        <Button
          title="logout"
          onPress={async () => {
            await DeleteStorage();
            this.props.navigation.navigate('SignIn');
          }}
        />
      </View>
    );
  }
}

export default Dashboard;
