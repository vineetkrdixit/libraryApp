import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Screens/AuthScreen/Login';
// import {NavigationContainer} from '@react-navigation/native';
import PhoneLoginScreen from '../Screens/AuthScreen/PhoneLoginScreen';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Loader from '../Components/Loader';
import AdminHome from '../Screens/Admin/AdminHome';
import AdminAddBook from '../Screens/Admin/AdminAddBook';
import HomeScreen from '../Screens/User/Homescreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {runOnJS} from 'react-native-reanimated';
import useLibraryStore from '../Zustand/ZustandStore';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const AdminDrawer = () => {
  // 'worklet';
  // runOnJS()();
  return (
    <Drawer.Navigator
      // useLegacyImplementation={true}
      initialRouteName="AdminHomes">
      <Drawer.Screen name="AdminHomes" component={AdminHome} />
      <Drawer.Screen name="AdminAddBooks" component={AdminAddBook} />
    </Drawer.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen
        name="login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PhoneLoginScreen"
        component={PhoneLoginScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const AdminStack = () => {
  return (
    <Stack.Navigator initialRouteName="AdminHome">
      <Stack.Screen
        name="AdminHome"
        component={AdminDrawer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AdminAddBook"
        component={AdminAddBook}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const UserStack = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    const signInUser = auth().onAuthStateChanged(async user => {
      console.log('auth state changed line number 65');
      if (user) {
        console.log('auth state changed line number 67');
        setLoading(true);
        try {
          const userData = await firestore()
            .collection('Users')
            .doc(user?.uid)
            .get();
          useLibraryStore.getState().setUserInfo(userData?._data);
          console.log('auth state changed line number 77');
          setIsAuthenticated(true);
          if (userData?.data()?.isAdmin) {
            setAdmin(true);
          }
        } catch (error) {
          console.log(error, 'error in authentication ');
          setIsAuthenticated(false);
        }
      } else {
        //logged out or unauthenticated user will be sent to Auth screen
        setLoading(false);
        setAdmin(false);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });
    () => {
      return signInUser();
    };
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      {isAuthenticated ? admin ? <AdminStack /> : <UserStack /> : <AuthStack />}
    </>
  );
};

export default AppNavigator;
