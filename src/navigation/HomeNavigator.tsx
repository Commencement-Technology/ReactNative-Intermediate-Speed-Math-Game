import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {QuestionScreen, ResultScreen} from '../screens';
import LogOutIcon from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native';
import {useAppDispatch} from '../redux/store';
import {
  ResetQuestionsActionCreator,
  ResetUserActionCreator,
  SetIsAuthenticatedActionCreator,
} from '../redux/actions';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/reducers/RootReducer';
import {colors} from '../util/constants';

export type HomeStackNavigatorParams = {
  QuestionScreen: undefined;
  ResultScreen: undefined;
};

const HomeStack = createStackNavigator<HomeStackNavigatorParams>();

function HomeNavigator() {
  //dispatch and navigation states
  const dispatch = useAppDispatch();

  //state for store
  const userName = useSelector((state: RootState) => state.user?.userName);

  //log out the user by clearing the store
  const onLogOut = () => {
    dispatch(SetIsAuthenticatedActionCreator(false));
    dispatch(ResetUserActionCreator());
    dispatch(ResetQuestionsActionCreator());
  };

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTintColor: 'black',
        cardOverlayEnabled: true,
        cardStyle: {backgroundColor: 'white'},
        animationEnabled: false,
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent',
        },
        title: '',
        headerShown: true,
        headerTitleStyle: {
          fontSize: 20,
        },
      }}>
      <HomeStack.Screen
        name="QuestionScreen"
        component={QuestionScreen}
        options={({route}) => ({
          //add the username as title to question screen
          title: `Hey ${userName} !`,
          headerLeft: () => <></>,
          headerRight: () => (
            <TouchableOpacity onPress={onLogOut}>
              <LogOutIcon
                name="logout"
                style={{marginRight: 30}}
                size={22}
                color={colors.black}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <HomeStack.Screen
        name="ResultScreen"
        component={ResultScreen}
        options={{
          title: 'Result of game',
          headerLeft: () => <></>,
        }}
      />
    </HomeStack.Navigator>
  );
}

export default HomeNavigator;
