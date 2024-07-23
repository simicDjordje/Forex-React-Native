import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { useCallback } from "react"

const authScreensCheck = WrappedComponent => {
  return (props) => {
    const navigation = useNavigation()

    const checkStatus = useCallback(async ()=>{
        try{
            const token = await AsyncStorage.getItem('@userToken')
            const userData = await AsyncStorage.getItem('@userData') 
            
            
            if(token && userData){
                navigation.navigate('MainTabs', {screen: 'Metrics'})
                return
            }
        }catch(err){
            console.log(err.message)
        }

    }, [])

    useFocusEffect(
        useCallback(()=>{
            checkStatus()
        }, [])
    )

    return <WrappedComponent {...props} />
  }
}

export default authScreensCheck