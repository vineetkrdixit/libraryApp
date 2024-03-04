import React from 'react';
import {Image, Text, View} from 'react-native';
import {AppImages} from '../Assets/images';

const Loader = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(225,225, 225, 1)',
        position: 'absolute',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
      }}>
      <Image source={AppImages.loadingIcon} height={10} width={10} />
    </View>
  );
};

export default Loader;
