import { View, Text } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import * as Progress from 'react-native-progress'

const TradesCard = ({data}) => {
    const formatNumber = (value) => {
        return value != null ? value.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0';
      };
    
      const trades = formatNumber(data?.trades);
      const pips = formatNumber(data?.pips);
      const averageWinPips = formatNumber(data?.averageWinPips);
      const averageWin = formatNumber(data?.averageWin);
      const averageLossPips = formatNumber(data?.averageLossPips);
      const averageLoss = formatNumber(data?.averageLoss);
      const lots = formatNumber(data?.lots);


  return (
    <View className="rounded-xl border border-0.5 border-[#202021] my-2">
        <LinearGradient
            colors={['rgba(255, 255, 255, 0.04)', 'rgba(255, 255, 255, 0)']}
            style={{ height: 350 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="rounded-xl"
        >
            <View className="h-full flex flex-col">
                <View className="flex flex-row justify-center p-2 mt-4">
                    <Text className="text-[#97979D] text-xl">Trades</Text>
                </View>
                <View className="flex flex-row justify-center p-2 mb-5">
                    <Text className="text-white text-3xl font-semibold">{trades}</Text>
                </View>

                <View className="flex flex-row justify-between items-center px-3 mb-4">
                    <Text className="text-[#97979D] text-md">Profitability</Text>
                    <Progress.Bar 
                    color='#9353D3'
                    progress={0.3} width={200} />
                </View>

                <View className="flex flex-row justify-between items-center px-3 mb-4">
                    <Text className="text-[#97979D] text-md">Pips</Text>
                    <Text className="text-white text-md">{pips}</Text>
                </View>

                <View className="flex flex-row justify-between items-center px-3 mb-4">
                    <Text className="text-[#97979D] text-md">Average win</Text>
                    <Text className="text-white text-md">{averageWinPips} <Text className="text-[#97979D]">pips</Text> / ${averageWin}</Text>
                </View>

                <View className="flex flex-row justify-between items-center px-3 mb-4">
                    <Text className="text-[#97979D] text-md">Average loss</Text>
                    <Text className="text-white text-md">{averageLossPips} <Text className="text-[#97979D]">pips</Text> / ${averageLoss}</Text>
                </View>

                <View className="flex flex-row justify-between items-center px-3 mb-4">
                    <Text className="text-[#97979D] text-md">Lots</Text>
                    <Text className="text-white text-md">{lots}</Text>
                </View>

                <View className="flex flex-row justify-between items-center px-3 mb-4">
                    <Text className="text-[#97979D] text-md">Commisions</Text>
                    <Text className="text-white text-md">/</Text>
                </View>
            </View>
        </LinearGradient>
    </View>
  )
}

export default TradesCard