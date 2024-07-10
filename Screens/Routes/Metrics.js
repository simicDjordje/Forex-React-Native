import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../Components/Header'
import LootieLoader from '../../Components/LootieLoader'
import { LinearGradient } from 'expo-linear-gradient'
import Entypo from '@expo/vector-icons/Entypo'
import { useGetAllDataQuery } from "../../redux/services/apiCore"
import LineChartWrapper from '../../Components/LineChartWrapper'
import BarChartWrapper from '../../Components/BarChartWrapper'
import DonutChartWrapper from '../../Components/DonutChartWrapper'

const Metrics = () => {
  const [skip, setSkip] = useState(false)
  const {data, error, isLoading} = useGetAllDataQuery(null, {
    skip: skip,
  })

  useEffect(()=>{
    if (!isLoading && data) {
        // console.log('DATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa')
        // console.log(data)
        // console.log(data?.metrics)
    }
}, [data, isLoading, error])

  if(isLoading){
    return (
      <SafeAreaView className="min-h-screen bg-[#101011]">
        <View className="px-4 mt-10">
          <Header />
          <View className="bg-yellow-500 mt-32">
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
          <Header />
        </View>

        <View className="px-4 mt-14">
          <Text className="text-white text-3xl">Metrics</Text>
          <Text className="text-[#343437] text-md mt-3">Updated 26 minutes ago</Text>
        </View>

        <View className="px-4 mt-3">
          <TouchableOpacity className="bg-[#202021] w-1/4 flex flex-row justify-center px-1 py-2 rounded-lg">
            <Text className="text-white">Share Link</Text>
          </TouchableOpacity>
        </View>

        

        {/* DATA */}
        
        <View className="px-4 mt-10">
          {/* Card 1 */}
          <View className="rounded-xl h-[196px] border border-0.5 border-[#202021]">
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.04)', 'rgba(255, 255, 255, 0)']}
              style={{ height: 200 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="rounded-xl"
            >
              <View className="h-full flex flex-col justify-between">
                <View className="flex flex-row justify-between items-center px-3 mt-3">
                  <Text className="text-[#97979D] text-md">Balance</Text>
                  <TouchableOpacity>
                    <Entypo name="dots-three-horizontal" size={18} color="#97979D" />
                  </TouchableOpacity>
                </View>

                <View className="flex flex-row justify-between px-3 flex-1 py-3">
                  <View className="h-full">
                    <View className="flex flex-row justify-start items-end">
                      <Text className="text-white text-3xl">$14,147.<Text className="text-[#343437]">67</Text></Text>
                      <Text className="text-sm text-[#C5C5F9] mb-1">+11k%</Text>
                    </View>
                    <View className="mt-10">
                      <Text className="text-[#97979D] text-md">Highest balance</Text>
                      <Text className="text-white text-lg">$14,147.<Text className="text-[#343437]">67</Text></Text>
                    </View>
                  </View>
                  <View>
                    <Text>chart</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Card 2 */}
          <View className="rounded-xl h-[196px] mt-5 border border-0.5 border-[#202021]">
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.04)', 'rgba(255, 255, 255, 0)']}
              style={{ height: 200 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="rounded-xl"
            >
              <View className="h-full flex flex-col justify-between">
                <View className="flex flex-row justify-between items-center px-3 mt-3">
                  <Text className="text-[#97979D] text-md">Profit</Text>
                  <TouchableOpacity>
                    <Entypo name="dots-three-horizontal" size={18} color="#97979D" />
                  </TouchableOpacity>
                </View>

                <View className="flex flex-row justify-between px-3 flex-1 py-3">
                  <View className="h-full">
                    <View className="flex flex-row justify-start items-end">
                      <Text className="text-white text-3xl">$5,719.<Text className="text-[#343437]">87</Text></Text>
                      <Text className="text-sm text-[#C5C5F9] mb-1">+11k%</Text>
                    </View>
                    <View className="mt-10">
                      <Text className="text-[#97979D] text-md">Fees</Text>
                      <Text className="text-white text-lg">$3113.<Text className="text-[#343437]">54</Text></Text>
                    </View>
                  </View>
                  <View>
                    <Text>chart</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Card 3 */}
          <View className="rounded-xl h-[196px] mt-5 border border-0.5 border-[#202021]">
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.04)', 'rgba(255, 255, 255, 0)']}
              style={{ height: 200 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="rounded-xl"
            >
              <View className="h-full flex flex-col justify-between">
                <View className="flex flex-row justify-between items-center px-3 mt-3">
                  <Text className="text-[#97979D] text-md">Deposits</Text>
                  <TouchableOpacity>
                    <Entypo name="dots-three-horizontal" size={18} color="#97979D" />
                  </TouchableOpacity>
                </View>

                <View className="flex flex-row justify-between px-3 flex-1 py-3">
                  <View className="h-full">
                    <View className="flex flex-row justify-start items-end">
                      <Text className="text-white text-3xl">$5,719.<Text className="text-[#343437]">87</Text></Text>
                    </View>
                    <View className="mt-10">
                      <Text className="text-[#97979D] text-md">Last transaction</Text>
                      <Text className="text-white text-lg">$3113.<Text className="text-[#343437]">54</Text></Text>
                    </View>
                  </View>
                  <View>
                    
                  </View>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Card 4 */}
          <View className="rounded-xl h-[196px] mt-5 border border-0.5 border-[#202021]">
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.04)', 'rgba(255, 255, 255, 0)']}
              style={{ height: 200 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="rounded-xl"
            >
              <View className="h-full flex flex-col justify-between">
                <View className="flex flex-row justify-between items-center px-3 mt-3">
                  <Text className="text-[#97979D] text-md">Withdrawals</Text>
                  <TouchableOpacity>
                    <Entypo name="dots-three-horizontal" size={18} color="#97979D" />
                  </TouchableOpacity>
                </View>

                <View className="flex flex-row justify-between px-3 flex-1 py-3">
                  <View className="h-full">
                    <View className="flex flex-row justify-start items-end">
                      <Text className="text-white text-3xl">$5,719.<Text className="text-[#343437]">87</Text></Text>
                    </View>
                    <View className="mt-10">
                      <Text className="text-[#97979D] text-md">Last transaction</Text>
                      <Text className="text-white text-lg">$3113.<Text className="text-[#343437]">54</Text></Text>
                    </View>
                  </View>
                  <View>
                    
                  </View>
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>
        
        <View className="px-4 mt-10 mb-56">


          {/* Trading Period-Line Chart */}
          <View className="rounded-xl mt-5 border border-0.5 border-[#202021]">
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.04)', 'rgba(255, 255, 255, 0)']}
              // style={{ height: 200 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="rounded-xl"
            >
              <View className="py-4">
                <LineChartWrapper data={data?.chart_data} />
              </View>
            </LinearGradient>
          </View>


          {/* Monthly Gain-Bar Chart */}
          <View className="rounded-xl mt-5 border border-0.5 border-[#202021]">
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.04)', 'rgba(255, 255, 255, 0)']}
              // style={{ height: 200 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="rounded-xl"
            >
              <View className="py-4">
                <BarChartWrapper data={data?.chart_data}/>
              </View>
            </LinearGradient>
          </View>


          {/* Most Active Days-Donut/Pie Chart */}
          <View className="rounded-xl mt-5 border border-0.5 border-[#202021]">
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.04)', 'rgba(255, 255, 255, 0)']}
              // style={{ height: 200 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="rounded-xl"
            >
              <View className="py-4">
                <DonutChartWrapper data={data?.most_active_days} />
              </View>
            </LinearGradient>
          </View>


        </View>
        

        <View className="mb-28"></View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Metrics