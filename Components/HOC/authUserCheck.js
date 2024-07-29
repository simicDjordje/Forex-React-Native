import AsyncStorage from '@react-native-async-storage/async-storage'
import { useCallback, useState } from 'react'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { LoadingScreen } from '../../Screens'
import { Text, View } from 'react-native'
import LootieLoader from '../LootieLoader'
import Header from '../Header'

const authUserCheck = (WrappedComponent) => {

    return (props) => {
        const navigation = useNavigation()
        const route = useRoute()
        const [isLoading, setIsLoading] = useState(true)

        const checkStatus = useCallback(async ()=>{
            try{
                setIsLoading(true)
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
            }finally{
                setIsLoading(false)
            }

        }, [])


        useFocusEffect(
            useCallback(() =>{
                console.log('focused: ', route.name)
                checkStatus()
            }, [])
        )

        if(isLoading) return (
            <View className="h-full bg-[#101011] flex flex-col justify-center items-center">
                <LootieLoader />
            </View>
        )

        return <WrappedComponent {...props} />
    }
}

export default authUserCheck