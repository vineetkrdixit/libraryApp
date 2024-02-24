import React, {Component, useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import CustomTextInput from '../../Components/CustomTextInput';
import CustomButton from '../../Components/CustomButton';
import {AppImages} from '../../Assets/images';

const SignUpContent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobile, setMobile] = useState('');

  return (
    <View style={{paddingHorizontal: 10, marginTop: 50}}>
      <Text>Email</Text>
      <CustomTextInput
        placeholder="Enter your email"
        value={'username'}
        style={{
          borderTopWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          borderColor: '#dac892',
        }}
        onChangeText={text => setEmail(text)}
      />

      <Text>Password</Text>
      <CustomTextInput
        style={{
          borderTopWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          borderColor: '#dac892',
        }}
        placeholder="Enter your password"
        value={'password'}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <Text>Confirm Password</Text>
      <CustomTextInput
        style={{
          borderTopWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          borderColor: '#dac892',
        }}
        placeholder="Enter your confirm password"
        value={'confirmpassword'}
        onChangeText={text => setConfirmPassword(text)}
        secureTextEntry
      />
      <Text>Mobile</Text>
      <CustomTextInput
        style={{
          borderTopWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          borderColor: '#dac892',
        }}
        placeholder="Enter your mobile number"
        value={'mobile'}
        onChangeText={text => setMobile(text)}
        secureTextEntry
      />
      <View style={{marginTop: 35, alignItems: 'center'}}>
        <CustomButton
          title="Sign Up"
          onPress={{}}
          style={{backgroundColor: '#dac829', width: '50%', borderRadius: 20}}
        />
      </View>
      <Text style={{textAlign: 'center', marginVertical: 20}}>OR</Text>
      <View
        style={{flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
        <TouchableOpacity>
          <Image
            source={AppImages.googleIcon}
            style={{height: 35, width: 35, marginRight: 10}}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={AppImages.mobileIcon}
            style={{height: 35, width: 35, marginRight: 10}}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={AppImages.facebookIcon}
            style={{height: 35, width: 35}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpContent;

const styles = StyleSheet.create({});
