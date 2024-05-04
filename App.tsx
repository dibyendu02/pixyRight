import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import SavedTexts from './screens/SavedTexts';
import Feature from './screens/Feature';
import ShareScreen from './screens/ShareScreen';
import Edit from './screens/Edit';
import Payment from './screens/Payment';
import {SectionsProvider} from './context/SectionsContext';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SectionsProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Edit" component={Edit} />
          <Stack.Screen name="Share" component={ShareScreen} />
          <Stack.Screen name="Feature" component={Feature} />
          <Stack.Screen name="SavedText" component={SavedTexts} />
          <Stack.Screen name="Payment" component={Payment} />
        </Stack.Navigator>
      </NavigationContainer>
    </SectionsProvider>
  );
};

export default App;
