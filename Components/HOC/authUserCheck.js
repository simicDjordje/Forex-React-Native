import AsyncStorage from '@react-native-async-storage/async-storage'
import { useCallback, useEffect } from 'react'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'

const authUserCheck = (WrappedComponent) => {
    return (props) => {
        const navigation = useNavigation()
        const route = useRoute()

        const checkStatus = useCallback(async ()=>{
            try{
                const token = await AsyncStorage.getItem('@userToken')
                let userData = await AsyncStorage.getItem('@userData') 
                
                // console.log(token)
                // console.log(userData)
                if(!token || !userData){
                    navigation.navigate('StackTabs', {screen: 'Login'})
                    return
                }

                if(route.name === 'Loading'){
                    navigation.navigate('MainTabs', {screen: 'Metrics'})
                    return
                }

                userData = JSON.parse(userData)
                if(!userData.mt_acc_id || userData.mt_acc_id == '0'){
                    navigation.navigate('StackTabs', {screen: 'AccountConf'})
                }
            }catch(err){
                console.log(err.message)
            }

        }, [])


        useFocusEffect(
            useCallback(() =>{
                checkStatus()
            }, [])
        )

        

        return <WrappedComponent {...props} />
    }
}

export default authUserCheck