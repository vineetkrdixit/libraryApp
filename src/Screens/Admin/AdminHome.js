import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Logout} from '../../Services/AuthServices';
import {runOnJS} from 'react-native-reanimated';

const AdminHome = ({navigation}) => {
  return (
    <View style={{backgroundColor: 'red', flex: 1}}>
      <Text> Admin Home </Text>
      <TouchableOpacity onPress={() => Logout()}>
        <Text> Logout </Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => runOnJS(navigation.openDrawer())}>
        <Text> Open drawer </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => runOnJS(navigation.closeDrawer())}>
        <Text> Close drawer </Text>
      </TouchableOpacity> */}
    </View>
  );
};
export default AdminHome;

const styles = StyleSheet.create({});
