import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

const Account = () => {
  const navigation = useNavigation()

  useEffect(()=>{
        (async () => {
          try{
            await AsyncStorage.removeItem('@userToken')
            await AsyncStorage.removeItem('@userData')
            console.log('items successfully deleted')

            navigation.navigate('StackTabs', {screen: 'Login'})
          }catch(err){
            console.log(err.message)
          }
        })()
      }, [])

  return (
    <View>
      <Text>Account</Text>
    </View>
  )
}

export default Account