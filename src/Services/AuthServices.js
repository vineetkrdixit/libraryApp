import auth, {firebase} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AccessToken, LoginManager, Profile} from 'react-native-fbsdk-next';
import firestore from '@react-native-firebase/firestore';

export const signUpfromEmailandPass = async (
  useremail,
  userpassword,
  payload,
) => {
  const signedInUserData = await auth()
    .createUserWithEmailAndPassword(useremail, userpassword)
    .then(async res => {
      const userId = res?.user?.uid;
      payload.id = userId;
      payload.seen_walkthrough = false;
      createUserData(userId, payload);
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
  return signedInUserData;
};

export const LoginWithGoogle = async () => {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  // Get the users ID token
  const {idToken, user} = await GoogleSignin.signIn();
  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  await auth()
    .signInWithCredential(googleCredential)
    .then(res => {
      const userId = res?.user?.uid;
      const payload = {
        firstName: user.givenName,
        lastName: user.familyName,
        email: user.email,
        user_Avtar: user.photo,
        id: userId,
        seen_walkthrough: false,
      };
      createUserData(userId, payload);
    });
};

export const LoginWithFacebook = async () => {
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

  // Sign-in the user with the credential
  await auth()
    .signInWithCredential(facebookCredential)
    .then(async res => {
      Profile.getCurrentProfile().then(async currentProfile => {
        if (currentProfile) {
          const userId = res?.user?.uid;
          const userEmail = res?.user?.email;
          const payload = {
            firstName: currentProfile.firstName,
            lastName: currentProfile.lastName,
            email: userEmail,
            user_Avtar: currentProfile.imageURL,
            id: userId,
            seen_walkthrough: false,
          };
          createUserData(userId, payload);
        }
      });
    });
};

export const loginWithMobile = async (
  formattedValue,
  setConfirm,
  confirm,
  navigation,
) => {
  const confirmation = await auth().signInWithPhoneNumber(formattedValue);
  setTimeout(() => {
    if (confirmation) {
      navigation.navigate('VerifyOtpScreen', {
        confirm: confirmation,
      });
    }
  }, 1000);
};

export const createUserData = async (userId, payload) => {
  try {
    await firestore().collection('Users').doc(userId).set(payload);
    console.log('data added succesfully');
  } catch (e) {
    console.log(e, 'error in creating user detail');
  }
};
export const Logout = async () => {
  return await firebase.auth().signOut();
};
export const LoginUser = async (email, password) => {
  try {
    const loginUserData = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    // Successful login, you can navigate to the next screen or perform any other action
    // For example, using react-navigation:
    // navigation.navigate('Home');
    return loginUserData;
  } catch (error) {
    console.error('Error signing in:', error.message);
  }
};
