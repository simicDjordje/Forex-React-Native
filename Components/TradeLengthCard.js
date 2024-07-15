import { View, Text } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import * as Progress from 'react-native-progress'

const TradeLengthCard = ({data}) => {
   
    const getAbbreviatedDate = (dateString) => {
        if (!dateString || dateString == '/') return '';
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const date = new Date(dateString);
        const month = months[date.getMonth()];
        const day = date.getDate();
        return `${month} ${day}`;
      };
    
      const convertTime = (milliseconds) => {
        if (!milliseconds) return '';
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
    
        if (days >= 1) {
          return `${days}D`;
        } else if (hours >= 1) {
          return `${hours}hr`;
        } else if (minutes >= 1) {
          return `${minutes}min`;
        } else {
          return `${seconds}s`;
        }
      };
    
      const formatNumber = (value) => {
        return value != null ? value.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0';
      };

      const averageTradeLength = convertTime(data?.averageTradeLengthInMilliseconds) || 0
        const longWonTradesPercent = parseInt(data?.longWonTradesPercent) || 0
        const shortWonTradesPercent = parseInt(data?.shortWonTradesPercent) || 0
        const bestTradeAmount = formatNumber(data?.bestTrade) || '/'
        const bestTradeDate = getAbbreviatedDate(data?.bestTradeDate)
        const worstTradeAmount = formatNumber(data?.worstTrade) || '/'
        const worstTradeDate = getAbbreviatedDate(data?.worstTradeDate) || ''
        const bestTradePipsAmount = formatNumber(data?.bestTradePips) || 0
        const bestTradePipsDate = getAbbreviatedDate(data?.bestTradePipsDate) || ''
        const worstTradePipsAmount = formatNumber(data?.worstTradePips) || 0
        const worstTradePipsDate = getAbbreviatedDate(data?.worstTradePipsDate) || ''


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
                    <Text className="text-[#97979D] text-xl">Avg. trade length</Text>
                </View>
                <View className="flex flex-row justify-center p-2 mb-5">
                    <Text className="text-white text-3xl font-semibold">{averageTradeLength}</Text>
                </View>

                <View className="flex flex-row justify-between items-center px-3 mb-4">
                    <Text className="text-[#97979D] text-md">Longs won</Text>
                    <Progress.Bar 
                    color='#9353D3'
                    progress={longWonTradesPercent} width={200} />
                    <Text className="text-white text-md">{longWonTradesPercent}%</Text>
                </View>

                <View className="flex flex-row justify-between items-center px-3 mb-4">
                    <Text className="text-[#97979D] text-md">Shorts won</Text>
                    <Progress.Bar 
                    color='#9353D3'
                    progress={shortWonTradesPercent} width={200} />
                    <Text className="text-white text-md">{shortWonTradesPercent}%</Text>
                </View>

                <View className="flex flex-row justify-between items-center px-3 mb-4">
                    <Text className="text-[#97979D] text-md">Best trade ($)</Text>
                    <Text className="text-white text-md">{bestTradeAmount} <Text className="text-[#97979D]">{bestTradeDate}</Text></Text>
                </View>

                <View className="flex flex-row justify-between items-center px-3 mb-4">
                    <Text className="text-[#97979D] text-md">Worst trade ($)</Text>
                    <Text className="text-white text-md">{worstTradeAmount} <Text className="text-[#97979D]">{worstTradeDate}</Text></Text>
                </View>

                <View className="flex flex-row justify-between items-center px-3 mb-4">
                    <Text className="text-[#97979D] text-md">Best trade (pips)</Text>
                    <Text className="text-white text-md">{bestTradePipsAmount} <Text className="text-[#97979D]">{bestTradePipsDate}</Text></Text>
                </View>

                <View className="flex flex-row justify-between items-center px-3 mb-4">
                    <Text className="text-[#97979D] text-md">Worst trade (pips)</Text>
                    <Text className="text-white text-md">{worstTradePipsAmount} <Text className="text-[#97979D]">{worstTradePipsDate}</Text></Text>
                </View>
            </View>
        </LinearGradient>
    </View>
  )
}

export default TradeLengthCard