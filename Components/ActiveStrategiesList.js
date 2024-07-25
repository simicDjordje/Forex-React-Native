import { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import StrategyCard from './StrategyCard'


const ActiveStrategiesList = ({activeData, setActiveData, userData}) => {

    return (
    <View className="mt-32">
        <View className="flex flex-row mb-10">
          <Text className="text-white text-2xl">Active</Text>
        </View>

        <ScrollView 
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
            paddingHorizontal: 5
        }}>
            {activeData && activeData.map((item, key) => (
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