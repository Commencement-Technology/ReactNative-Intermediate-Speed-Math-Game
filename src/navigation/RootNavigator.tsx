import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {useSelector} from 'react-redux';
import {RootState} from '../redux/reducers/RootReducer';
import {AuthNavigator, HomeNavigator} from './index';

export type RootStackNavigatorParams = {
  HomeStack: {userName: string} | undefined;
  AuthStack: {userName: string} | undefined;
};

const RootStack = createStackNavigator<RootStackNavigatorParams>();

function RootNavigator() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user?.isAuthenticated,
  );
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          cardOverlayEnabled: true,
          cardStyle: {backgroundColor: 'white'},
          animationEnabled: false,
          headerStyle: {
            elevation: 0,
            shadowColor: 'transparent',
          },
          headerTransparent: false,
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
          headerShown: false,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 23,
          },
        }}
        initialRouteName={isAuthenticated ?  "HomeStack" :"AuthStack"}
        >
        {isAuthenticated ? (
          //if user is already logged in directly send him to home stack screens
          <RootStack.Screen
            options={{headerLeft: () => <></>, headerShown: false}}
            name="HomeStack"
            children={HomeNavigator}
          />
        ) : (
          <RootStack.Screen name="AuthStack" children={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
