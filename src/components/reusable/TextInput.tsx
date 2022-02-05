import React from 'react';
import {KeyboardType, Platform, StyleSheet, TextInput, TextInputProps} from 'react-native';
import { colors } from '../../util/constants';

type CustomTextInputProps = {
  onChangeText: (arg: string) => void;
  value: string;
  placeholder: string;
  onEndEditing:()=>void
  borderColor:string
  keyboardType?:KeyboardType
};

type MainTextInputProps=CustomTextInputProps & TextInputProps

const TextInputComponent = ({
  onChangeText,
  value,
  placeholder,
  onEndEditing,
  borderColor,
  keyboardType="default"
}: MainTextInputProps) => {
  return (
    <TextInput
      style={[styles.textInput,{borderColor:borderColor,marginBottom:borderColor ==="red" ?0:20}]}
      onChangeText={(text)=>onChangeText(text)}
      value={value}
      placeholder={placeholder}
      placeholderTextColor={colors.black}
      onEndEditing={onEndEditing}
      keyboardType={keyboardType}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    paddingVertical:Platform.OS==="android"? 10:15,
    paddingHorizontal: 15,
    borderWidth:1,
    width:"100%",
    fontSize:16
  },
});

export default TextInputComponent;
