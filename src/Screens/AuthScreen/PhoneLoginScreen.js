import React, {useRef, useState, useEffect} from 'react';
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
import CustomTextInput from '../../Components/CustomTextInput';
import {createUserData} from '../../Services/AuthServices';

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
    <ScrollView>
      <View style={{}}>
        <ImageBackground source={AppImages.loginBackground}>
          <Image source={AppImages.background} />
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
              <View style={styles.otpContainer}>
                <View style={styles.otpInputstyle}>
                  <CustomTextInput onChangeText={e => setCode(e)} />
                  {/* <CustomOTPInput setCode={setCode} /> */}
                </View>
                <CustomButton
                  title="Confirm"
                  onPress={verifyOtp}
                  style={styles.confirmBtn}
                />
              </View>
            </View>
          )}
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
    top: '20%',
    left: '8%',
    maxHeight: 600,
    width: '85%',
    borderRadius: 20,
    backgroundColor: 'white',
    elevation: 5,
    paddingBottom: 25,
  },
});
