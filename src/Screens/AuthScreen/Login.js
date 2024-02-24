import React, {Component, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {AppImages} from '../../Assets/images';
import LoginContent from './LoginContent';
import SignUpContent from './SignUpContent';

const Login = () => {
  const [currentIndex, setCurrentIndex] = useState('1');
  const renderContent = index => {
    console.log(index, 'index===');
    switch (currentIndex) {
      case '1':
        return <LoginContent />;
      case '2':
        return <SignUpContent />;
      default:
        return null;
    }
  };

  return (
    <ScrollView>
      <View style={{}}>
        <ImageBackground source={AppImages.loginBackground}>
          <Image source={AppImages.background} />
          <View
            style={{
              position: 'absolute',
              top: '25%',
              left: '10%',
              maxHeight: 600,
              width: '80%',
              borderRadius: 20,
              // padding: 20,
              backgroundColor: 'white',
              elevation: 5,
              paddingBottom: 25,
              // alignItems: 'center',
            }}>
            <View style={{alignItems: 'center'}}>
              <View
                style={{
                  width: '95%',
                  height: 40,
                  backgroundColor: '#fffcf1',
                  marginTop: 20,
                  // borderRadius: 25,
                  // elevation: 1,
                  // justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  onPress={() => setCurrentIndex('1')}
                  style={{
                    width: '50%',
                    backgroundColor:
                      currentIndex === '1' ? '#DAC829' : '#fffcf1',
                    justifyContent: 'center',
                    borderRadius: 25,
                  }}>
                  <Text style={{textAlign: 'center'}}>Log In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setCurrentIndex('2')}
                  style={{
                    width: '50%',
                    backgroundColor:
                      currentIndex === '2' ? '#DAC829' : '#fffcf1',
                    justifyContent: 'center',
                    borderRadius: 25,
                  }}>
                  <Text style={{textAlign: 'center'}}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>{renderContent()}</View>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};
export default Login;
const styles = StyleSheet.create({});
