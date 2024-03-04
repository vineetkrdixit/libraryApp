import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import CustomTextInput from '../../Components/CustomTextInput';
import CustomButton from '../../Components/CustomButton';
import {AppImages} from '../../Assets/images';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginWithFacebook, LoginWithGoogle} from '../../Services/AuthServices';
import PhoneLoginScreen from './PhoneLoginScreen';
import {Formik} from 'formik';
import {loginValidation} from '../../Utils/helper';

const LoginContent = ({navigation}) => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');

  console.log(userName, password);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '576432052291-mk8a11vgl6fr5lkhgqqlgbo2bliha4ad.apps.googleusercontent.com',
    });
  });

  return (
    <Formik
      initialValues={{email: '', password: ''}}
      onSubmit={values => console.log(values)}
      validationSchema={loginValidation}
      validateOnMount={true}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        isValid,
        touched,
      }) => (
        <View style={styles.contentView}>
          <Text>Email:</Text>
          <CustomTextInput
            placeholder="Enter your email"
            // value={'username'}
            style={styles.textInput}
            // onChangeText={text => setUsername(text)}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
          />
          {errors.email && touched.email && (
            <Text style={styles.errorMessage}>{errors.email}</Text>
          )}

          <Text>Password:</Text>
          <CustomTextInput
            placeholder="Enter your password"
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            // value={'password'}
            // onChangeText={text => setPassword(text)}
            secureTextEntry
            style={styles.textInput}
          />
          {errors.password && touched.password && (
            <Text style={styles.errorMessage}>{errors.password}</Text>
          )}
          <View style={styles.itemEnd}>
            <Text style={styles.forgetPassword}>Forget password</Text>
          </View>
          <View style={styles.loginBtnView}>
            <CustomButton
              title="Log In"
              onPress={{}}
              style={styles.loginBtn}
              disable={!isValid}
            />
          </View>
          <Text style={styles.orView}>OR</Text>
          <View style={styles.socialView}>
            <TouchableOpacity onPress={() => LoginWithGoogle()}>
              <Image source={AppImages.googleIcon} style={styles.mobileIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate(PhoneLoginScreen)}>
              <Image source={AppImages.mobileIcon} style={styles.mobileIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => LoginWithFacebook()}>
              <Image
                source={AppImages.facebookIcon}
                style={styles.iconHeight}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default LoginContent;

const styles = StyleSheet.create({
  iconHeight: {height: 30, width: 30},
  mobileIcon: {height: 30, width: 30, marginRight: 10},
  socialView: {flexDirection: 'row', width: '100%', justifyContent: 'center'},
  orView: {textAlign: 'center', marginVertical: 20},
  loginBtn: {backgroundColor: '#dac829', width: '50%', borderRadius: 20},
  loginBtnView: {marginTop: 35, alignItems: 'center'},
  forgetPassword: {textDecorationLine: 'underline', color: '#dac829'},
  itemEnd: {alignItems: 'flex-end'},
  textInput: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#dac892',
  },
  contentView: {paddingHorizontal: 10, marginTop: 50},
  errorMessage: {top: -5, color: 'red'},
});
