import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {DetectedQuadResult} from 'vision-camera-dynamsoft-document-normalizer'
import ScannerScreen from './src/screens/Scanner'
import HomeScreen from './src/screens/Home'
import ResultViewerScreen from './src/screens/ResultViewer'

export type RootStackParamList = {
  Home: undefined
  Scanner: undefined
  ResultViewer: {detectionResult: DetectedQuadResult; photoPath?: string}
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Scanner" component={ScannerScreen} />
        <Stack.Screen name="ResultViewer" component={ResultViewerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
