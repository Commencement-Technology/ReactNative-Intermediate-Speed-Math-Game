import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {WelcomeScreen} from '../screens';

export type AuthStackNavigatorParams = {
  WelcomeScreen: undefined;
};

const AuthStack = createStackNavigator<AuthStackNavigatorParams>();

function AuthNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{
          headerShown: false,
        }}
      />
    </AuthStack.Navigator>
  );
}

export default AuthNavigator;
