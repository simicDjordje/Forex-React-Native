import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, {useState, useEffect, useCallback} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../Components/Header'
import LootieLoader from '../../Components/LootieLoader'
import { LinearGradient } from 'expo-linear-gradient'
import Entypo from '@expo/vector-icons/Entypo'
import { useGetAllDataQuery } from "../../redux/services/apiCore"
import LineChartWrapper from '../../Components/LineChartWrapper'
import BarChartWrapper from '../../Components/BarChartWrapper'
import DonutChartWrapper from '../../Components/DonutChartWrapper'
import MiniCard from '../../Components/MiniCard'
import TradesCard from '../../Components/TradesCard'
import TradeLengthCard from '../../Components/TradeLengthCard'
import ProfitFactorCard from '../../Components/ProfitFactorCard'
import TablePeriodCard from '../../Components/TablePeriodCard'
import {noDataValues} from '../../constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'

const Metrics = () => {
  const {data, error, isLoading, refetch} = useGetAllDataQuery(null)


  useFocusEffect(
    useCallback(()=>{
      refetch()
    }, [])
  )

  useEffect(()=>{
    return
    (async () => {
              
              try{
                await AsyncStorage.removeItem('@userToken')
                await AsyncStorage.removeItem('@userData')
                console.log('items successfully deleted')
    
                navigation.navigate('StackTabs', {screen: 'Login'})
              }catch(err){
                console.log(err.message)
              }
            })()
    console.log('EEEEEEEEEEEEEEEEEEEEEEEERRRRRRRRRRRRRRROOOOOOOOOOOOOOOOOOOOOR:')
    console.log(data)
    console.log(error)
    console.log('EEEEEEEEEEEEEEEEEEEEEEEERRRRRRRRRRRRRRROOOOOOOOOOOOOOOOOOOOOR:')

  }, [data, error])

  if(isLoading){
    return (
      <SafeAreaView className="min-h-screen bg-[#101011]">
        <View className="px-4 mt-10">
          <Header />
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
        <View className="px-4 mt-10">
          <Header />
        </View>

        <View className="px-4 mt-14">
          <Text className="text-white text-3xl">Metrics</Text>
          {/* <Text className="text-[#343437] text-md mt-3">Updated 26 minutes ago</Text> */}
        </View>

        {/* <View className="px-4 mt-3">
          <TouchableOpacity className="bg-[#202021] w-1/4 flex flex-row justify-center px-1 py-2 rounded-lg">
            <Text className="text-white">Share Link</Text>
          </TouchableOpacity>
        </View> */}

        

        {/* DATA */}
        
        <View className="px-4 mt-10">
          {/* Card 1 */}
          <MiniCard 
            data={{
                text1: 'Balance', 
                num1: data?.account_data?.balance, 
                percent: 11, 
                text2: 'Highest balance', 
                num2: data?.account_data?.highestBalance
              }} 
              showMiniChart={true} 
              chart_data={data?.chart_data} 
              chart_type_data={'gains'}
          />
          {/* Card 2 */}
          <MiniCard 
            data={{
              text1: 'Profit', 
              num1: data?.account_data?.profit, 
              percent: 11, 
              text2: 'Fees', 
              num2: data?.account_data?.fees
            }} 
            showMiniChart={true} 
            chart_data={data?.chart_data} 
            chart_type_data={'profit'}
          />
          {parseInt(data?.account_data?.deposits).toString().length <=4 && parseInt(data?.account_data?.withdrawls).toString().length <=4 ? (
            <View className="flex flex-row justify-between">
              {/* Card 3 */}
                <MiniCard 
                  data={{
                    text1: 'Deposits', 
                    num1: data?.account_data?.deposits, 
                    text2: 'Last transaction', 
                    num2: data?.account_data?.lastTransactionDeposit
                  }} 
                  showMiniChart={false}
                  halfSize
                />
                {/* Card 4 */}
                <MiniCard 
                  data={{
                    text1: 'Withdrawals', 
                    num1: data?.account_data?.withdrawls, 
                    text2: 'Last transaction', 
                    num2: data?.account_data?.lastTransactionWithdrawls
                  }} 
                  showMiniChart={false}
                  halfSize
                />
            </View>
          ) : (
            <View>
              {/* Card 3 */}
              <MiniCard 
                data={{
                  text1: 'Deposits', 
                  num1: data?.account_data?.deposits, 
                  text2: 'Last transaction', 
                  num2: data?.account_data?.lastTransactionDeposit
                }} 
                showMiniChart={false}
              />
              {/* Card 4 */}
              <MiniCard 
                data={{
                  text1: 'Withdrawals', 
                  num1: data?.account_data?.withdrawls, 
                  text2: 'Last transaction', 
                  num2: data?.account_data?.lastTransactionWithdrawls
                }} 
                showMiniChart={false}
              />
            </View>
          )}
        </View>
        
        <View className="px-4 mt-10 mb-10">

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

          {/* Table Period Card */}
          <TablePeriodCard data={data?.period_data?.messages[0].content == 'This TradeAccount has no period data' ? noDataValues : data?.period_data} />

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
        
        <View className="px-4 mt-4">
            <Text className="text-white text-3xl">Advanced statistic</Text>
        </View>

        <View className="px-4 mt-6">
          <TradesCard 
             data={{
              trades: data?.statistics?.trades,
              pips: data?.statistics?.pips,
              averageWinPips: data?.statistics?.averageWinPips,
              averageWin: data?.statistics?.averageWin,
              averageLossPips: data?.statistics?.averageLossPips,
              averageLoss: data?.statistics?.averageLoss,
              lots: data?.statistics?.lots
          }}
          />

          <TradeLengthCard 
            data={{
              averageTradeLengthInMilliseconds: data?.statistics?.averageTradeLengthInMilliseconds,
              longWonTradesPercent: data?.statistics?.longWonTradesPercent,
              shortWonTradesPercent: data?.statistics?.shortWonTradesPercent,
              bestTrade: data?.statistics?.bestTrade,
              bestTradeDate: data?.statistics.bestTradeDate || '/',
              worstTrade: data?.statistics?.worstTrade,
              worstTradeDate: data?.statistics?.worstTradeDate,
              bestTradePips: data?.statistics?.bestTradePips,
              bestTradePipsDate: data?.statistics?.bestTradePipsDate,
              worstTradePips: data?.statistics?.worstTradePips,
              worstTradePipsDate: data?.statistics?.worstTradePipsDate
          }}
          />

          <ProfitFactorCard 
            data={{
              profitFactor: data?.statistics?.profitFactor,
              standardDeviationProfit: data?.statistics?.standardDeviationProfit,
              sharpeRatio: data?.statistics?.sharpeRatio,
              probability: data?.statistics?.probability,
              expectancyPips: data?.statistics?.expectancyPips,
              expectancy: data?.statistics?.expectancy,
              ahpr: data?.statistics?.averageHoldingPeriodReturn,
              ghpr: data?.statistics?.geometricHoldingPeriodReturn
          }}
          />
        </View>

        <View className="mb-28"></View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Metrics