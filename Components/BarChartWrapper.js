import React, { useEffect, useState } from 'react'
import BarChartComponent from './Charts/BarChart'
import { Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons';

const  monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ]

const BarChartWrapper = ({data}) => {
    const [type, setType] = useState('percent')
    const [activeIndex, setActiveIndex] = useState(0)
    const [years, setYears] = useState([])
    const [chartData, setChartData] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    useEffect(()=>{
        if(!data) return
        setIsLoading(true)

        const yearsArray = [...new Set(data.map((item) => {
          let itemDate_custom = new Date(Number(item.time))
          let year = itemDate_custom.getFullYear();
          let month = String(itemDate_custom.getMonth() + 1).padStart(2, '0');
          let formattedDate = `${year}-${month}`;
      
          return formattedDate.split('-')[0]
          //return item.date.split('-')[0]
        }))]
        setYears(yearsArray)
      }, [data])


      useEffect(()=>{
        if(!data) return
        setIsLoading(true)
        
        const currentYear = years[activeIndex]
        const monthlyData = Array.from({ length: 12 }, (_, index) => {
          const currentMonth = `${currentYear}-${String(index + 1).padStart(2, '0')}`
          const monthData = data.find((item) => {
            let itemDate_custom = new Date(Number(item.time))
            let year = itemDate_custom.getFullYear();
            let month = String(itemDate_custom.getMonth() + 1).padStart(2, '0');
            let formattedDate = `${year}-${month}`;
      
            return formattedDate.startsWith(currentMonth)
      
            //return item.date.startsWith(currentMonth)
          })
      
          let value = 0
          if (type === 'percent') {
            value = monthData ? monthData.gains : 0
          } else {
            value = monthData ? monthData.profit : 0
          }
      
          return {
            label: monthNames[index],
            value: value,
            monthIndex: index,
          };
        });
        setChartData(monthlyData)
        
      }, [activeIndex, data, years, type])

  return (
    <View>
        <View className="flex flex-row justify-between px-2">
            <Text className="text-white text-2xl ml-2">Monthly gain</Text>
            <View className="flex flex-row justify-between bg-[#202021] p-2 rounded-md">
                <TouchableOpacity onPress={()=>setType('percent')} className="mr-2 bg-[#343437] p-1 rounded-md">
                    <Feather name="percent" size={24} color={type === 'percent' ? 'white' : 'gray'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setType('profit')} className="bg-[#343437] p-1 rounded-md">
                    <Feather name="dollar-sign" size={24} color={type === 'profit' ? 'white' : 'gray'} />
                </TouchableOpacity>
            </View>
        </View>

        <View className="mt-5 px-6">
            <View className="flex flex-row justify-between bg-[#202021] p-2 rounded-md">
                {years.map((year, index) => (
                    <TouchableOpacity key={index} onPress={() => setActiveIndex(index)} className="bg-[#343437] rounded-md py-2 px-4 flex flex-row justify-center items-center">
                        <Text className={`${activeIndex === index ? 'text-white' : 'text-gray-500'} text-md`}>{year}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>

        <View className="mt-20 min-h-44">
            <BarChartComponent 
                data={chartData} 
                isLoading={isLoading}
                setIsLoading={setIsLoading}
            />
        </View>
    </View>
    
  )
}

export default BarChartWrapper