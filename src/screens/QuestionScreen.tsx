import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {StackNavigationProp} from '@react-navigation/stack';
import {colors, regex} from '../util/constants';

import axios from 'axios';
import {LanguageSelector, TextInputComponent} from '../components/reusable';
import {ApiResponseType, QuestionAnsData, TextFieldType} from '../config/types';
import {useAppDispatch} from '../redux/store';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/reducers/RootReducer';
import {
  SetAnswerActionCreator,
  SetQueAnsArrayActionCreator,
} from '../redux/actions';
import {HomeStackNavigatorParams} from '../navigation/HomeNavigator';
import {RootStackNavigatorParams} from '../navigation/RootNavigator';
import {useTranslation} from 'react-i18next';

const WelcomeScreen = () => {
  //navigation state and route state
  const navigation: StackNavigationProp<
    HomeStackNavigatorParams,
    'QuestionScreen'
  > = useNavigation();

  const authNavigation: StackNavigationProp<
    RootStackNavigatorParams,
    'AuthStack'
  > = useNavigation();

  //states for store
  const dispatch = useAppDispatch();
  const userName = useSelector((state: RootState) => state.user?.userName);
  const questionAnsArray = useSelector(
    (state: RootState) => state.questionAnswer,
  );

  //local state management
  const [loading, setLoading] = useState<'loading' | 'success' | 'error' | ''>(
    '',
  );
  const cancelTokenSource = axios.CancelToken.source();
  const [answer, setAnswer] = useState<TextFieldType>({
    value: '',
    error: false,
    errorMessage: '',
  });
  const [currentIndexOfQuestion, setCurrentIndexOfQuestion] =
    useState<number>(0);

  //state for countdown timer
  const [secondCounter, setSecondCounter] = useState(60);
  const [timer, setTimer] = useState<NodeJS.Timer | null>(null);
  const [timerStarted, setTimerStarted] = useState(false);

  //states for visibility and disability
  const [isDisable, setIsDisable] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  //translation state
  const {t} = useTranslation();

  const resetState = () => {
    setTimer(null);
    if (timer) clearInterval(timer);
    setTimerStarted(false);
    setCurrentIndexOfQuestion(0);
    setAnswer({value: '', error: false, errorMessage: ''});
    setIsDisable(false);
    setLoading('');
    setSecondCounter(60);
    setIsVisible(true);
  };

  const timerFuntionality = () => {
    if (secondCounter === 0) {
      Alert.alert('Game Over!', 'Tap Yes if you wanna see the results!', [
        {
          text: 'YES',
          onPress: () => {
            navigation.navigate('ResultScreen');
            resetState();
          },
        },
      ]);
    } else {
      if (timerStarted) {
        const timer =
          secondCounter > 0 &&
          setInterval(() => setSecondCounter(secondCounter - 1), 1000);
        if (timer) setTimer(timer);
      }
    }
  };

  useEffect(() => {
    timerFuntionality();

    return () => {
      // Cleanup function
      if (timer) clearInterval(timer); //clear the timer
      cancelTokenSource.cancel(); //cancel api call request
    };
  }, [timerStarted, secondCounter]);

  //take api result and store it into store after transforming
  const storeIntoStore = (apiResult: ApiResponseType[]) => {
    let arr: QuestionAnsData[] = [];
    apiResult.forEach(eachQueAns => {
      arr.push({
        questionId: eachQueAns.id,
        question: eachQueAns.question,
        originalAnswer: eachQueAns.answer,
        answerOfStudent: '',
      });
    });
    dispatch(SetQueAnsArrayActionCreator(arr));
  };

  //hit api and update states accordingly
  const onGameStart = () => {
    setLoading('loading');
    setIsDisable(true);
    axios
      .get('https://mocki.io/v1/1489137c-27aa-4421-9b1b-1cce62ffcb23', {
        cancelToken: cancelTokenSource.token,
      })
      .then(response => {
        console.log('response', response.data);
        storeIntoStore(response.data.game_questions);
        setLoading('success');
        setTimerStarted(true);
        setIsVisible(false);
      })
      .catch(error => {
        setLoading('error');
      });
  };
  const onChangeAnswer = (text: string) => {
    setAnswer({
      ...answer,
      value: text,
    });
  };

  const showOrHideErrors = () => {
    if (!answer.value) {
      if (answer.value === '') {
        //empty answer validation
        setAnswer({...answer, error: true, errorMessage:t('question:answerRequiredText') });
      } else setAnswer({...answer, error: false, errorMessage: ''});
    } else {
      if (!regex.onlyNumbersRegex.test(answer.value)) {
        //invalid answer validation
        setAnswer({
          ...answer,
          error: true,
          errorMessage:t('question:invalidAnswerValidationText') ,
        });
      } else setAnswer({...answer, error: false, errorMessage: ''});
    }
  };

  //return true if error present
  const isError = () => {
    if (answer.value === '' || !regex.onlyNumbersRegex.test(answer.value))
      return true;
    else return false;
  };

  const onQuestionConfirm = (idOfCurrentQuestion: number) => {
    if (isError()) {
      //if error, show them
      showOrHideErrors();
    } else {
      //if no error, store answer into store
      dispatch(
        SetAnswerActionCreator({
          id: idOfCurrentQuestion,
          answerOfStudent: answer.value,
        }),
      );
      if (currentIndexOfQuestion === questionAnsArray.length - 1) {
        //if last question
        setAnswer({value: '', error: false, errorMessage: ''});
        setCurrentIndexOfQuestion(0);
        setIsDisable(false);
        if (userName) navigation.navigate('ResultScreen');
        else {
          authNavigation.reset({
            index: 0,
            routes: [
              {
                name: 'AuthStack',
              },
            ],
          });
        }
      } else {
        //not a last question
        setCurrentIndexOfQuestion(currentIndexOfQuestion + 1);
        setAnswer({value: '', error: false, errorMessage: ''});
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        style={styles.container}
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={styles.subContainer}>
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

          {isVisible ? (
            <TouchableOpacity
              disabled={isDisable}
              activeOpacity={0.7}
              onPress={onGameStart}
              style={[styles.buttonContainer, {opacity: isDisable ? 0.5 : 1}]}>
              <Text style={styles.buttonText}>
                {t('question:startGameText')}
              </Text>
            </TouchableOpacity>
          ) : null}

          <View style={styles.stopwatchContainer}>
            <Text
              style={{color: colors.white, fontSize: 20, fontWeight: 'bold'}}>
              {secondCounter}
            </Text>
          </View>
          <View
            style={[
              styles.questionAnsContainer,
              {
                justifyContent: loading !== 'success' ? 'center' : 'flex-start',
                alignItems: loading !== 'success' ? 'center' : 'flex-start',
              },
            ]}>
            {loading === 'success' && questionAnsArray.length !== 0 ? (
              <>
                <View style={styles.questionContainer}>
                  <Text style={styles.questionNumberText}>{`Question ${
                    currentIndexOfQuestion + 1
                  }`}</Text>
                  <Text style={styles.questionText}>
                    {questionAnsArray[currentIndexOfQuestion].question}
                  </Text>
                </View>
                <TextInputComponent
                  placeholder="Answer..."
                  value={answer.value}
                  onChangeText={onChangeAnswer}
                  onEndEditing={showOrHideErrors}
                  borderColor={answer.error ? 'red' : colors.black}
                  keyboardType="numeric"
                />
                {answer.error ? (
                  <Text style={styles.errorText}>{answer.errorMessage}</Text>
                ) : null}
                <View style={{width: '100%', alignItems: 'center'}}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      onQuestionConfirm(
                        questionAnsArray[currentIndexOfQuestion].questionId,
                      );
                    }}
                    style={styles.confirmButtonContainer}>
                    <Text style={styles.buttonText}>
                      {t('question:confirmButtonText')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : loading === 'error' ? (
              <Text style={{color: 'white', fontSize: 20}}>
                Error in getting data
              </Text>
            ) : loading === 'loading' ? (
              <ActivityIndicator size="large" color={colors.lightpurple} />
            ) : null}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.grey,
  },
  subContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: colors.darkpurple,
    width: '80%',
    paddingVertical: 18,
  },
  confirmButtonContainer: {
    backgroundColor: colors.darkpurple,
    width: '50%',
    paddingVertical: 13,
  },
  buttonText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  stopwatchContainer: {
    backgroundColor: colors.lightpurple,
    height: 70,
    width: 70,
    borderRadius: 40,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionAnsContainer: {
    height: 300,
    backgroundColor: colors.white,
    borderWidth: 0.3,
    width: '80%',
    marginTop: 30,
    padding: 20,
  },
  questionContainer: {
    width: '100%',
    paddingBottom: 5,
    minHeight: 100,
    marginBottom: 15,
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
