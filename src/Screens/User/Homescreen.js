import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Logout} from '../../Services/AuthServices';

const HomeScreen = () => {
  return (
    <View style={{backgroundColor: 'yellow', flex: 1}}>
      <Text> User Home screen </Text>
      <TouchableOpacity onPress={() => Logout()}>
        <Text> Logout </Text>
      </TouchableOpacity>
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({});
