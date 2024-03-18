import React, {Component, useEffect, useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {Logout} from '../../Services/AuthServices';
import AppIntroSlider from 'react-native-app-intro-slider';
import {IntroSlides} from '../../Utils/constants';
import {AppImages} from '../../Assets/images';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../../Components/CustomButton';
import * as Animatable from 'react-native-animatable';
import useLibraryStore from '../../Zustand/ZustandStore';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const AnimationBtn = Animatable.createAnimatableComponent(TouchableOpacity);
const HomeScreen = () => {
  const [introCompleted, setIntroCompleted] = useState(false);
  // const [loadHomeScreen, setLoadHomeScreen] = useState(false);
  const uid = auth().currentUser.uid;
  const store = useLibraryStore();
  const [seen_Walkthrough, setSeen_Walkthrough] = useState(
    store.userInfo?.seen_walkthrough,
  );
  const renderIntro = ({item, index}) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  const goToHome = async () => {
    try {
      await firestore().collection('Users').doc(uid).update({
        seen_walkthrough: true,
      });
      setSeen_Walkthrough(true);
    } catch (error) {
      console.error('Error updating seen_Walktrough:', error);
    }
  };

  return seen_Walkthrough ? (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <Text style={{fontSize: 23, color: 'white'}}>Home screen</Text>
      <TouchableOpacity
        onPress={() => {
          Logout();
        }}>
        <Text style={{color: 'white'}}>Logout</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <AppIntroSlider
        data={IntroSlides}
        renderItem={renderIntro}
        doneLabel="Next"
        onDone={() => setIntroCompleted(true)}
      />
      {introCompleted && (
        <>
          <Image
            source={AppImages.introThirdImage}
            style={{height: '100%', width: '100%'}}
          />
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.7)']}
            style={styles.linearGradient}>
            <View style={styles.onBoardTextView}>
              <Animatable.Text
                style={styles.onBoardText}
                animation={'slideInUp'}>
                {'Get \nYour Library  \nOn Your Phone'}
              </Animatable.Text>
              <Animatable.Text
                style={styles.searchText}
                animation={'slideInUp'}>
                {
                  'Search your loved author or genure \n and download the book as PDF  '
                }
              </Animatable.Text>
              <AnimationBtn
                onPress={goToHome}
                style={styles.loginBtn}
                animation={'slideInUp'}>
                <Text style={styles.getStarted}>Get Started</Text>
              </AnimationBtn>
            </View>
          </LinearGradient>
        </>
      )}
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  image: {
    height: 400,
    width: 400,
  },
  loginBtn: {
    backgroundColor: '#dac829',
    width: '100%',
    borderRadius: 20,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  linearGradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  onBoardTextView: {
    position: 'absolute',
    width: '90%',
    bottom: 30,
    marginLeft: 15,
  },
  onBoardText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 45,
    paddingVertical: 10,
  },
  searchText: {color: 'white', fontWeight: '500', fontSize: 18},
  getStarted: {
    color: 'white',
    fontWeight: '900',
    fontSize: 18,
  },
});
