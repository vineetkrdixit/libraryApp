import React, {Component, memo, useRef} from 'react';
import {Image, Text, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {SCREEN_WIDTH} from '../Utils/helper';
// import {bookData} from '../Utils/constants';

const Crousel = ({data}) => {
  console.log(data, 'bookdata');
  const crouselRef = useRef();
  const renderItem = ({item}) => {
    console.log(item, 'item-=-=');
    return (
      <View>
        <View
          style={{
            justifyContent: 'center',
            backgroundColor: 'white',
            height: 230,
            width: 130,
            alignItems: 'center',
            borderRadius: 10,
            marginBottom: 10,
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 0.4,

            elevation: 2,
          }}>
          <Image
            height={170}
            width={130}
            resizeMode="contain"
            style={{backgroundColor: 'pink'}}
          />
          <View style={{marginVertical: 10}}>
            <Text style={{color: 'black', fontSize: 18, fontWeight: '500'}}>
              {item?.bookName}
            </Text>
            <Text style={{color: 'black', fontSize: 13, fontWeight: '500'}}>
              {item?.authorName}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <Carousel
      ref={crouselRef}
      data={data}
      renderItem={renderItem}
      sliderWidth={SCREEN_WIDTH}
      itemWidth={170}
    />
  );
};

export default memo(Crousel);
