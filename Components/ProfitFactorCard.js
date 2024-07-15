import { View, Text } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

const ProfitFactorCard = ({data}) => {
    const formatNumber = (value) => {
        return value != null ? value.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0';
    };
  
    const profitFactor = formatNumber(data?.profitFactor);
    const standardDeviationProfit = formatNumber(data?.standardDeviationProfit);
    const sharpeRatio = formatNumber(data?.sharpeRatio);
    const probability = formatNumber(data?.probability);
    const expectancyPips = formatNumber(data?.expectancyPips);
    const expectancy = formatNumber(data?.expectancy);
    const ahpr = formatNumber(data?.ahpr);
    const ghpr = formatNumber(data?.ghpr);


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
                    <Text className="text-[#97979D] text-xl">Profit factor</Text>
                </View>
                <View className="flex flex-row justify-center p-2 mb-5">
                    <Text className="text-white text-3xl font-semibold">{profitFactor}</Text>
                </View>

                
                <View className="flex flex-row justify-between items-center px-3 mb-4">
                    <Text className="text-[#97979D] text-md">Standard deviation</Text>
                    <Text className="text-white text-md">${standardDeviationProfit}</Text>
                </View>

                <View className="flex flex-row justify-between items-center px-3 mb-4">
                    <Text className="text-[#97979D] text-md">Sharpe ratio</Text>
                    <Text className="text-white text-md">{sharpeRatio}</Text>
                </View>

                <View className="flex flex-row justify-between items-center px-3 mb-4">
                    <Text className="text-[#97979D] text-md">Probability</Text>
                    <Text className="text-white text-md">{probability} (99.99%)</Text>
                </View>

                <View className="flex flex-row justify-between items-center px-3 mb-4">
                    <Text className="text-[#97979D] text-md">Expectancy</Text>
                    <Text className="text-white text-md">{expectancyPips} <Text className="text-[#97979D]">pips</Text> / ${expectancy}</Text>
                </View>

                <View className="flex flex-row justify-between items-center px-3 mb-4">
                    <Text className="text-[#97979D] text-md">AHPR</Text>
                    <Text className="text-white text-md">{ahpr}%</Text>
                </View>

                <View className="flex flex-row justify-between items-center px-3 mb-4">
                    <Text className="text-[#97979D] text-md">GHPR</Text>
                    <Text className="text-white text-md">{ghpr}%</Text>
                </View>

            </View>
        </LinearGradient>
    </View>
  )
}

export default ProfitFactorCard