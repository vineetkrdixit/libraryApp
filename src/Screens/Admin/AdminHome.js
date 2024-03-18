import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import {Logout} from '../../Services/AuthServices';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Crousel from '../../Components/Crousel';
import {bookData} from '../../Utils/constants';
// import {SafeAreaView} from 'react-native-safe-area-context';

const AdminHome = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View
          style={{
            height: 250,
            width: '100%',
            backgroundColor: '#DAC829',
            borderBottomLeftRadius: 100,
            borderBottomRightRadius: 100,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '90%',
              justifyContent: 'space-between',
              alignSelf: 'center',
              marginTop: 30,
            }}>
            <Text style={{color: 'white', fontSize: 30, fontWeight: '900'}}>
              Our Best Picks
            </Text>
            <Icon name={'menu'} size={25} color={'white'} />
          </View>
        </View>
        <View style={{bottom: 130}}>
          <Crousel data={bookData} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default AdminHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
