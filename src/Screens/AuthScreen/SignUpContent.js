import React, {useRef, useState} from 'react';
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
import PhoneInput from 'react-native-phone-number-input';

// import auth from '@react-native-firebase/auth';

const SignUpContent = ({navigation, setLoading, loading}) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const phoneInput = useRef(null);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [formattedValue, setFormattedValue] = useState('');

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
      onSubmit={values => {
        console.log(values, 'value');
        setLoading(true);
        const payload = {
          firstName: values?.firstName,
          lastName: values?.lastName,
          mobile: values?.mobile,
          email: values?.email,
        };
        signUpfromEmailandPass(values.email, values.password, payload)
          .then(res => {
            console.log(res, 'res in sucess');
            setLoading(false);
          })
          .catch(err => {
            console.log(err, 'error in creating account');
            setLoading(false);
          });
      }}
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
            style={styles.textPasswordInput}
            placeholder="Enter your password"
            // value={'password'}
            // onChangeText={text => setPassword(text)}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            // secureTextEntry
          />
          {errors.password && touched.password && (
            <Text style={styles.errorMessage}>{errors.password}</Text>
          )}
          <Text>Confirm Password</Text>
          <CustomTextInput
            style={styles.textPasswordInput}
            placeholder="Enter your confirm password"
            // value={'confirmpassword'}
            // onChangeText={text => setConfirmPassword(text)}
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            value={values.confirmPassword}
            // secureTextEntry
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <Text style={styles.errorMessage}>{errors.confirmPassword}</Text>
          )}
          <Text>Mobile</Text>
          <PhoneInput
            ref={phoneInput}
            defaultValue={values.mobile}
            defaultCode="IN"
            layout="first"
            onChangeText={handleChange('mobile')}
            containerStyle={styles.containerStyle}
            textInputStyle={styles.textInputStyle}
            textContainerStyle={styles.textContainerStyle}
            onChangeFormattedText={text => {
              setFormattedValue(text);
            }}
            // onChangeText={handleChange('lastName')}
            onBlur={handleBlur('mobile')}
          />
          {/* <CustomTextInput
            style={styles.textInput}
            placeholder="Enter your mobile number"
            // value={'mobile'}
            // onChangeText={text => setMobile(text)}
            onChangeText={handleChange('mobile')}
            onBlur={handleBlur('mobile')}
            value={values.mobile}
            // secureTextEntry
          /> */}
          {errors.mobile && touched.mobile && (
            <Text style={styles.errorMessage}>{errors.mobile}</Text>
          )}
          <View style={styles.signUpBtnView}>
            <CustomButton
              // disable={!isValid}
              title="Sign Up"
              onPress={handleSubmit}
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
    textTransform: 'lowercase',
  },
  textPasswordInput: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#dac892',
  },
  contentView: {paddingHorizontal: 10, marginTop: 30},
  errorMessage: {top: -5, color: 'red'},
  textContainerStyle: {backgroundColor: 'white', left: -10},
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
    left: -10,
  },
});
