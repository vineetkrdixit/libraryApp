import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {Logout} from '../../Services/AuthServices';
import AppIntroSlider from 'react-native-app-intro-slider';
import {IntroSlides} from '../../Utils/constants';

const HomeScreen = () => {
  const renderIntro = ({item, index}) => {
    console.log(item, index, 'index');
    return (
      <View style={styles.slide}>
        {/* <Text style={styles.title}>{item.title}</Text> */}
        <Image source={item.image} style={styles.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  return (
    // <View style={{backgroundColor: 'yellow', flex: 1}}>
    //   <Text> User Home screen </Text>
    //   {/* <TouchableOpacity onPress={() => Logout()}>
    //     <Text> Logout </Text>
    //   </TouchableOpacity> */}

    // </View>
    <AppIntroSlider renderItem={renderIntro} data={IntroSlides} onDone={{}} />
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
    // height: '100%',
    // width: '100%',
  },
});
