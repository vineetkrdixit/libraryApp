import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import CustomTextInput from '../../Components/CustomTextInput';
import CustomButton from '../../Components/CustomButton';
import {AppImages} from '../../Assets/images';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';

const LoginContent = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');

  console.log(userName, password);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '576432052291-mk8a11vgl6fr5lkhgqqlgbo2bliha4ad.apps.googleusercontent.com',
    });
  });

  const LoginWithGoogle = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  };

  const LoginWithFacebook = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccessToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    console.log(facebookCredential, 'facebookCredential');

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  };

  return (
    <View style={styles.contentView}>
      <Text>Username:</Text>
      <CustomTextInput
        placeholder="Enter your username"
        value={'username'}
        style={styles.textInput}
        onChangeText={text => setUsername(text)}
      />

      <Text>Password:</Text>
      <CustomTextInput
        placeholder="Enter your password"
        value={'password'}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        style={styles.textInput}
      />
      <View style={styles.itemEnd}>
        <Text style={styles.forgetPassword}>Forget password</Text>
      </View>
      <View style={styles.loginBtnView}>
        <CustomButton title="Log In" onPress={{}} style={styles.loginBtn} />
      </View>
      <Text style={styles.orView}>OR</Text>
      <View style={styles.socialView}>
        <TouchableOpacity onPress={() => LoginWithGoogle()}>
          <Image source={AppImages.googleIcon} style={styles.mobileIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={AppImages.mobileIcon} style={styles.mobileIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => LoginWithFacebook()}>
          <Image source={AppImages.facebookIcon} style={styles.iconHeight} />
        </TouchableOpacity>
      </View>
    </View>
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
});
