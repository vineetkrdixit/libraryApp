import React, {useRef, useState} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';

const CustomOTPInput = ({setCode}) => {
  const numberOfInputs = 6; // Change this based on your OTP length
  const inputRefs = Array(numberOfInputs)
    .fill(0)
    .map((_, index) => useRef(null));
  const [otp, setOtp] = useState(Array(numberOfInputs).fill(''));

  const handleInputChange = (index, value) => {
    // Check if backspace is pressed
    if (value === '' && index > 0) {
      // Move focus to the previous input field on backspace
      inputRefs[index - 1].current.focus();
    }

    // Update the OTP array
    const newOtp = [...otp];
    newOtp[index] = value;
    setCode(newOtp.join(''), 10);
    setOtp(newOtp);

    // Move focus to the next input field if a digit is entered or if the current field is empty
    if ((value && index < numberOfInputs - 1) || (value === '' && index > 0)) {
      inputRefs[index + 1].current.focus();
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={inputRefs[index]}
          style={styles.input}
          keyboardType="numeric"
          maxLength={1}
          value={digit}
          onChangeText={value => handleInputChange(index, value)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  input: {
    height: 40,
    width: 40,
    borderBottomWidth: 1,
    textAlign: 'center',
  },
});

export default CustomOTPInput;
