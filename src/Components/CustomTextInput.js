import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const CustomTextInput = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  style,
}) => {
  return (
    <TextInput
      style={{...styles.input, ...style}}
      placeholder={placeholder}
      //   value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 15,
  },
});

export default CustomTextInput;
