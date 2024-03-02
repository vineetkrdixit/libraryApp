import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';
import {AppImages} from '../../Assets/images';
import CustomOTPInput from '../../Components/OtpInput';
import CustomButton from '../../Components/CustomButton';
const VerifyOtpScreen = ({route}) => {
  console.log(route, 'p[[p[pp[p[p');
  const confirm = route?.params?.confirm;
  console.log(confirm, 'confirm==-=====');
  const [code, setCode] = useState('');
  const verifyOtp = async () => {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  };

  console.log(code, '090900900909code');
  return (
    <ScrollView>
      <View style={{}}>
        <ImageBackground source={AppImages.loginBackground}>
          <Image source={AppImages.background} />
          <View style={styles.otpContainer}>
            <View style={styles.otpInputstyle}>
              <CustomOTPInput setCode={setCode} />
            </View>
            <CustomButton
              title="Confirm"
              onPress={verifyOtp}
              style={styles.confirmBtn}
            />
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

export default VerifyOtpScreen;

const styles = StyleSheet.create({
  confirmBtn: {
    backgroundColor: '#dac829',
    width: '50%',
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 20,
  },
  otpContainer: {
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
  otpInputstyle: {marginTop: 30, alignSelf: 'center'},
});
