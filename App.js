import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StripeProvider } from '@stripe/stripe-react-native'
import StripeApp from './src/screens/StripeApp'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import Dashboard from './src/screens/Dashboard';
import ChatScreen from './src/screens/ChatScreen';
const Stack = createNativeStackNavigator()


const App = () => {
  return (
    <StripeProvider publishableKey='pk_test_51PEnDn2MBG739KhfEycyY780EHLLNu4BJBtRvWbeVDWFxUsVduGIIbBvKlTN1ixBAHZ7zZPdkoKU4qers13n5mE200piTFqCie'>
     <NavigationContainer>
      <Stack.Navigator initialRouteName='StripeApp'>
        <Stack.Screen name='StripeApp' component={StripeApp} />
        {/* <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='SignUp' component={SignUp}/>
        <Stack.Screen name='Dashbaord' component={Dashboard}/>
        <Stack.Screen name='ChatScreen' component={ChatScreen}/> */}
      </Stack.Navigator>
     </NavigationContainer>
    </StripeProvider>
  )
}

export default App

const styles = StyleSheet.create({})