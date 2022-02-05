import React, {ReactElement, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  Alert,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {StackNavigationProp} from '@react-navigation/stack';
import {colors} from '../util/constants';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/reducers/RootReducer';
import {BackHandler} from 'react-native';
import {useAppDispatch} from '../redux/store';
import {ResetQuestionsActionCreator} from '../redux/actions';
import {HomeStackNavigatorParams} from '../navigation/HomeNavigator';

import CrossIcon from 'react-native-vector-icons/Entypo';
import SkipIcon from 'react-native-vector-icons/AntDesign';
import {QuestionAnsData} from '../config/types';
import {LanguageSelector} from '../components/reusable';
import {useTranslation} from 'react-i18next';

const ResultScreen = () => {
  //navigation state
  const navigation: StackNavigationProp<
    HomeStackNavigatorParams,
    'ResultScreen'
  > = useNavigation();

  //state for store and dispatch
  const dispatch = useAppDispatch();
  const questionAnsArray = useSelector(
    (state: RootState) => state.questionAnswer,
  );

  //translation state
  const {t} = useTranslation();

  useEffect(() => {
    //add back button click event listener
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      //remove back button click event listener
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  //on android back button click
  function handleBackButtonClick(): boolean {
    Alert.alert('New Game?', 'Tap Yes if you wanna play the game again!', [
      {
        text: 'NO',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'YES',
        onPress: () => {
          onHomeButtonPress();
        },
      },
    ]);
    return true;
  }

  //return wrong answers count
  const getWrongAnswerCount = (): number => {
    let length = questionAnsArray.filter(
      eachQueAns =>
        eachQueAns.answerOfStudent !== '' &&
        eachQueAns.answerOfStudent !== eachQueAns.originalAnswer,
    ).length;
    return length;
  };

  //return skipped answers count
  const getSkippedAnswersCount = (): number => {
    let length = questionAnsArray.filter(
      eachQueAns => eachQueAns.answerOfStudent === '',
    ).length;
    return length;
  };

  //return correct answer count
  const getScore = (): number => {
    let length = questionAnsArray.filter(
      eachQuesAns => eachQuesAns.answerOfStudent === eachQuesAns.originalAnswer,
    ).length;
    return length;
  };

  //return to question screen functionality
  const onHomeButtonPress = () => {
    dispatch(ResetQuestionsActionCreator());
    navigation.navigate('QuestionScreen');
  };

  const eachAnsInfo = (item: QuestionAnsData, index: number): ReactElement => {
    return (
      <View
        style={[
          styles.answerSummaryContainer,
          {
            borderColor:
              item.answerOfStudent === ''
                ? colors.blue
                : item.answerOfStudent === item.originalAnswer
                ? colors.success
                : colors.error,
          },
        ]}>
        <View
          style={[
            {
              backgroundColor:
                item.answerOfStudent === ''
                  ? colors.blue
                  : item.answerOfStudent === item.originalAnswer
                  ? colors.success
                  : colors.error,
            },
            styles.answerStatusContainer,
          ]}>
          <Text style={styles.answerStatusText}>
            {item.answerOfStudent === ''
              ? t('result:skippedAnswerText')
              : item.answerOfStudent === item.originalAnswer
              ? t('result:correctAnswerText')
              : t('result:wrongAnswerText')}
          </Text>
        </View>
        <View style={styles.questionContainer}>
          <Text style={styles.questionNumberText}>{`${t(
            'result:questionNumberText',
          )} ${index + 1}`}</Text>
          <Text style={styles.questionText}>{item.question}</Text>
        </View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: colors.black,
            marginBottom: 10,
          }}>{`${t('result:correctAnswerText')} -  ${
          item.originalAnswer
        }`}</Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: colors.black,
          }}>{`${t('result:yourAnswerText')} - ${
          item.answerOfStudent === ''
            ? t('result:skippedText')
            : item.answerOfStudent
        } `}</Text>
      </View>
    );
  };

  return (
    <>
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

        <View style={styles.yourScoreContainer}>
          <Text
            style={[styles.yourScoreText, {color: colors.lightpurple}]}>{`${t(
            'result:yourScoreText',
          )} - ${getScore()} / ${questionAnsArray.length}`}</Text>
          <View style={styles.answerInfoContainer}>
            <CrossIcon name="cross" size={25} color={colors.error} />
            <Text
              style={[
                styles.yourScoreText,
                {marginLeft: 10, color: colors.error},
              ]}>
              {`${t('result:wrongAnswersText')} - ${getWrongAnswerCount()}`}
            </Text>
          </View>
          <View style={styles.answerInfoContainer}>
            <SkipIcon name="minuscircleo" size={16} color={colors.blue} />
            <Text
              style={[
                styles.yourScoreText,
                {marginLeft: 10, color: colors.blue},
              ]}>
              {`${t(
                'result:skippedAnswersText',
              )} - ${getSkippedAnswersCount()}`}
            </Text>
          </View>
        </View>
        <FlatList
          style={{width: '80%'}}
          showsVerticalScrollIndicator={false}
          data={questionAnsArray}
          renderItem={({item, index}) => eachAnsInfo(item, index)}
        />
      </View>
      <View style={styles.backToHomeButtonText}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onHomeButtonPress}
          style={styles.buttonContainer}>
          <Text style={styles.buttonText}>
            {t('result:backToHomeButtonText')}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.grey,
    //paddingTop: Platform.OS === 'android' ? 30 : 70,
  },
  subContainer: {
    flex: 1,
    width: '100%',
  },
  answerSummaryContainer: {
    width: '100%',
    height: 350,
    backgroundColor: colors.white,
    borderWidth: 1,
    marginTop: 30,
    padding: 20,
    borderRadius: 15,
  },
  answerStatusContainer: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  answerStatusText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  },
  yourScoreContainer: {
    backgroundColor: colors.white,
    width: '80%',
    height: 150,
    paddingTop: 8,
    alignItems: 'center',
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 15,
  },
  yourScoreText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  answerInfoContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  questionContainer: {
    width: '100%',
    paddingBottom: 5,
    minHeight: 100,
    marginBottom: 10,
    marginTop: 20,
  },
  questionNumberText: {
    color: colors.black,
    fontSize: 15,
    marginBottom: 8,
  },
  questionText: {
    color: colors.lightpurple,
    fontSize: 25,
    fontWeight: 'bold',
  },
  buttonContainer: {
    backgroundColor: colors.darkpurple,
    paddingVertical: 18,
    width: '70%',
  },
  buttonText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  backToHomeButtonText: {
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 10,
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

export default ResultScreen;
