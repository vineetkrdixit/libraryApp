import React, {Component, useEffect, useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import CustomTextInput from '../../Components/CustomTextInput';
import CustomButton from '../../Components/CustomButton';
import {AppImages} from '../../Assets/images';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {
  LoginButton,
  AccessToken,
  LoginManager,
  Profile,
} from 'react-native-fbsdk-next';

const LoginContent = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '576432052291-mk8a11vgl6fr5lkhgqqlgbo2bliha4ad.apps.googleusercontent.com',
    });
  });

  const CreateUser = (email, password = 'password') => {
    auth()
      .createUserWithEmailAndPassword(`${email}`, `${password}`)
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

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      // setState({user: null}); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{paddingHorizontal: 10, marginTop: 50}}>
      <Text>Username:</Text>
      <CustomTextInput
        placeholder="Enter your username"
        value={'username'}
        style={{
          borderTopWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          borderColor: '#dac892',
        }}
        onChangeText={text => setUsername(text)}
      />

      <Text>Password:</Text>
      <CustomTextInput
        placeholder="Enter your password"
        value={'password'}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        style={{
          borderTopWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          borderColor: '#dac892',
        }}
      />
      <View style={{alignItems: 'flex-end'}}>
        <Text style={{textDecorationLine: 'underline', color: '#dac829'}}>
          Forget password
        </Text>
      </View>
      <View style={{marginTop: 35, alignItems: 'center'}}>
        <CustomButton
          title="Log In"
          onPress={{}}
          style={{backgroundColor: '#dac829', width: '50%', borderRadius: 20}}
        />
      </View>
      <Text style={{textAlign: 'center', marginVertical: 20}}>OR</Text>
      <View
        style={{flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
        <TouchableOpacity onPress={() => LoginWithGoogle()}>
          <Image
            source={AppImages.googleIcon}
            style={{height: 30, width: 30, marginRight: 10}}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={AppImages.mobileIcon}
            style={{height: 30, width: 30, marginRight: 10}}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => LoginWithFacebook()}>
          <Image
            source={AppImages.facebookIcon}
            style={{height: 30, width: 30}}
          />
        </TouchableOpacity>
      </View>
      {/* <LoginButton
        onLoginFinished={(error, result) => {
          if (error) {
            console.log('login has error: ' + result.error);
          } else if (result.isCancelled) {
            console.log('login is cancelled.');
          } else {
            AccessToken.getCurrentAccessToken().then(data => {
              console.log(data, 'data2222');
              console.log(data.accessToken.toString());
            });
          }
        }}
        onLogoutFinished={() => console.log('logout.')}
      /> */}
      <TouchableOpacity onPress={signOut}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginContent;

const styles = StyleSheet.create({});
