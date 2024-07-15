import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
// import { AntDesign } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


const TablePeriodCard = ({data}) => {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0)
    let {today, thisWeek, thisMonth, thisYear} = data

    today = today[0];
    thisWeek = thisWeek[0];
    thisMonth = thisMonth[0];
    thisYear = thisYear[0];

    const handleIndexChange = (type) => {
        if(type === 'back'){
            if(activeSlideIndex === 0) return
            setActiveSlideIndex(prev => prev - 1)
        }

        if(type === 'next'){
            if(activeSlideIndex === 3) return
            setActiveSlideIndex(prev => prev + 1)
        }
    }


  return (
    <View className="rounded-xl border border-0.5 border-[#202021] mt-5">
        <LinearGradient
            colors={['rgba(255, 255, 255, 0.04)', 'rgba(255, 255, 255, 0)']}
            style={{ height: 350 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="rounded-xl"
        >
            <View className="h-full flex flex-col py-4">
                
            <View className="flex flex-row justify-between px-2">
                <Text className="text-white text-2xl ml-2">Table period</Text>
                <View className="flex flex-row justify-between bg-[#202021] p-2 rounded-md">
                    <TouchableOpacity onPress={()=>handleIndexChange('back')} className="mr-2 bg-[#343437] p-1 rounded-md">
                        {/* <AntDesign name="left" size={24} color={activeSlideIndex === 0 ? 'gray' : 'white'} /> */}
                        <MaterialIcons name="keyboard-arrow-left" size={24} color={activeSlideIndex === 0 ? 'gray' : 'white'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handleIndexChange('next')} className="bg-[#343437] p-1 rounded-md">
                        {/* <AntDesign name="right" size={24} color={activeSlideIndex === 3 ? 'gray' : 'white'} /> */}
                        <MaterialIcons name="keyboard-arrow-right" size={24} color={activeSlideIndex === 3 ? 'gray' : 'white'} />
                    </TouchableOpacity>
                </View>
            </View>


            {/* TODAY */}
            <View className={`px-4 mt-8 ${activeSlideIndex !== 0 ? 'hidden' : ''}`}>
                <Text className="text-white text-lg">Today</Text>

                <View className="flex flex-row justify-between mt-4">
                    <Text className="text-[#97979D] text-md">Gain (Difference)</Text>
                    <Text className="text-[#C5C5F9] text-md">
                        {today && today.hasOwnProperty('gain') ? `${parseFloat(today.gain) > 0 ? '+' : ''}` + parseFloat(today.gain).toFixed(2) : 0}%&nbsp;
                        <Text className="text-[#97979D]">
                            ({today && today.hasOwnProperty('gainDifference') ? parseFloat(today.gainDifference).toFixed(2) : 0}%)
                        </Text>
                    </Text>
                </View>

                <View className="flex flex-row justify-between mt-4">
                    <Text className="text-[#97979D] text-md">Profit (Difference)</Text>
                    <Text className="text-[#C5C5F9] text-md">
                    {today && today.hasOwnProperty('profit') ? `${parseFloat(today.profit) > 0 ? '+' : ''}` + parseFloat(today.profit).toFixed(2) : 0}$&nbsp;
                        <Text className="text-[#97979D]">
                            ({today && today.hasOwnProperty('profitDifference') ? parseFloat(today.profitDifference).toFixed(2) : 0}%)
                        </Text>
                    </Text>
                </View>

                <View className="flex flex-row justify-between mt-4">
                    <Text className="text-[#97979D] text-md">Pips (Difference)</Text>
                    <Text className="text-[#C5C5F9] text-md">
                    {today && today.hasOwnProperty('pips') ? `${parseFloat(today.pips) > 0 ? '+' : ''}` + parseFloat(today.pips).toFixed(2) : 0}&nbsp;
                        <Text className="text-[#97979D]">
                            ({today && today.hasOwnProperty('pipsDifference') ? parseFloat(today.pipsDifference).toFixed(2) : 0}%)
                        </Text>
                    </Text>
                </View>

                <View className="flex flex-row justify-between mt-4">
                    <Text className="text-[#97979D] text-md">Win% (Difference)</Text>
                    <Text className="text-[#C5C5F9] text-md">
                    {today && today.hasOwnProperty('wonTradesPercent') ? parseFloat(today.wonTradesPercent).toFixed(2) : 0}&nbsp;
                        <Text className="text-[#97979D]">
                        ({today && today.hasOwnProperty('wonTradesPercentDifference') ? parseFloat(today.wonTradesPercentDifference).toFixed(2) : 0}%)
                        </Text>
                    </Text>
                </View>

                <View className="flex flex-row justify-between mt-4">
                    <Text className="text-[#97979D] text-md">Trades (Difference)</Text>
                    <Text className="text-[#C5C5F9] text-md">
                    {today && today.hasOwnProperty('trades') ? `${parseFloat(today.trades) > 0 ? '+' : ''}` + parseFloat(today.trades).toFixed(2) : 0}&nbsp;
                        <Text className="text-[#97979D]">
                        ({today && today.hasOwnProperty('tradesDifference') ? parseFloat(today.tradesDifference).toFixed(2) : 0}%)
                        </Text>
                    </Text>
                </View>
            </View>
            {/* END TODAY */}


            {/* THIS WEEK */}
            <View className={`px-4 mt-8 ${activeSlideIndex !== 1 ? 'hidden' : ''}`}>
                <Text className="text-white text-lg">This Week</Text>

                <View className="flex flex-row justify-between mt-4">
                    <Text className="text-[#97979D] text-md">Gain (Difference)</Text>
                    <Text className="text-[#C5C5F9] text-md">
                    {thisWeek && thisWeek.hasOwnProperty('gain') ? `${parseFloat(thisWeek.gain) > 0 ? '+' : ''}` + parseFloat(thisWeek.gain).toFixed(2) : 0}%&nbsp;
                        <Text className="text-[#97979D]">
                            ({thisWeek && thisWeek.hasOwnProperty('gainDifference') ? parseFloat(thisWeek.gainDifference).toFixed(2) : 0}%)
                        </Text>
                    </Text>
                </View>

                <View className="flex flex-row justify-between mt-4">
                    <Text className="text-[#97979D] text-md">Profit (Difference)</Text>
                    <Text className="text-[#C5C5F9] text-md">
                    {thisWeek && thisWeek.hasOwnProperty('profit') ? `${parseFloat(thisWeek.profit) > 0 ? '+' : ''}` + parseFloat(thisWeek.profit).toFixed(2) : 0}$&nbsp;
                        <Text className="text-[#97979D]">
                            ({thisWeek && thisWeek.hasOwnProperty('profitDifference') ? parseFloat(thisWeek.profitDifference).toFixed(2) : 0}%)
                        </Text>
                    </Text>
                </View>

                <View className="flex flex-row justify-between mt-4">
                    <Text className="text-[#97979D] text-md">Pips (Difference)</Text>
                    <Text className="text-[#C5C5F9] text-md">
                    {thisWeek && thisWeek.hasOwnProperty('pips') ? `${parseFloat(thisWeek.pips) > 0 ? '+' : ''}` + parseFloat(thisWeek.pips).toFixed(2) : 0}&nbsp;
                        <Text className="text-[#97979D]">
                            ({thisWeek && thisWeek.hasOwnProperty('pipsDifference') ? parseFloat(thisWeek.pipsDifference).toFixed(2) : 0}%)
                        </Text>
                    </Text>
                </View>

                <View className="flex flex-row justify-between mt-4">
                    <Text className="text-[#97979D] text-md">Win% (Difference)</Text>
                    <Text className="text-[#C5C5F9] text-md">
                    {thisWeek && thisWeek.hasOwnProperty('wonTradesPercent') ? parseFloat(thisWeek.wonTradesPercent).toFixed(2) : 0}&nbsp;
                        <Text className="text-[#97979D]">
                        ({thisWeek && thisWeek.hasOwnProperty('wonTradesPercentDifference') ? parseFloat(thisWeek.wonTradesPercentDifference).toFixed(2) : 0}%)
                        </Text>
                    </Text>
                </View>

                <View className="flex flex-row justify-between mt-4">
                    <Text className="text-[#97979D] text-md">Trades (Difference)</Text>
                    <Text className="text-[#C5C5F9] text-md">
                    {thisWeek && thisWeek.hasOwnProperty('trades') ? `${parseFloat(thisWeek.trades) > 0 ? '+' : ''}` + parseFloat(thisWeek.trades).toFixed(2) : 0}&nbsp;
                        <Text className="text-[#97979D]">
                        ({thisWeek && thisWeek.hasOwnProperty('tradesDifference') ? parseFloat(thisWeek.tradesDifference).toFixed(2) : 0}%)
                        </Text>
                    </Text>
                </View>
            </View>
            {/* END THIS WEEK */}



            {/* THIS MONTH */}
            <View className={`px-4 mt-8 ${activeSlideIndex !== 2 ? 'hidden' : ''}`}>
                <Text className="text-white text-lg">This Month</Text>

                <View className="flex flex-row justify-between mt-4">
                    <Text className="text-[#97979D] text-md">Gain (Difference)</Text>
                    <Text className="text-[#C5C5F9] text-md">
                    {thisMonth && thisMonth.hasOwnProperty('gain') ? `${parseFloat(thisMonth.gain) > 0 ? '+' : ''}` + parseFloat(thisMonth.gain).toFixed(2) : 0}%&nbsp;
                        <Text className="text-[#97979D]">
                            ({thisMonth && thisMonth.hasOwnProperty('gainDifference') ? parseFloat(thisMonth.gainDifference).toFixed(2) : 0}%)
                        </Text>
                    </Text>
                </View>

                <View className="flex flex-row justify-between mt-4">
                    <Text className="text-[#97979D] text-md">Profit (Difference)</Text>
                    <Text className="text-[#C5C5F9] text-md">
                    {thisMonth && thisMonth.hasOwnProperty('profit') ? `${parseFloat(thisMonth.profit) > 0 ? '+' : ''}` + parseFloat(thisMonth.profit).toFixed(2) : 0}$&nbsp;
                        <Text className="text-[#97979D]">
                            ({thisMonth && thisMonth.hasOwnProperty('profitDifference') ? parseFloat(thisMonth.profitDifference).toFixed(2) : 0}%)
                        </Text>
                    </Text>
                </View>

                <View className="flex flex-row justify-between mt-4">
                    <Text className="text-[#97979D] text-md">Pips (Difference)</Text>
                    <Text className="text-[#C5C5F9] text-md">
                    {thisMonth && thisMonth.hasOwnProperty('pips') ? `${parseFloat(thisMonth.pips) > 0 ? '+' : ''}` + parseFloat(thisMonth.pips).toFixed(2) : 0}&nbsp;
                        <Text className="text-[#97979D]">
                            ({thisMonth && thisMonth.hasOwnProperty('pipsDifference') ? parseFloat(thisMonth.pipsDifference).toFixed(2) : 0}%)
                        </Text>
                    </Text>
                </View>

                <View className="flex flex-row justify-between mt-4">
                    <Text className="text-[#97979D] text-md">Win% (Difference)</Text>
                    <Text className="text-[#C5C5F9] text-md">
                    {thisMonth && thisMonth.hasOwnProperty('wonTradesPercent') ? parseFloat(thisMonth.wonTradesPercent).toFixed(2) : 0}&nbsp;
                        <Text className="text-[#97979D]">
                        ({thisMonth && thisMonth.hasOwnProperty('wonTradesPercentDifference') ? parseFloat(thisMonth.wonTradesPercentDifference).toFixed(2) : 0}%)
                        </Text>
                    </Text>
                </View>

                <View className="flex flex-row justify-between mt-4">
                    <Text className="text-[#97979D] text-md">Trades (Difference)</Text>
                    <Text className="text-[#C5C5F9] text-md">
                    {thisMonth && thisMonth.hasOwnProperty('trades') ? `${parseFloat(thisMonth.trades) > 0 ? '+' : ''}` + parseFloat(thisMonth.trades).toFixed(2) : 0}&nbsp;
                        <Text className="text-[#97979D]">
                        ({thisMonth && thisMonth.hasOwnProperty('tradesDifference') ? parseFloat(thisMonth.tradesDifference).toFixed(2) : 0}%)
                        </Text>
                    </Text>
                </View>
            </View>
            {/* END THIS MONTH */}


            {/* THIS YEAR */}
            <View className={`px-4 mt-8 ${activeSlideIndex !== 3 ? 'hidden' : ''}`}>
                <Text className="text-white text-lg">This Year</Text>

                <View className="flex flex-row justify-between mt-4">
                    <Text className="text-[#97979D] text-md">Gain</Text>
                    <Text className="text-[#C5C5F9] text-md">
                    {thisYear && thisYear.hasOwnProperty('gain') ? `${parseFloat(thisYear.gain) > 0 ? '+' : ''}` +  parseFloat(thisYear.gain).toFixed(2) : 0}%
                    </Text>
                </View>

                <View className="flex flex-row justify-between mt-4">
                    <Text className="text-[#97979D] text-md">Profit</Text>
                    <Text className="text-[#C5C5F9] text-md">
                    {thisYear && thisYear.hasOwnProperty('profit') ? `${parseFloat(thisYear.profit) > 0 ? '+' : ''}` +   parseFloat(thisYear.profit).toFixed(2) : 0}$
                        
                    </Text>
                </View>

                <View className="flex flex-row justify-between mt-4">
                    <Text className="text-[#97979D] text-md">Pips</Text>
                    <Text className="text-[#C5C5F9] text-md">
                    {thisYear && thisYear.hasOwnProperty('pips') ? `${parseFloat(thisYear.pips) > 0 ? '+' : ''}` +  parseFloat(thisYear.pips).toFixed(2) : 0}
                        
                    </Text>
                </View>

                <View className="flex flex-row justify-between mt-4">
                    <Text className="text-[#97979D] text-md">Win%</Text>
                    <Text className="text-[#C5C5F9] text-md">
                    {thisYear && thisYear.hasOwnProperty('wonTradesPercent') ? parseFloat(thisYear.wonTradesPercent).toFixed(2) : 0}                       
                    </Text>
                </View>

                <View className="flex flex-row justify-between mt-4">
                    <Text className="text-[#97979D] text-md">Trades</Text>
                    <Text className="text-[#C5C5F9] text-md">
                    {thisYear && thisYear.hasOwnProperty('trades') ? `${parseFloat(thisYear.trades) > 0 ? '+' : ''}` +  parseFloat(thisYear.trades).toFixed(2) : 0}
                    </Text>
                </View>
            </View>
            {/* END THIS YEAR */}


            </View>
        </LinearGradient>
    </View>
  )
}

export default TablePeriodCard