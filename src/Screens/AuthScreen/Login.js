import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {AppImages} from '../../Assets/images';
import LoginContent from './LoginContent';
import SignUpContent from './SignUpContent';

const Login = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState('1');
  const renderContent = index => {
    console.log(index, 'index===');
    switch (currentIndex) {
      case '1':
        return <LoginContent navigation={navigation} />;
      case '2':
        return <SignUpContent navigation={navigation} />;
      default:
        return null;
    }
  };

  return (
    <ScrollView>
      <View style={{}}>
        <ImageBackground source={AppImages.loginBackground}>
          <Image source={AppImages.background} />
          <View style={styles.container}>
            <View style={styles.container}>
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
                        currentIndex === '1' ? '#DAC829' : '#fffcf1',
                    },
                  ]}>
                  <Text style={styles.textCenter}>Sign Up</Text>
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
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '25%',
    left: '10%',
    maxHeight: 600,
    width: '80%',
    borderRadius: 20,
    backgroundColor: 'white',
    elevation: 5,
  },
  contanerView: {
    alignItems: 'center',
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
});
