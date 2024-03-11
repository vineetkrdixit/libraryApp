import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {AppImages} from '../../Assets/images';
import LoginContent from './LoginContent';
import SignUpContent from './SignUpContent';
import Toast from 'react-native-toast-message';
import Loader from '../../Components/Loader';
import {SCREEN_HEIGHT} from '../../Utils/helper';

const Login = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState('1');
  const [loading, setLoading] = useState(false);

  const renderContent = index => {
    console.log(index, 'index===');
    switch (currentIndex) {
      case '1':
        return (
          <LoginContent
            navigation={navigation}
            setLoading={setLoading}
            loading={loading}
          />
        );
      case '2':
        return (
          <SignUpContent
            navigation={navigation}
            setLoading={setLoading}
            loading={loading}
          />
        );
      default:
        return null;
    }
  };
  // console.log(currentIndex, 'currentIndex');
  // useEffect(() => {
  //   setTimeout(() => {
  //     Toast.show({type: 'tomatoToast', text1: 'hello'});
  //   }, 2000);
  // }, []);

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
        <ImageBackground source={AppImages.loginBackground} style={{flex: 1}}>
          {loading ? (
            <Loader />
          ) : (
            <View style={styles.container}>
              <View style={styles.containerView}>
                <View style={styles.toggleView}>
                  <TouchableOpacity
                    onPress={() => setCurrentIndex('1')}
                    style={[
                      styles.toggleContet,
                      // eslint-disable-next-line react-native/no-inline-styles
                      {
                        backgroundColor:
                          currentIndex === '1' ? '#DAC829' : '#fffcf1',
                      },
                    ]}>
                    <Text style={styles.textCenter}>Log In</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setCurrentIndex('2')}
                    style={[
                      styles.toggleContet,
                      // eslint-disable-next-line react-native/no-inline-styles
                      {
                        backgroundColor:
                          currentIndex === '2' ? '#DAC829' : '#fffcf1',
                      },
                    ]}>
                    <Text style={styles.textCenter}>Sign Up</Text>
                  </TouchableOpacity>
                </View>
                <ScrollView style={{flex: 1}}>{renderContent()}</ScrollView>
              </View>
            </View>
          )}
        </ImageBackground>
      </SafeAreaView>
    </>
  );
};
export default Login;
const styles = StyleSheet.create({
  container: {
    top: '25%',
    alignSelf: 'center',
    width: '85%',
    borderRadius: 20,
    elevation: 5,
    paddingBottom: 15,
    height: SCREEN_HEIGHT * 0.75,
  },
  containerView: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 20,
    elevation: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  toggleView: {
    width: '95%',
    height: 40,
    backgroundColor: '#fffcf1',
    marginTop: 20,
    flexDirection: 'row',
  },
  toggleContet: {
    width: '50%',
    justifyContent: 'center',
    borderRadius: 25,
  },
  textCenter: {textAlign: 'center'},
  fullView: {flex: 1},
});
