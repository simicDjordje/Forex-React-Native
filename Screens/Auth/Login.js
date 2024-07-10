import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Feather from '@expo/vector-icons/Feather'
import { useLoginMutation } from '../../redux/services/apiCore'
import { setUser } from '../../redux/features/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import LootieLoader from '../../Components/LootieLoader'

const Login = () => {
    const [inputsData, setInputsData] = useState({
        email: '',
        password: '',
    })
    const [hidePass, setHidePass] = useState(true)
    const [validation, setValidation] = useState(false)
    const [badCredentials, setBadCredentials] = useState(false)
    const [login, {isLoading}] = useLoginMutation()
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const handleLogin = async () => {
        if(!inputsData.email || !inputsData.password){
            setValidation(true)
            return
        }
        try{
            const {data, isError} = await login(inputsData)
    
            if(data && data.status === 'success'){
                //localStorage.setItem('user-data', JSON.stringify(data.user_data))
                dispatch(setUser(data.user_data))
                navigation.navigate('MainTabs', {screen: 'Metrics'})
                return
            }
    
            setBadCredentials(true)
        }catch(error){
            console.log(error)
        }
    }

  return (
    <SafeAreaView className="bg-[#101011] min-h-screen">
      <View className="min-h-screen">
        <View className="flex flex-row justify-center mt-28">
            <Text className="text-white text-3xl font-bold">Login</Text>
        </View>

        <View className="flex flex-row justify-center mt-5">
            <Text className={`${badCredentials ? 'text-red-500' : 'text-[#101011]'}`}>Bad login credentials</Text>
        </View>

        <View className="px-4 flex flex-col">
            <View>
                <Text className="text-[#97979D] text-md mb-2">Email {validation && !inputsData.email && <Text className="text-red-500">*</Text>}</Text>
                <View className="bg-[#343437] p-4 rounded-lg">
                    <TextInput
                    placeholderTextColor={'#101011'}
                    value={inputsData.email}
                    placeholder='Enter your email' 
                    onChangeText={text => setInputsData({...inputsData, email: text})}
                    />
                </View>
            </View>

            <View>
                <Text className="text-[#97979D] text-md mb-2 mt-4">Password {validation && !inputsData.password && <Text className="text-red-500">*</Text>}</Text>
                <View className="bg-[#343437] p-4 rounded-lg flex flex-row justify-between items-center">
                    <TextInput
                        placeholderTextColor={'#101011'}
                        value={inputsData.password} 
                        secureTextEntry={hidePass}
                        className="flex-1" 
                        placeholder='Enter your password' 
                        onChangeText={text => setInputsData({...inputsData, password: text})}
                        />
                    <TouchableOpacity onPress={()=>setHidePass(!hidePass)} className="pl-2">
                        {hidePass && <Feather name="eye-off" size={24} color="white" />}
                        {!hidePass && <Feather name="eye" size={24} color="white" />}
                    </TouchableOpacity>
                </View>
            </View>
            
            <View>
                <TouchableOpacity 
                    onPress={handleLogin}
                    className={`bg-[#D4D4D8] mt-10 ${isLoading ? '' : 'p-4'} rounded-lg flex flex-row justify-center`}>
                    {isLoading ? <LootieLoader /> : <Text>Login</Text>}
                </TouchableOpacity>
            </View>

            <View className="flex flex-row justify-around items-center mt-10">
                <View className="bg-[#97979D] w-1/3" style={{height: 1}}></View>
                <Text className="text-[#97979D]">Or login with</Text>
                <View className="bg-[#97979D] w-1/3" style={{height: 1}}></View>
            </View>

            <View>
                <TouchableOpacity 
                    className="mt-5 p-4 rounded-lg flex flex-row justify-center border border-0.5 border-[#97979D]">
                    <Image className="w-5 h-5" source={require('../../assets/googlelogo.png')} />
                    <Text className="text-white ml-2">Google</Text>
                </TouchableOpacity>
            </View>

            <View className="flex flex-row justify-center mt-5">
                <TouchableOpacity onPress={()=>navigation.navigate("StackTabs", {screen: "Register"})}>
                    <Text className="text-white">You're new in here? 
                        <Text className="text-blue-500"> Create Account</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Login