import { View, Text, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAddStrategyMutation, useGetAvailableServersQuery } from '../../redux/services/apiCore'
import Feather from '@expo/vector-icons/Feather'
import SelectServerModal from '../../Components/SelectServerModal'
import { useFocusEffect } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker';
import LootieLoader from '../../Components/LootieLoader'
import AddedStrategySuccessModal from '../../Components/AddedStrategySuccessModal'


const AddStrategy = () => {
    const [inputsData, setInputsData] = useState({
        factsheet_url: '',
        platform: 'mt4',
        strategy_name: '',
        server: '', //availableServers[0]?.id,//'0',//'VantageFX-Demo',
        account_number: '',
        performance_fee: '',
        recommended_equity: '',
        account_password: '',
    })
    const [validation, setValidation] = useState(false)
    const [addStrategy, {isLoading}] = useAddStrategyMutation()
    const [hidePass, setHidePass] = useState(true)
    const {data: availableServers, refetch} = useGetAvailableServersQuery()
    const [isModalOpen, setIsModalOpen] = useState(false)
    // const [image, setImage] = useState(null)
    const [isSuccess, setIsSuccess] = useState(false)

    useFocusEffect(
        useCallback(()=>{
            if(!availableServers) refetch()
        }, [])
      )

      useEffect(()=>{
        console.log(availableServers)
      }, [availableServers])

    const setSelectedServer = (value) => {
        const foundedServer = availableServers.find(i => i.id === value)

        if(foundedServer){
            setInputsData(prevInputsData => ({...prevInputsData, server: foundedServer}))
            setIsModalOpen(false)
        }
    }

    // const pickImage = async () => {
    //     // No permissions request is necessary for launching the image library
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //       mediaTypes: ImagePicker.MediaTypeOptions.All,
    //       allowsEditing: true,
    //       aspect: [4, 3],
    //       quality: 1,
    //     })
    
    //     console.log(result);
    
    //     if (!result.canceled) {
    //       setImage(result.assets[0].uri)
    //     }
    //   }

      useFocusEffect(useCallback(()=>{
        setIsSuccess(false)
        setInputsData({
            factsheet_url: '',
            platform: 'mt4',
            strategy_name: '',
            server: '',
            account_number: '',
            performance_fee: '',
            recommended_equity: '',
            account_password: '',
        })
        setValidation(false)
      }, []))

      const handleAddNewStrategy = async () => {
        if(
            !inputsData.factsheet_url || 
            !inputsData.platform || 
            !inputsData.strategy_name || 
            !inputsData.server || 
            !inputsData.account_number ||
            !inputsData.performance_fee ||
            !inputsData.recommended_equity ||
            !inputsData.account_password
        ){
            setValidation(true)
            return
        }
    
        const formData = new FormData()
        formData.append('factsheet_url', inputsData.factsheet_url)
        formData.append('platform', inputsData.platform)
        formData.append('strategy_name', inputsData.strategy_name)
        formData.append('server', inputsData.server?.id)
        formData.append('account_number', inputsData.account_number)
        formData.append('performance_fee', inputsData.performance_fee)
        formData.append('recommended_equity', inputsData.recommended_equity)
        formData.append('account_password', inputsData.account_password)
        // formData.append('profile-photo', image)
        console.log('formData: ', formData)
        try{
            const {data, error} = await addStrategy(formData)
            console.log('add strategy data: ', data)
            console.log('add error: ', error)
            if(data){
                setIsSuccess(true)
                setInputsData({
                    factsheet_url: '',
                    platform: 'mt4',
                    strategy_name: '',
                    server: '',
                    account_number: '',
                    performance_fee: '',
                    recommended_equity: '',
                    account_password: '',
                })
                setValidation(false)
            }
        }catch(error){
            console.log(error)
        }
    }

  return (
    <SafeAreaView className="min-h-screen bg-[#101011]">
      <ScrollView>
        <View className="px-4 flex-col">
          <Text className="text-white text-3xl mt-14">Add Strategy</Text>
          <Text className="text-[#97979D] text-lg mt-4">Provide your strategy</Text>

          {/* <View className="flex flex-row justify-start gap-x-10 items-center mt-16">
              <View className="flex flex-col">
                  <Text className="text-[#97979D] mb-2">Profile picture</Text>
                  <Image className="h-24 w-24 rounded-lg" source={image ? { uri: image } : require('../../assets/Avatar.png')} />
              </View>

              <View className="flex flex-col gap-y-2 mt-4 mr-10">
                  <TouchableOpacity onPress={pickImage} className="bg-[#D4D4D8] p-4 w-full rounded-lg flex flex-row justify-center items-center">
                      <Text>Upload Picture</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setImage(null)} className="bg-[#343437] p-4 w-full rounded-lg flex flex-row justify-center">
                      <Text className="text-white">Delete</Text>
                  </TouchableOpacity>
              </View>  
          </View>
          <Text className="text-[#97979D] mt-2">Add a picture, recommended size 256x256</Text> */}

            <View className="mt-16">
                <Text className="text-[#97979D] text-md mb-2 mt-4">Factsheet URL {validation && !inputsData.factsheet_url && <Text className="text-red-500">*</Text>}</Text>
                <View className="bg-[#343437] p-4 rounded-lg">
                    <TextInput
                    placeholderTextColor={'#101011'}
                    value={inputsData.factsheet_url}
                    placeholder='Enter URL' 
                    onChangeText={text => setInputsData({...inputsData, factsheet_url: text})}
                    color={'#fff'}
                    />
                </View>
            </View>

            <View className="mt-4">
                <Text className="text-[#97979D] text-md mb-2 mt-4">Platform {validation && !inputsData.platform && <Text className="text-red-500">*</Text>}</Text>
                <View className="bg-[#343437] p-4 rounded-lg">
                    <TextInput
                    placeholderTextColor={'#101011'}
                    value={inputsData.platform}
                    placeholder='Enter platform' 
                    onChangeText={text => setInputsData({...inputsData, platform: text})}
                    color={'#fff'}
                    editable={false}
                    />
                </View>
            </View>

            <View className="mt-4">
                <Text className="text-[#97979D] text-md mb-2 mt-4">Strategy Name {validation && !inputsData.strategy_name && <Text className="text-red-500">*</Text>}</Text>
                <View className="bg-[#343437] p-4 rounded-lg">
                    <TextInput
                    placeholderTextColor={'#101011'}
                    value={inputsData.strategy_name}
                    placeholder='Enter name' 
                    onChangeText={text => setInputsData({...inputsData, strategy_name: text})}
                    color={'#fff'}
                    />
                </View>
            </View>

            <View className="mt-4">
                <Text className="text-[#97979D] text-md mb-2 mt-4">Server {validation && !inputsData.server && <Text className="text-red-500">*</Text>}</Text>
                <TouchableOpacity onPress={() => setIsModalOpen(true)} className="bg-[#343437] px-4 py-5 rounded-lg flex flex-row justify-between items-center">
                    <Text className={`${inputsData.server ? 'text-white' : 'text-black'}`}>{inputsData.server ? inputsData.server.server_name : 'Select server'}</Text>
                </TouchableOpacity>
            </View>

            <View className="mt-4">
                <Text className="text-[#97979D] text-md mb-2 mt-4">Performance Fee {validation && !inputsData.performance_fee && <Text className="text-red-500">*</Text>}</Text>
                <View className="bg-[#343437] p-4 rounded-lg">
                    <TextInput
                    placeholderTextColor={'#101011'}
                    value={inputsData.performance_fee}
                    placeholder='Enter performance fee' 
                    keyboardType='numeric'
                    onChangeText={text => setInputsData({...inputsData, performance_fee: text})}
                    color={'#fff'}
                    />
                </View>
            </View>

            <View className="mt-4">
                <Text className="text-[#97979D] text-md mb-2 mt-4">Recommended Equity {validation && !inputsData.recommended_equity && <Text className="text-red-500">*</Text>}</Text>
                <View className="bg-[#343437] p-4 rounded-lg">
                    <TextInput
                    placeholderTextColor={'#101011'}
                    value={inputsData.recommended_equity}
                    keyboardType='numeric'
                    placeholder='Enter performance fee' 
                    onChangeText={text => setInputsData({...inputsData, recommended_equity: text})}
                    color={'#fff'}
                    />
                </View>
            </View>

            <View className="mt-4">
                <Text className="text-[#97979D] text-md mb-2 mt-4">Account Number {validation && !inputsData.account_number && <Text className="text-red-500">*</Text>}</Text>
                <View className="bg-[#343437] p-4 rounded-lg">
                    <TextInput
                    placeholderTextColor={'#101011'}
                    value={inputsData.account_number}
                    placeholder='Enter performance fee' 
                    onChangeText={text => setInputsData({...inputsData, account_number: text})}
                    color={'#fff'}
                    />
                </View>
            </View>

            <View className="mt-4">
                <Text className="text-[#97979D] text-md mb-2 mt-4">Password {validation && !inputsData.account_password && <Text className="text-red-500">*</Text>}</Text>
                <View className="bg-[#343437] p-4 rounded-lg flex flex-row justify-between items-center">
                    <TextInput
                        placeholderTextColor={'#101011'}
                        value={inputsData.account_password} 
                        secureTextEntry={hidePass}
                        className="flex-1" 
                        placeholder='Enter account password' 
                        onChangeText={text => setInputsData({...inputsData, account_password: text})}
                        color={'#fff'}
                        />
                    <TouchableOpacity onPress={()=>setHidePass(!hidePass)} className="pl-2">
                        {hidePass && <Feather name="eye-off" size={24} color="white" />}
                        {!hidePass && <Feather name="eye" size={24} color="white" />}
                    </TouchableOpacity>
                </View>
            </View>

            <View>
                <TouchableOpacity 
                    onPress={handleAddNewStrategy}
                    className={`bg-[#D4D4D8] mt-10 p-4 rounded-lg flex flex-row justify-center`}>
                    {isLoading ? <LootieLoader d={20} /> : <Text>Provide your strategy</Text>}
                </TouchableOpacity>
            </View>
        </View>

        <View className="mb-48"></View>
      </ScrollView>

      
        <SelectServerModal 
            isModalOpen={isModalOpen} 
            setIsModalOpen={setIsModalOpen} 
            setSelectedServer={setSelectedServer} 
            serversData={availableServers || []}
        />
        

        <AddedStrategySuccessModal isModalOpen={isSuccess} setIsModalOpen={setIsSuccess} />
    </SafeAreaView>
  )
}

export default AddStrategy