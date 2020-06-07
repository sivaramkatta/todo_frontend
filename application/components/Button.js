import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';

const Button = ({title, handleOnClick, style = {}}) => (
  <TouchableOpacity
    onPress={() => {
      handleOnClick();
    }}>
    <View style={{...styles.conatiner, ...style}}>
      <Text style={styles.text}>{title}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  conatiner: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#0b7bfe',
    borderRadius: 4,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Button;
