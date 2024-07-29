import { useEffect, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import StrategyCard from './StrategyCard'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { useNavigation } from '@react-navigation/native'


const DiscoverStrategiesList = ({discoverData, setDiscoverData, userData, fetchActiveData}) => {
  const navigation = useNavigation()
  return (
    <View className="mt-20">
        <View className="flex flex-row mb-10 justify-center">
          <Text className="text-white text-2xl">{userData.money_manager == '1' ? 'My Strategies' : 'Discover'}</Text>
        </View>

        {discoverData && !discoverData.length && userData.money_manager != '1' &&
          <View className="flex flex-row justify-center">
            <Text className="text-xl text-[#97979D]">No strategies to discover</Text>
          </View>
        }

        {discoverData && !discoverData.length && userData.money_manager == '1' &&
          <View className="flex flex-col justify-center items-center">
            <Text className="text-xl text-white">No strategies</Text>
            <Text className="text-lg text-[#97979D] mt-2">Add one</Text>
            <TouchableOpacity onPress={()=>{
              navigation.navigate('MainTabs', {screen: 'AddStrategy'})
            }} className="bg-[#343437] p-3 mt-2 rounded-md">
              <FontAwesome6 stroke={3} name="add" size={24} color={'white'} />
            </TouchableOpacity>
          </View>
        }

        <ScrollView 
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
            paddingHorizontal: 5
        }}>
            {discoverData && discoverData.map((item, key) => (
              <StrategyCard 
                strategy={item} 
                key={key} 
                setData={setDiscoverData}
                userData={userData}
                type='subscribe'
                fetchActiveData={fetchActiveData}
              />
            ))}

        </ScrollView>
    </View>
  )
}

export default DiscoverStrategiesList