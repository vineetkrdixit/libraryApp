import React, {useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';
import {AppImages} from '../../Assets/images';
import PhoneInput from 'react-native-phone-number-input';
import CustomButton from '../../Components/CustomButton';
import auth from '@react-native-firebase/auth';

const PhoneLoginScreen = ({navigation}) => {
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);

  //For phone number Authentication
  const [confirm, setConfirm] = useState(null);
  const phoneInput = useRef(null);

  console.log(value, formattedValue, 'ioioioioioio');

  const sendOtp = async () => {
    const checkValid = await phoneInput.current?.isValidNumber(value);
    setValid(checkValid ? checkValid : false);
    console.log(valid, 'valid==');
    if (valid) {
      const confirmation = await auth().signInWithPhoneNumber(formattedValue);
      console.log(confirmation, 'confirmation====');
      setConfirm(confirmation);
      setTimeout(() => {
        if (confirmation) {
          navigation.navigate('VerifyOtpScreen', {
            confirm: confirm,
          });
        }
      }, 1000);
    }
  };
  return (
    <ScrollView>
      <View style={{}}>
        <ImageBackground source={AppImages.loginBackground}>
          <Image source={AppImages.background} />
          <View style={styles.container}>
            <View style={styles.phoneTextView}>
              <Text style={styles.phoneText}>
                Enter your phone number to continue
              </Text>
            </View>

            <View style={styles.phoneInputView}>
              <PhoneInput
                ref={phoneInput}
                defaultValue={value}
                defaultCode="IN"
                layout="first"
                onChangeText={text => {
                  setValue(text);
                }}
                containerStyle={styles.containerStyle}
                textInputStyle={styles.textInputStyle}
                textContainerStyle={styles.textContainerStyle}
                onChangeFormattedText={text => {
                  setFormattedValue(text);
                }}
                // withDarkTheme
                // withShadow
                autoFocus
              />
            </View>
            <CustomButton
              title="Continue"
              onPress={() => sendOtp()}
              style={styles.continueBtn}
            />
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

export default PhoneLoginScreen;

const styles = StyleSheet.create({
  continueBtn: {
    backgroundColor: '#dac829',
    width: '50%',
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 20,
  },
  textContainerStyle: {backgroundColor: '#ffffff'},
  textInputStyle: {
    height: 40,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#dac892',
    borderWidth: 1,
    backgroundColor: '#ffffff',
  },
  containerStyle: {
    height: 50,
    borderRadius: 20,
  },
  phoneInputView: {
    paddingHorizontal: 10,
    marginTop: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneText: {fontSize: 18, fontWeight: 'bold', textAlign: 'center'},
  phoneTextView: {
    marginTop: 10,
    width: '70%',
    alignSelf: 'center',
  },
  container: {
    position: 'absolute',
    top: '25%',
    left: '8%',
    maxHeight: 600,
    width: '85%',
    borderRadius: 20,
    backgroundColor: 'white',
    elevation: 5,
    paddingBottom: 25,
  },
});
