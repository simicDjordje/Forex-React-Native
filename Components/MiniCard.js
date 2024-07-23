import { View, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useEffect, useState } from 'react'
import MiniLineChartComponent from './Charts/MiniLineChart'

const MiniCard = ({data, showMiniChart, chart_data, chart_type_data, halfSize}) => {
    const [chartData, setChartData] = useState([])
    const [time, setTime] = useState('m')
    const formattedNum1Array = !data?.num1 ? ['0.00', ''] : parseFloat(data?.num1).toFixed(2).toLocaleString('en').split('.')
    const formattedNum2Array = !data?.num2 ? ['0.00', ''] : parseFloat(data?.num2).toFixed(2).toLocaleString('en').split('.')

    
    useEffect(() => {
        if(!showMiniChart || !chart_data) return
        
        const today = new Date()

        const chartDataArray = chart_data.map((item) => {
          const itemDate = new Date(Number(item.time))
          const diffMilliseconds = today - itemDate
          const diffMonths = diffMilliseconds / (1000 * 60 * 60 * 24 * 30)
    
          if (diffMonths <= 1) {
            return {
                  label: `${String(itemDate.getDate()).padStart(2, '0')}/${String(itemDate.getMonth() + 1).padStart(2, '0')}`,
                  value: item.hasOwnProperty(chart_type_data) ? parseFloat(item[chart_type_data]).toFixed(2) : 0,
                }
          }
    
          return null
    
        }).filter(Boolean)
        
        setChartData(chartDataArray)
    }, [chart_type_data, showMiniChart, chart_data]);

  return (
    <View className={`rounded-xl h-[196px] border border-0.5 border-[#202021] my-2 ${halfSize ? 'w-1/2 -mx-2' : ''}`}>
        <LinearGradient
            colors={['rgba(255, 255, 255, 0.04)', 'rgba(255, 255, 255, 0)']}
            style={{ height: 200 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="rounded-xl"
        >
            <View className="h-full flex flex-col justify-between">
                <View className="flex flex-row justify-between items-center px-3 mt-3">
                    <Text className="text-[#97979D] text-md">{data?.text1}</Text>
                    {/* <TouchableOpacity>
                    <Entypo name="dots-three-horizontal" size={18} color="#97979D" />
                    </TouchableOpacity> */}
                </View>

                <View className="flex flex-row justify-between px-3 flex-1 py-3">
                    <View className="h-full">
                        <View className="flex flex-row justify-start items-end">
                            <Text className="text-white text-3xl">${formattedNum1Array?.[0]}{formattedNum1Array[1] ? '.' : ''}<Text className="text-[#343437]">{formattedNum1Array?.[1]}</Text></Text>
                            {/* <Text className="text-sm text-[#C5C5F9] mb-1">+11k%</Text> */}
                        </View>
                        <View className="mt-10">
                            <Text className="text-[#97979D] text-md">{data?.text2}</Text>
                            <Text className="text-white text-lg">${formattedNum2Array?.[0]}{formattedNum2Array[1] ? '.' : ''}<Text className="text-[#343437]">{formattedNum2Array?.[1]}</Text></Text>
                        </View>
                    </View>
                    <View className="flex-1 flex flex-col justify-end">
                        <View className="-mb-4 h-full flex flex-col justify-end pt-5">
                            {showMiniChart && <MiniLineChartComponent data={chartData} />} 
                        </View>
                    </View>
                </View>
            </View>
        </LinearGradient>
    </View>
  )
}

export default MiniCard