import { View, Text, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAddedStrategiesMutation, useAlreadySubscribedStrategiesMutation, useDiscoverStrategiesMutation, useGetAvailableServersQuery } from '../../redux/services/apiCore'
import LootieLoader from '../../Components/LootieLoader'
import AsyncStorage from '@react-native-async-storage/async-storage'
import DiscoverStrategiesList from '../../Components/DiscoverStrategiesList'
import ActiveStrategiesList from '../../Components/ActiveStrategiesList'
import Header from '../../Components/Header'
import { useFocusEffect } from '@react-navigation/native'

const Strategy = () => {
  const [userData, setUserData] = useState(null)
  const {data: availableServers, isLoading: availableServersIsLoading} = useGetAvailableServersQuery()
  const [discoverStrategies, {isLoading: discoverIsLoading}] = useDiscoverStrategiesMutation()
  const [addedStrategies, {isLoading: addedIsLoading}] = useAddedStrategiesMutation()
  const [alreadySubscribedStrategies, {isLoading, isError, error}] = useAlreadySubscribedStrategiesMutation()
  const [discoverData, setDiscoverData] = useState([])
  const [activeData, setActiveData] = useState([])


  const fetchDiscoverData =  useCallback(async () => {
    try{
        if(!userData) return

        let {data} = userData.money_manager == '1' ? await addedStrategies() : await discoverStrategies()
        if(data){
            if(discoverData.length !== data.length){
                const reversedData = [...data].reverse()
                setDiscoverData(reversedData)
            }
        }
    }catch(error){
        console.log(error)
    }
  }, [discoverStrategies, addedStrategies, userData])

  const fetchActiveData =  useCallback(async () => {
    try{
        let {data} = await alreadySubscribedStrategies()
        if(data){
            if(activeData.length !== data.length){
                const reversedData = [...data].reverse()
                setActiveData(reversedData)
            }
        }
    }catch(error){
        console.log(error)
    }
  }, [alreadySubscribedStrategies, setActiveData])

  useFocusEffect(useCallback(()=>{
    (async () => {
      const user = await AsyncStorage.getItem('@userData')
      setUserData(JSON.parse(user))
    })()
  }, []))

  useFocusEffect(useCallback(()=>{
      fetchDiscoverData()
      fetchActiveData()
  }, [userData]))

  if(availableServersIsLoading || discoverIsLoading || addedIsLoading || !userData){
    return (
      <SafeAreaView className="min-h-screen bg-[#101011]">
        <View className="px-4 mt-10">
          <View className="mt-60">
            <LootieLoader />
          </View>
        </View>
      </SafeAreaView>
    )
  }


  return (
    <SafeAreaView className="min-h-screen bg-[#101011]">
      <ScrollView>
        <View className="px-4 mt-10">
          <Header title={'Strategy'} />
        </View>
        <View className="px-4 flex-col">
          {/* <Text className="text-white text-3xl mt-14">Strategy</Text> */}

          <DiscoverStrategiesList 
            discoverData={discoverData}
            setDiscoverData={setDiscoverData}
            userData={userData}
            fetchActiveData={fetchActiveData}
          />
          
          <View className="bg-[#97979D] w-full mt-10" style={{height: 0.3}}></View>

          {userData.money_manager != '1' && 
            <ActiveStrategiesList 
              activeData={activeData}
              setActiveData={setActiveData}
              userData={userData}
            />
          }
        </View>

        <View className="mb-48"></View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Strategy