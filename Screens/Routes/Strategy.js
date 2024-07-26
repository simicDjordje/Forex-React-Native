import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAddedStrategiesMutation, useAlreadySubscribedStrategiesMutation, useDiscoverStrategiesMutation, useGetAvailableServersQuery } from '../../redux/services/apiCore'
import LootieLoader from '../../Components/LootieLoader'
import AsyncStorage from '@react-native-async-storage/async-storage'
import DiscoverStrategiesList from '../../Components/DiscoverStrategiesList'
import ActiveStrategiesList from '../../Components/ActiveStrategiesList'

const Strategy = () => {
  const [userData, setUserData] = useState(null)
  const {data: availableServers, isLoading: availableServersIsLoading} = useGetAvailableServersQuery()
  const [discoverStrategies, {isLoading: discoverIsLoading}] = useDiscoverStrategiesMutation()
  const [addedStrategies, {isLoading: addedIsLoading}] = useAddedStrategiesMutation()
  const [alreadySubscribedStrategies, {isLoading, isError, error}] = useAlreadySubscribedStrategiesMutation()
  const [discoverData, setDiscoverData] = useState([])
  const [activeData, setActiveData] = useState([])


  useEffect(()=>{
    (async () => {
      const user = await AsyncStorage.getItem('@userData')
      setUserData(JSON.parse(user))
    })()
  }, [])

  useEffect(()=>{
      (async () => {
          try{

              if(!userData) return

              const {data} = userData.money_manager == '1' ? await addedStrategies() : await discoverStrategies()
              if(data){
                  if(discoverData.length !== data.length){
                      setDiscoverData(data)
                  }
              }
          }catch(error){
              console.log(error)
          }
      })()
  }, [discoverStrategies, addedStrategies, userData])

  useEffect(()=>{
    (async () => {
        try{
            const {data} = await alreadySubscribedStrategies()
            if(data){
                if(activeData.length !== data.length){
                    setActiveData(data)
                }
            }
        }catch(error){
            console.log(error)
        }
    })()
}, [alreadySubscribedStrategies, setActiveData])

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
        <View className="px-4 flex-col">
          <Text className="text-white text-3xl mt-14">Strategy</Text>

          <DiscoverStrategiesList 
            discoverData={discoverData}
            setDiscoverData={setDiscoverData}
            userData={userData}
          />

          {userData.money_manager != '1' && 
            <ActiveStrategiesList 
              activeData={activeData}
              setActiveData={setActiveData}
              userData={userData}
            />
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Strategy