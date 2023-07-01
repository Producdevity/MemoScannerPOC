import React from 'react'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {Text, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native'
import {RouteProp} from '@react-navigation/native'
import {RootStackParamList} from '../../App'

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>
  route: RouteProp<RootStackParamList, 'Home'>
}

function HomeScreen(props: Props) {
  const onPressed = () => {
    props.navigation.navigate({
      name: 'Scanner',
      params: undefined,
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPressed}>
        <Text style={styles.buttonText}>Scan Document</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#1e90ff',
    padding: 10,
    borderRadius: 5,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default HomeScreen
