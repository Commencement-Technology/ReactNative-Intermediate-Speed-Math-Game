import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableHighlight,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {StackNavigationProp} from '@react-navigation/stack';
import {colors, regex} from '../util/constants';
import {LanguageSelector, TextInputComponent} from '../components/reusable';
import {TextFieldType} from '../config/types';
import {useAppDispatch} from '../redux/store';
import {
  SetIsAuthenticatedActionCreator,
  SetUserNameActionCreator,
} from '../redux/actions';
import {RootStackNavigatorParams} from '../navigation/RootNavigator';
import {useTranslation} from 'react-i18next';

const WelcomeScreen = () => {
  //navigation and dispatch states
  const rootNavigation: StackNavigationProp<
    RootStackNavigatorParams,
    'HomeStack'
  > = useNavigation();
  const dispatch = useAppDispatch();

  //translation state
  const {t} = useTranslation();

  //text fields states
  const [email, setEmail] = useState({
    value: '',
    error: false,
    errorMessage: '',
  });
  const [password, setPassword] = useState<TextFieldType>({
    value: '',
    error: false,
    errorMessage: '',
  });

  //on input chnage Functions
  const onChangeEmail = (text: string) => {
    setEmail({
      ...email,
      value: text,
    });
  };
  const onChangePassword = (text: string) => {
    setPassword({
      ...password,
      value: text,
    });
  };

  //validate input fields functions
  const validateEmail = () => {
    if (!email.value) {
      if (email.value === '') {
        //email empty validation
        setEmail({...email, error: true, errorMessage:t('welcome:emailRequiredText')});
      } else setEmail({...email, error: false, errorMessage: ''});
    } else {
      if (!regex.emailRegex.test(email.value)) {
        //invalid email validation
        setEmail({...email, error: true, errorMessage:t('welcome:invalidEmailText')});
      } else setEmail({...email, error: false, errorMessage: ''});
    }
  };

  const validatePassword = () => {
    if (!password.value) {
      if (password.value === '') {
        //empty password validation
        setPassword({
          ...password,
          error: true,
          errorMessage:t('welcome:passwordRequiredText'),
        });
      } else
        setPassword({
          ...password,
          error: false,
          errorMessage: '',
        });
    } else {
      if (!regex.onlyAlphaNumericRegex.test(password.value)) {
        //alpha numeric validation
        setPassword({
          ...password,
          error: true,
          errorMessage:t('welcome:passwordValidationText'),
        });
      } else {
        setPassword({
          ...password,
          error: false,
          errorMessage: '',
        });
      }
    }
  };

  const validateForm = () => {
    validateEmail();
    validatePassword();
  };

  const onLoginPress = () => {
    validateForm();
    if (email.value === 'testuser@test.com' && password.value === 'Test@123') {
      let userName = email.value.substring(0, email.value.indexOf('@'));
      dispatch(SetIsAuthenticatedActionCreator(true));
      dispatch(SetUserNameActionCreator(userName));
      rootNavigation.reset({
        index: 0,
        routes: [
          {
            name: 'HomeStack',
            params: {
              userName,
            },
          },
        ],
      });
    }
  };
  const onEndEditing = (type: 'email' | 'password') => {
    if (type === 'email') validateEmail();
    else validatePassword();
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          marginBottom: 25,
          width: '60%',
        }}>
        <Text style={styles.chooseLanguageText}>
          {t('welcome:chooseLanguageText')}
        </Text>
        <View style={{marginLeft: 55}}>
          <LanguageSelector />
        </View>
      </View>
      <Text style={styles.welcomeText}>{t('welcome:welcomeBackText')}</Text>
      <View style={styles.textinputContainer}>
        {/*  Email Component */}
        <TextInputComponent
          placeholder="Email"
          value={email.value}
          onChangeText={onChangeEmail}
          onEndEditing={() => {
            onEndEditing('email');
          }}
          borderColor={email.error ? 'red' : colors.black}
        />
        {email.error ? (
          <Text style={styles.errorText}>{email.errorMessage}</Text>
        ) : null}

        {/*  Password Component */}
        <TextInputComponent
          placeholder="Password"
          value={password.value}
          onChangeText={onChangePassword}
          onEndEditing={() => {
            onEndEditing('password');
          }}
          borderColor={password.error ? 'red' : colors.black}
        />
        {password.error ? (
          <Text style={styles.errorText}>{password.errorMessage}</Text>
        ) : null}
      </View>

      {/* Login Button */}
      <TouchableHighlight onPress={onLoginPress} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>{t('welcome:loginText')}</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.grey,
    paddingTop: Platform.OS === 'android' ? 70 : 100,
  },
  subContainer: {
    flex: 1,
    minWidth: '100%',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.lightpurple,
  },
  textinputContainer: {
    width: '80%',
    marginTop: 30,
    marginBottom: 20,
  },
  buttonContainer: {
    backgroundColor: colors.darkpurple,
    width: '80%',
    paddingVertical: 18,
  },
  buttonText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
    marginTop: 4,
  },
  chooseLanguageText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
    marginRight: 20,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default WelcomeScreen;
