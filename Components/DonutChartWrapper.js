import React, { useEffect, useState } from 'react'
import BarChartComponent from './Charts/BarChart'
import { Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons';
import DonutChartComponent from './Charts/DonutChart';



const DonutChartWrapper = ({data}) => {
    const [chartData, setChartData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        if(!data) return

        const chartDataArray = [
            {
              text: "Mon",
              value: 0,
              color: "#8C8BEE",
            },
            {
              text: "Tue",
              value: 0,
              color: "#A08CEE", 
            },
            {
              text: "Wed",
              value: 0,
              color: "#B48DEE", 
            },
            {
              text: "Thu",
              value: 0,
              color: "#C88EEE", 
            },
            {
              text: "Fri",
              value: 0,
              color: "#DC8FEE", 
            },
            {
              text: "Sat",
              value: 0,
              color: "#F090EE", 
            },
            {
              text: "Sun",
              value: 0,
              color: "#F08080",
            }
          ];
          

          data.forEach(i => {
            chartDataArray.forEach(j => {
                if (i.key === j.text || i.key.startsWith(j.text)) {
                    j.value = i.value
                }
            })
        })

        const maxValue = Math.max(...chartDataArray.map(item => item.value))
        const maxItems = chartDataArray.filter(item => item.value === maxValue)

        if (maxItems.length === 1) {
            maxItems[0].focused = true
        }

        console.log(chartDataArray)
        setChartData(chartDataArray)
    }, [data])

    

      

  return (
    <View>
        <View className="flex flex-row justify-between px-2">
            <Text className="text-white text-2xl ml-2">Most active days</Text>
        </View>

        

        <View className="mt-20 min-h-44">
            <DonutChartComponent 
                data={chartData}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
            />
        </View>
    </View>
    
  )
}

export default DonutChartWrapper