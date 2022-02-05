import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Platform, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {colors} from '../../util/constants';

const LanguageSwitcher = () => {
  const {i18n} = useTranslation();
  const [language, setLanguage] = React.useState<string>('');
  const onLanguageSwitch = (language: string) => {
    setLanguage(language);
    //here whole app language is changed.
    i18n.changeLanguage(language);
  };

  useEffect(() => {
    const getDefaultLanguage = async () => {
      const defaultLanguage = await AsyncStorage.getItem('user-language');
      if (defaultLanguage) {
        setLanguage(defaultLanguage);
      }
    };
    getDefaultLanguage();
  }, []);

  return (
    <View
      style={{
        width: '60%',
        backgroundColor: colors.white,
        marginTop: 20,
        paddingVertical:Platform.OS==="ios"?  20:3,
        paddingLeft: 20,
        borderWidth:1,
        borderColor:colors.darkpurple,
        borderRadius:15
      }}>
      <RNPickerSelect
        onValueChange={value => onLanguageSwitch(value)}
        items={[
          {label: 'English', value: 'en'},
          {label: 'Hindi', value: 'hn'},
          {label: 'Marathi', value: 'mar'},
        ]}
      />
    </View>
  );
};

export default LanguageSwitcher;
