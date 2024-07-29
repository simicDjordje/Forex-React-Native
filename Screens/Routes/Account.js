import { View, Text, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker';
import { useGetCountriesQuery, useLogoutMutation } from '../../redux/services/apiCore'
import ChangePasswordModal from '../../Components/ChangePasswordModal'
import LootieLoader from '../../Components/LootieLoader'


const Account = () => {
  const navigation = useNavigation()
  const [image, setImage] = useState(null)
  const [userData, setUserData] = useState(null)
  const {data: countriesData, isLoading: isCountriesLoading} = useGetCountriesQuery()
  const [userCountry, setUserCountry] = useState(null)
  const [changePasswordModal, setChangePasswordModal] = useState(false)
  const [logout, {isLoading: isLogoutLoading}] = useLogoutMutation()

  useEffect(()=>{
    (async () => {
      const user = await AsyncStorage.getItem('@userData')
      setUserData(JSON.parse(user))
    })()
  }, [])

  useEffect(()=>{
    if(!countriesData || !userData) return
    const userCountryFounded = countriesData.find(country => country.id == userData.country_id)
    
    if(userCountryFounded) setUserCountry(userCountryFounded)

  }, [countriesData])


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri)
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

  // useEffect(()=>{
  //       (async () => {
  //         return
  //         try{
  //           await AsyncStorage.removeItem('@userToken')
  //           await AsyncStorage.removeItem('@userData')
  //           console.log('items successfully deleted')

  //           navigation.navigate('StackTabs', {screen: 'Login'})
  //         }catch(err){
  //           console.log(err.message)
  //         }
  //       })()
  //     }, [])

  return (
    <SafeAreaView className="min-h-screen bg-[#101011]">
      <ScrollView>
        <View className="px-4 flex-col">
          <Text className="text-white text-3xl mt-14">Account</Text>
          {/* , or learn about your account deactivation options */}
          <Text className="text-[#97979D] text-lg mt-4">See information about your account</Text>
          

          <View className="flex flex-row justify-start gap-x-10 items-center mt-16">
              <View className="flex flex-col">
                  <Text className="text-[#97979D] mb-2">Profile picture</Text>
                  <Image className="h-24 w-24 rounded-lg" source={image ? { uri: image } : require('../../assets/ProfileImage.jpg')} />
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
          <Text className="text-[#97979D] mt-2">Add a picture, recommended size 256x256</Text>


          <View className="mt-10">
              <Text className="text-[#97979D] text-md mb-2">Name</Text>
              <View className="bg-[#343437] p-4 rounded-lg">
                  {/* <TextInput
                  placeholderTextColor={'#101011'}
                  value={siData?.performance_fee}
                  placeholder='Performance fee' 
                  color={'#fff'}
                  /> */}
                  <Text className="text-[#97979D]">{userData?.name}</Text>
              </View>
          </View>

          <View className="mt-6">
              <Text className="text-[#97979D] text-md mb-2">Email</Text>
              <View className="bg-[#343437] p-4 rounded-lg">
                  {/* <TextInput
                  placeholderTextColor={'#101011'}
                  value={siData?.performance_fee}
                  placeholder='Performance fee' 
                  color={'#fff'}
                  /> */}
                  <Text className="text-[#97979D]">{userData?.email}</Text>
              </View>
          </View>

          <View className="mt-6">
              <Text className="text-[#97979D] text-md mb-2">Customer number</Text>
              <View className="bg-[#343437] p-4 rounded-lg">
                  {/* <TextInput
                  placeholderTextColor={'#101011'}
                  value={siData?.performance_fee}
                  placeholder='Performance fee' 
                  color={'#fff'}
                  /> */}
                  <Text className="text-[#97979D]">C0012425</Text>
              </View>
          </View>

          <View className="mt-6">
              <Text className="text-[#97979D] text-md mb-2">Type of account</Text>
              <View className="bg-[#343437] p-4 rounded-lg">
                  {/* <TextInput
                  placeholderTextColor={'#101011'}
                  value={siData?.performance_fee}
                  placeholder='Performance fee' 
                  color={'#fff'}
                  /> */}
                  <Text className="text-[#97979D]">Investor account</Text>
              </View>
          </View>

          <View className="mt-6">
              <Text className="text-[#97979D] text-md mb-2">Country</Text>
              <View className="bg-[#343437] p-4 rounded-lg">
                  {/* <TextInput
                  placeholderTextColor={'#101011'}
                  value={siData?.performance_fee}
                  placeholder='Performance fee' 
                  color={'#fff'}
                  /> */}
                  {userCountry && <Text className="text-[#97979D]">{userCountry?.country_name}</Text>}
              </View>
          </View>

          
            <TouchableOpacity
                onPress={()=>{setChangePasswordModal(true)}} 
                className={`bg-[#D4D4D8] p-4 rounded-lg flex flex-row justify-center mt-10`}>
                <Text>Change password</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={handleLogout}
                className={`bg-[#D4D4D8] p-4 rounded-lg flex flex-row justify-center mt-4`}>
                {isLogoutLoading ? <LootieLoader d={20} /> : <Text>Log Out</Text>}
            </TouchableOpacity>
          
        </View>

        <View className="mb-48"></View>

        <ChangePasswordModal 
          isModalOpen={changePasswordModal}
          setIsModalOpen={setChangePasswordModal}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Account