import { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import StrategyCard from './StrategyCard'


const DiscoverStrategiesList = ({discoverData, setDiscoverData, userData}) => {

  return (
    <View className="mt-32">
        <View className="flex flex-row mb-10">
          <Text className="text-white text-2xl">Discover</Text>
        </View>

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
                setDiscoverData={setDiscoverData}
                userData={userData}
                type='subscribe'
              />
            ))}

        </ScrollView>
    </View>
  )
}

export default DiscoverStrategiesList