import React, {useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import CustomTextInput from '../../Components/CustomTextInput';
import CustomButton from '../../Components/CustomButton';
import {AppImages} from '../../Assets/images';
import PhoneLoginScreen from './PhoneLoginScreen';
import auth from '@react-native-firebase/auth';

const SignUpContent = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobile, setMobile] = useState('');
  console.log(confirmPassword, mobile);

  const signUpfromEmailandPass = (useremail, userpassword) => {
    auth()
      .createUserWithEmailAndPassword(useremail, userpassword)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.error(error);
      });
  };

  return (
    <View style={styles.contentView}>
      <Text>Email</Text>
      <CustomTextInput
        placeholder="Enter your email"
        value={'username'}
        style={styles.textInput}
        onChangeText={text => setEmail(text)}
      />

      <Text>Password</Text>
      <CustomTextInput
        style={styles.textInput}
        placeholder="Enter your password"
        value={'password'}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <Text>Confirm Password</Text>
      <CustomTextInput
        style={styles.textInput}
        placeholder="Enter your confirm password"
        value={'confirmpassword'}
        onChangeText={text => setConfirmPassword(text)}
        secureTextEntry
      />
      <Text>Mobile</Text>
      <CustomTextInput
        style={styles.textInput}
        placeholder="Enter your mobile number"
        value={'mobile'}
        onChangeText={text => setMobile(text)}
        secureTextEntry
      />
      <View style={styles.signUpBtnView}>
        <CustomButton
          title="Sign Up"
          onPress={() => {
            signUpfromEmailandPass(email, password);
          }}
          style={styles.signUpBtn}
        />
      </View>
      <Text style={styles.orView}>OR</Text>
      <View style={styles.socialView}>
        <TouchableOpacity>
          <Image source={AppImages.googleIcon} style={styles.mobileIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(PhoneLoginScreen)}>
          <Image source={AppImages.mobileIcon} style={styles.mobileIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={AppImages.facebookIcon} style={styles.iconHeight} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpContent;

const styles = StyleSheet.create({
  iconHeight: {height: 30, width: 30},
  mobileIcon: {height: 30, width: 30, marginRight: 10},
  socialView: {flexDirection: 'row', width: '100%', justifyContent: 'center'},
  orView: {textAlign: 'center', marginVertical: 20},
  signUpBtn: {backgroundColor: '#dac829', width: '50%', borderRadius: 20},
  signUpBtnView: {marginTop: 35, alignItems: 'center'},
  forgetPassword: {textDecorationLine: 'underline', color: '#dac829'},
  itemEnd: {alignItems: 'flex-end'},
  textInput: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#dac892',
  },
  contentView: {paddingHorizontal: 10, marginTop: 50},
});
