import React, {useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import CustomTextInput from '../../Components/CustomTextInput';
import CustomButton from '../../Components/CustomButton';
import {AppImages} from '../../Assets/images';
import PhoneLoginScreen from './PhoneLoginScreen';
import {
  LoginWithFacebook,
  LoginWithGoogle,
  signUpfromEmailandPass,
} from '../../Services/AuthServices';
import {Formik} from 'formik';
import {signUpValidation} from '../../Utils/helper';
// import auth from '@react-native-firebase/auth';

const SignUpContent = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobile, setMobile] = useState('');
  console.log(confirmPassword, mobile);
  const payload = {
    firstName: firstName,
    lastName: lastName,
    mobile: mobile,
    email: email,
  };

  console.log(payload, 'popppppuiuiiuuiui');

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        mobile: '',
      }}
      onSubmit={values => console.log(values)}
      validateOnBlur={true}
      validateOnMount={true}
      validationSchema={signUpValidation}>
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
          <Text>First Name</Text>
          <CustomTextInput
            placeholder="Enter your FirstName"
            // value={'username'}
            style={styles.textInput}
            // onChangeText={text => setFirstName(text)}
            onChangeText={handleChange('firstName')}
            onBlur={handleBlur('firstName')}
            value={values.firstName}
          />
          {errors.firstName && touched.firstName && (
            <Text style={styles.errorMessage}>{errors.firstName}</Text>
          )}
          <Text>Last Name</Text>
          <CustomTextInput
            placeholder="Enter your LastName"
            // value={'username'}
            style={styles.textInput}
            // onChangeText={text => setLastName(text)}
            onChangeText={handleChange('lastName')}
            onBlur={handleBlur('lastName')}
            value={values.lastName}
          />
          {errors.lastName && touched.lastName && (
            <Text style={styles.errorMessage}>{errors.lastName}</Text>
          )}
          <Text>Email</Text>
          <CustomTextInput
            placeholder="Enter your email"
            // value={'username'}
            style={styles.textInput}
            // onChangeText={text => setEmail(text)}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
          />
          {errors.email && touched.email && (
            <Text style={styles.errorMessage}>{errors.email}</Text>
          )}

          <Text>Password</Text>
          <CustomTextInput
            style={styles.textInput}
            placeholder="Enter your password"
            // value={'password'}
            // onChangeText={text => setPassword(text)}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            secureTextEntry
          />
          {errors.password && touched.password && (
            <Text style={styles.errorMessage}>{errors.password}</Text>
          )}
          <Text>Confirm Password</Text>
          <CustomTextInput
            style={styles.textInput}
            placeholder="Enter your confirm password"
            // value={'confirmpassword'}
            // onChangeText={text => setConfirmPassword(text)}
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            value={values.confirmPassword}
            secureTextEntry
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <Text style={styles.errorMessage}>{errors.confirmPassword}</Text>
          )}
          <Text>Mobile</Text>
          <CustomTextInput
            style={styles.textInput}
            placeholder="Enter your mobile number"
            // value={'mobile'}
            // onChangeText={text => setMobile(text)}
            onChangeText={handleChange('mobile')}
            onBlur={handleBlur('mobile')}
            value={values.mobile}
            // secureTextEntry
          />
          {errors.mobile && touched.mobile && (
            <Text style={styles.errorMessage}>{errors.mobile}</Text>
          )}
          <View style={styles.signUpBtnView}>
            <CustomButton
              disable={!isValid}
              title="Sign Up"
              onPress={() => {
                signUpfromEmailandPass(email, password, payload);
              }}
              style={styles.signUpBtn}
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
  errorMessage: {top: -5, color: 'red'},
});
