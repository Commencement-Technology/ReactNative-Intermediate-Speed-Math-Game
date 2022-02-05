import {Dimensions} from 'react-native';

export const DESIRED_RATIO = '9:16';
export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const regex={
  emailRegex:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  onlyNumbersRegex:/^\d+$/,
  onlyAlphaNumericRegex:/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g
}

export const colors = {
  blue: '#383CC1',
  grey: '#ebebeb',
  white: '#fff',
  black: '#000',
  darkpurple: '#4c00a4',
  lightpurple: '#8300c4',
  success: '#4BB543',
  error: '#FF9494',
};
