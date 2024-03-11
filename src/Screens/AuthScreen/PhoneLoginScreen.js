import React, {useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  Image,
  SafeAreaView,
} from 'react-native';
import {AppImages} from '../../Assets/images';
import PhoneInput from 'react-native-phone-number-input';
import CustomButton from '../../Components/CustomButton';
import auth from '@react-native-firebase/auth';
import {createUserData} from '../../Services/AuthServices';
import {OtpInput} from 'react-native-otp-entry';

const PhoneLoginScreen = ({navigation}) => {
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [code, setCode] = useState('');

  //For phone number Authentication
  const [confirm, setConfirm] = useState(null);
  const phoneInput = useRef(null);
  const sendOtp = async phoneNumber => {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  };

  const verifyOtp = async () => {
    try {
      const result = await confirm.confirm(code);
      const userId = result?.user?.uid;
      const payload = {
        phoneNumber: result?.user?.phoneNumber,
      };
      createUserData(userId, payload);
      console.log('mobile no result===', result);
    } catch (error) {
      console.log('Invalid code.');
    }
  };

  return (
    <SafeAreaView style={styles.fullView}>
      <View style={{flex: 1}}>
        <ImageBackground source={AppImages.loginBackground} style={{flex: 1}}>
          {!confirm ? (
            <>
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
                  onPress={() => sendOtp(formattedValue)}
                  style={styles.continueBtn}
                />
              </View>
            </>
          ) : (
            <View style={styles.container}>
              <View style={styles.otpText}>
                <Text style={styles.phoneText}>Enter your OTP</Text>
              </View>

              <OtpInput
                numberOfDigits={6}
                focusColor="#dac829"
                focusStickBlinkingDuration={500}
                onTextChange={text => setCode(text)}
                onFilled={text => console.log(`OTP is ${text}`)}
                theme={{
                  containerStyle: styles.otpContainer,
                  inputsContainerStyle: styles.inputsContainer,
                  pinCodeContainerStyle: styles.pinCodeContainer,
                  pinCodeTextStyle: styles.pinCodeText,
                  focusStickStyle: styles.focusStick,
                  focusedPinCodeContainerStyle: styles.activePinCodeContainer,
                }}
              />
              <CustomButton
                title="Confirm"
                onPress={verifyOtp}
                style={styles.confirmBtn}
              />
            </View>
          )}
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default PhoneLoginScreen;

const styles = StyleSheet.create({
  continueBtn: {
    backgroundColor: '#dac829',
    width: '50%',
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 10,
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
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneText: {fontSize: 18, fontWeight: 'bold', textAlign: 'center'},
  phoneTextView: {
    width: '70%',
    alignSelf: 'center',
  },
  container: {
    top: '25%',
    alignSelf: 'center',
    width: '85%',
    borderRadius: 20,
    backgroundColor: 'white',
    elevation: 5,
    paddingVertical: 10,
  },
  fullView: {flex: 1, backgroundColor: 'black'},
  confirmBtn: {
    backgroundColor: '#dac829',
    width: '50%',
    borderRadius: 20,
    marginTop: 40,
    alignSelf: 'center',
  },
  otpContainer: {
    top: '5%',
    left: '2%',
  },
  otpText: {
    paddingVertical: 10,
  },
});
