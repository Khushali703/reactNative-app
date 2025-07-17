import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../src/screens/homeScreen';
import TestScreen from '../src/screens/TestScreen';
import ResultScreen from '../src/screens/resultScreen';
import ReviewScreen from '../src/screens/ReviewScreen';
import ProgressScreen from '../src/screens/ProgressScreen';

import {useSelector} from 'react-redux';

const AppNavigator = () => {
  const tId = useSelector(state => state.question.currentTest?.test || '');

  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          headerShown: false,
          headerStyle: {backgroundColor: '#0047AB'},
          headerTintColor: '#fff',
          headerTitleStyle: {fontWeight: 'bold'},
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="test"
        component={TestScreen}
        options={{
          title: `Practice Test - ${tId}`,
          headerStyle: {backgroundColor: '#0047AB'},
          headerTintColor: '#fff',
          headerTitleStyle: {fontWeight: 'bold'},
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="results"
        component={ResultScreen}
        options={{
          title: 'Score',
          headerStyle: {backgroundColor: '#0047AB'},
          headerTintColor: '#fff',
          headerTitleStyle: {fontWeight: 'bold'},
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="review"
        component={ReviewScreen}
        options={{
          title: 'Review Answers',
          headerStyle: {backgroundColor: '#0047AB'},
          headerTintColor: '#fff',
          headerTitleStyle: {fontWeight: 'bold'},
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="progress"
        component={ProgressScreen}
        options={{
          title: 'Your Progress',
          headerStyle: {backgroundColor: '#0047AB'},
          headerTintColor: '#fff',
          headerTitleStyle: {fontWeight: 'bold'},
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};
export default AppNavigator;
