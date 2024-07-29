import { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import StrategyCard from './StrategyCard'


const ActiveStrategiesList = ({activeData, setActiveData, userData}) => {

    return (
    <View className="mt-10">
        <View className="flex flex-row mb-10 justify-center">
          <Text className="text-white text-2xl">Active</Text>
        </View>

        {activeData && !activeData.length && 
          <View className="flex flex-row justify-center">
            <Text className="text-xl text-[#97979D]">No active strategies</Text>
          </View>
        }

        <ScrollView 
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
            paddingHorizontal: 5
        }}>
            {activeData.map((item, key) => (
              <StrategyCard 
                strategy={item} 
                key={key} 
                setData={setActiveData}
                userData={userData}
                type='unsubscribe'
              />
            ))}

        </ScrollView>
    </View>
  )
}

export default ActiveStrategiesList