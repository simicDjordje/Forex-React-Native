import { View, Text, Image, TouchableOpacity, Linking, ScrollView, TextInput} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useConnectMTMutation, useGetAvailableServersQuery, useLogoutMutation } from '../../redux/services/apiCore';
import Feather from '@expo/vector-icons/Feather'
import SelectServerModal from '../../Components/SelectServerModal';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import LootieLoader from '../../Components/LootieLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FailModal from '../../Components/FailModal';


const AccountConf = () => {
  const [step, setStep] = useState(1)
  const [isVisible, setIsVisible] = useState(false)
  const {data: availableServers, refetch} = useGetAvailableServersQuery()
    const [inputsData, setInputsData] = useState({
      login: '',
      password: '',
      platform: 'mt4',
      chosen_server: null,//'0',//'VantageFX-Demo',
      
  })
  const [validation, setValidation] = useState(false)
  const [connectMT, {isLoading, isSuccess}] = useConnectMTMutation()
  const [hidePass, setHidePass] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigation = useNavigation()
  const [logout, {isLoading: isLogoutLoading}] = useLogoutMutation()
  const [failModalOpen, setFailModalOpen] = useState(false)
  const [errorMessageType, setErrorMessageType] = useState(null)

  // useEffect(()=>{
  //   if(availableServers){
  //     console.log('AVAILABLE SERVERS: ', availableServers)
  //     setInputsData(prevInputsData => ({ ...prevInputsData, chosen_server: availableServers[0] }))
  //   }
  // }, [availableServers])

  useFocusEffect(
    useCallback(()=>{
        if(!availableServers) refetch()
    }, [])
  )


  const handleConnect = async () => {
    if(!inputsData.login || !inputsData.password || !inputsData.chosen_server){
        setValidation(true)
        return
    }

    try{
      const {data, isError} = await connectMT({...inputsData, chosen_server: inputsData.chosen_server.id})    
      console.log(data)
      if(data && data.status === 'success'){ 
        await AsyncStorage.setItem('@userData', JSON.stringify(data.user_data))        
        navigation.navigate('MainTabs', {screen: data.user_data.money_manager && data.user_data.money_manager == '1' ? 'Strategy' : 'Metrics'})
        return
      }

      if(isError){
        setErrorMessageType('isError')
        setFailModalOpen(true)
      }

      if(data && data.status === 'fail'){
        setErrorMessageType('fail')
        setFailModalOpen(true)
      }

      if(data && data.status == 'already_connected'){
        setErrorMessageType('already_connected')
        setFailModalOpen(true)
      }

    }catch(err){
      console.log(err.message)
    }

  }

  const setSelectedServer = (value) => {
    const foundedServer = availableServers.find(i => i.id === value)

    if(foundedServer){
      setInputsData(prevInputsData => ({...prevInputsData, chosen_server: foundedServer}))
      setIsModalOpen(false)
    }
  }

  const handleLogout = async () => {
    const {data, isError, error} = await logout()

    if(isError || error){
        alert('There was an error logging you out. Please try again in a few moments.')
        return
    }

    if(data && data.success){
      console.log(data)
      await AsyncStorage.removeItem('@userToken')
      await AsyncStorage.removeItem('@userData')
      // navigation.navigate('StackTabs', {screen: 'Login'})
      navigation.reset({
          index: 0,
          routes: [{ name: 'StackTabs', params: { screen: 'Login' } }],
      })
    }
}

  return (
    <SafeAreaView className="bg-[#101011] px-4">
    <ScrollView>
      <View className="min-h-screen mb-28">
      <View className="px-4 mt-14">
        <Text className="text-white text-3xl">Account Activation & Management</Text>
      </View>

      <View className="flex flex-row justify-between items-center px-2 mt-4">
        <View className="flex flex-row justify-between items-center gap-2">
          <TouchableOpacity onPress={()=>setStep(1)} className={`h-8 w-8 ${step === 1 ? 'bg-[#9353D3]' : 'bg-white'} rounded-full flex flex-row justify-center items-center`}>
              <Text className={`${step === 1 ? 'text-white' : 'text-black'} text-lg`}>1</Text>
          </TouchableOpacity>

          {step === 1 && <Text className={`text-white text-lg`}>Brokerage Account</Text>}
        </View>

        <MaterialIcons name="keyboard-arrow-right" size={24} color="white" />

        <View className="flex flex-row justify-between items-center gap-2">
          <TouchableOpacity onPress={() => setStep(2)} className={`h-8 w-8 ${step === 2 ? 'bg-[#9353D3]' : 'bg-white'} rounded-full flex flex-row justify-center items-center`}>
            <Text className={`${step === 2 ? 'text-white' : 'text-black'} text-lg`}>2</Text>
          </TouchableOpacity>

          {step === 2 && <Text className={`text-white text-lg`}>Account Details</Text>}
        </View>
      </View>

      <View className="rounded-xl mt-5 border border-0.5 border-[#202021]">
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.04)', 'rgba(255, 255, 255, 0)']}
          style={{ minHeight: 200 }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          className="rounded-xl"
        >

          <View className="px-4 py-4">

            <View className="flex flex-row justify-end items-center">
              {/* <View className="bg-[#343437] p-2 rounded-md">
                <Text className="text-white text-lg">STEP 1</Text>
              </View> */}

              <Image source={require('../../assets/image 1.png')} />
            </View>

            {step === 1 && 
              <View className={`flex flex-col items-center mt-10`}>
                <Text className="text-white text-2xl">Your Brokerage Account</Text>

                <Text className="text-[#97979D] mt-4">You need a brokerage account to activate Vanquish. We have proudly partnered with Vantage Markets as our Prime Broker.</Text>

                <TouchableOpacity onPress={()=> Linking.openURL('https://www.vantagemarkets.com/en/')} className="bg-[#343437] px-6 py-2 rounded-md mt-8">
                  <Text className="text-white text-md">Sign Up for Brokerage Account</Text>
                </TouchableOpacity>

                <Text className="text-[#97979D] mt-4">Have an account already?</Text>

                <View className="mt-5 bg-[#343437] w-full rounded-md px-4 pt-4 pb-6 flex flex-col justify-center items-center">
                  <Text className="text-white text-xl">Deposits & Withdrawals</Text>
                  <Text className="text-[#97979D] mt-4">Login below to your brokerage account below.</Text>
                  
                  <TouchableOpacity onPress={()=> {}} className="bg-[#97979D] px-6 py-2 rounded-md mt-8">
                    <Text className="text-white text-md">Sign Login to Brokerage Account</Text>
                  </TouchableOpacity>
                </View>
            </View>
            }

            {step === 2 && 
              <View className={`flex flex-col items-center mt-10 ${step !== 2 && 'hidden'}`}>
                  <Text className="text-white text-2xl">Your Account Details</Text>

                  <Text className="text-[#97979D] mt-4">Once you have made your Vantage Account you will receive your MT4 details via email from Vantage Markets.</Text>

                  <Text className="text-[#97979D] mt-4">Enter your MT4 details below for your brokerage account to become active and synced with Vanquish.</Text>
                  {/* bg-[#343437] */}
                  <View className="mt-5 w-full rounded-md px-4 pt-4 pb-6 flex flex-col justify-center items-center">
                    <View className="w-full">
                        <Text className="text-[#97979D] text-md mb-2">MT4 Login {validation && !inputsData.login && <Text className="text-red-500">*</Text>}</Text>
                        <View className="bg-[#343437] p-4 rounded-lg w-full">
                            <TextInput
                            placeholderTextColor={'#101011'}
                            value={inputsData.email}
                            placeholder='Enter your login' 
                            onChangeText={text => setInputsData({...inputsData, login: text})}
                            color={'#fff'}
                            />
                        </View>
                    </View>

                    <View>
                      <Text className="text-[#97979D] text-md mb-2 mt-4">MT4 Password {validation && !inputsData.password && <Text className="text-red-500">*</Text>}</Text>
                      <View className="bg-[#343437] p-4 rounded-lg flex flex-row justify-between items-center w-full">
                          <TextInput
                              placeholderTextColor={'#101011'}
                              value={inputsData.password} 
                              secureTextEntry={hidePass}
                              className="flex-1" 
                              placeholder='Enter your password' 
                              onChangeText={text => setInputsData({...inputsData, password: text})}
                              color={'#fff'}
                              />
                          <TouchableOpacity onPress={()=>setHidePass(!hidePass)} className="pl-2">
                              {hidePass && <Feather name="eye-off" size={24} color="white" />}
                              {!hidePass && <Feather name="eye" size={24} color="white" />}
                          </TouchableOpacity>
                      </View>
                    </View>

                    <View className="w-full">
                        <Text className="text-[#97979D] text-md mb-2 mt-4">MT4 Server {validation && !inputsData.chosen_server && <Text className="text-red-500">*</Text>}</Text>
                        <TouchableOpacity onPress={() => setIsModalOpen(true)} className="bg-[#343437] p-4 rounded-lg flex flex-row justify-between items-center">
                            <Text className={`${inputsData.chosen_server ? 'text-white' : 'text-black'}`}>{inputsData.chosen_server ? inputsData.chosen_server.server_name : 'Select server'}</Text>
                        </TouchableOpacity>
                    </View>

                  </View>
              </View>
            }

            {step === 1 && 
            <TouchableOpacity 
                onPress={()=>{setStep(2)}}
                className={`bg-[#9353D3] mt-5 h-10 rounded-md flex flex-row justify-center items-center`}>
                <Text className="text-white text-lg mb-1">Continue</Text>
                <MaterialIcons name="keyboard-arrow-right" size={24} color="white" />
            </TouchableOpacity>}

            {step === 2 && 
            <TouchableOpacity 
                onPress={handleConnect}
                className={`bg-[#9353D3] mt-5 h-10 rounded-md flex flex-row justify-center items-center`}>
                {isLoading ? <LootieLoader d={30} /> : <Text className="text-white text-lg mb-1">Connect</Text>}
            </TouchableOpacity>}

            <TouchableOpacity 
                onPress={handleLogout}
                className={`bg-[#D4D4D8] mt-5 h-10 rounded-md flex flex-row justify-center items-center`}>
                {isLogoutLoading ? <LootieLoader d={30} /> : (
                  <View className="flex flex-row justify-center items-center">
                    <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
                    <Text className="text-lg mb-1">Log Out</Text>
                  </View>
                )}
            </TouchableOpacity>

          </View>
        </LinearGradient>
      </View>
      </View>
    </ScrollView>


   {availableServers &&  
   <SelectServerModal 
      isModalOpen={isModalOpen} 
      setIsModalOpen={setIsModalOpen} 
      setSelectedServer={setSelectedServer} 
      serversData={availableServers}
    />
    }

    <FailModal 
      isModalOpen={failModalOpen}
      setIsModalOpen={setFailModalOpen}
      messageType={errorMessageType}
    />
    </SafeAreaView>
  )
}

export default AccountConf