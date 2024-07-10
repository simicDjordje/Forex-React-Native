import { View, Text, TouchableOpacity } from 'react-native'
import React, {useState, useCallback, useEffect} from 'react'
import LineChartComponent from './Charts/LineChart'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

const LineChartWrapper = ({data}) => {
  const [type, setType] = useState('gains')
  const [time, setTime] = useState('w')
  const [chartData, setChartData] = useState([])
  const [chartType, setChartType] = useState('line')
  const [isLoading, setIsLoading] = useState(true)

  const get24hPeriod = useCallback(() => {
    let hoursArray = []
    
    for (let i = 23; i >= 0; i--) {
      const date = new Date()
      date.setHours(date.getHours() - i)
      hoursArray.push({ 
        date, 
        y: 0,
      })
    }

    data.forEach((item) => {
      const itemDate = new Date(Number(item.time))
      const itemHour = new Date(Number(item.time))
      itemHour.setMinutes(0)

      const foundIndex = hoursArray.findIndex((hourObj) => {
        const hourObjDate = new Date(hourObj.date)
        const hourObjHour = new Date(hourObj.date)
        hourObjHour.setMinutes(0)
        return (
          hourObjDate.getFullYear() === itemDate.getFullYear() &&
          hourObjDate.getMonth() === itemDate.getMonth() &&
          hourObjDate.getDate() === itemDate.getDate() &&
          hourObjHour.getHours() === itemHour.getHours()
        )

      })

      if (foundIndex !== -1) {
        // If a matching date and hour is found, update the corresponding y value
        console.log(hoursArray[foundIndex])
        hoursArray[foundIndex].y = item.hasOwnProperty(type) ? parseFloat(item[type]).toFixed(2) : 0
      }
    })

    hoursArray =  hoursArray.map(hourObj => {
      const hourObjDate = new Date(hourObj.date)
      if(hourObj.y == 0){
        hourObjDate.setMinutes(0)
        return {
          label: `${String(hourObjDate.getHours()).padStart(2, '0')}:${String(hourObjDate.getMinutes()).padStart(2, '0')}`,
          value: 0
        }
      }

      return {
        label: `${String(hourObjDate.getHours()).padStart(2, '0')}:${String(hourObjDate.getMinutes()).padStart(2, '0')}`,
        value: hourObj.y
      }
    })

    setChartData(hoursArray)
  }, [data, type, time])


  const getWeekPeriod = useCallback(() => {
    let hoursArray = []
    
    const weekArray = Array.from({ length: 7 }, (_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - index)); // Adjust days to go back in time
      return { date, y: 0 };
    });

    data.forEach((item) => {
      const itemDate = new Date(Number(item.time));
  
      const foundIndex = weekArray.findIndex((dayObj) => {
        const dayObjDate = new Date(dayObj.date);
        return (
          dayObjDate.getFullYear() === itemDate.getFullYear() &&
          dayObjDate.getMonth() === itemDate.getMonth() &&
          dayObjDate.getDate() === itemDate.getDate()
        );
      });
  
      if (foundIndex !== -1) {
        // If a matching date is found, update the corresponding y value
        weekArray[foundIndex].y = item.hasOwnProperty(type) ? parseFloat(item[type]).toFixed(2) : 0;
      }
    });

    const formattedWeekArray = weekArray.map(dayObj => ({
      label: `${String(dayObj.date.getDate()).padStart(2, '0')}/${String(dayObj.date.getMonth() + 1).padStart(2, '0')}`,
      value: dayObj.y,
    }));
  
    setChartData(formattedWeekArray);

  }, [data, type, time])

  const getMonthlyPeriod = useCallback(() => {
    const today = new Date()

    const chartDataArray = data.map((item) => {
      const itemDate = new Date(Number(item.time))
      const diffMilliseconds = today - itemDate
      const diffMonths = diffMilliseconds / (1000 * 60 * 60 * 24 * 30)

      if (diffMonths <= 1) {
        return {
              label: `${String(itemDate.getDate()).padStart(2, '0')}/${String(itemDate.getMonth() + 1).padStart(2, '0')}`,
              value: item.hasOwnProperty(type) ? parseFloat(item[type]).toFixed(2) : 0,
            }
      }

      return null

    }).filter(Boolean)
    
    setChartData(chartDataArray)

  }, [data, type, time])

  const getAllPeriods = useCallback(() => {
    const chartDataArray = data.map(item => {
      const itemDate = new Date(Number(item.time))
      return {
        label: `${String(itemDate.getDate()).padStart(2, '0')}/${String(itemDate.getMonth() + 1).padStart(2, '0')}/${itemDate.getFullYear().toString().slice(-2)}`,
        value: item.hasOwnProperty(type) ? parseFloat(item[type]).toFixed(2) : 0,
      }
    })
    
    setChartData(chartDataArray)

  }, [data, type, time])
  

  useEffect(()=>{
    if(!data) return
    setIsLoading(true)

    if(time === 'd'){
      get24hPeriod()
    }

    if(time === 'w'){
      getWeekPeriod()
    }

    if(time === 'm'){
      getMonthlyPeriod()
    }

    if(time === 'all'){
      getAllPeriods()
    }

  }, [data, type, time])

  return (
    <View className="">
        <View className="flex flex-row justify-between px-2">
            <Text className="text-white text-2xl ml-2">Trading period</Text>
            <View className="flex flex-row justify-between bg-[#202021] p-2 rounded-md">
                <TouchableOpacity className="mr-2 bg-[#343437] p-1 rounded-md">
                    <MaterialCommunityIcons name="chart-bell-curve-cumulative" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity className="bg-[#343437] p-1 rounded-md">
                    <MaterialCommunityIcons name="chart-bar" size={24} color="gray" />
                </TouchableOpacity>
            </View>
        </View>

        <View className="mt-5 px-6">
            <View className="flex flex-row justify-between bg-[#202021] p-2 rounded-md">
                <TouchableOpacity onPress={() => setType('gains')} className="bg-[#343437] rounded-md py-2 px-4 flex flex-row justify-center items-center">
                    <Text className={`${type === 'gains' ? 'text-white' : 'text-gray-500'} text-md`}>Gain</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setType('profit')} className="bg-[#343437] rounded-md py-2 px-4 flex flex-row justify-center items-center">
                    <Text className={`${type === 'profit' ? 'text-white' : 'text-gray-500'} text-md`}>Profit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setType('pips')} className="bg-[#343437] rounded-md py-2 px-4 flex flex-row justify-center items-center">
                    <Text className={`${type === 'pips' ? 'text-white' : 'text-gray-500'} text-md`}>Pips</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setType('trades')} className="bg-[#343437] rounded-md py-2 px-4 flex flex-row justify-center items-center">
                    <Text className={`${type === 'trades' ? 'text-white' : 'text-gray-500'} text-md`}>Trades</Text>
                </TouchableOpacity>
            </View>
        </View>

        <View className="flex flex-row justify-end px-2 mt-5 items-center">
            <View className="flex flex-row justify-between bg-[#202021] p-2 rounded-md">
                <TouchableOpacity onPress={() => setTime('d')} className="bg-[#343437] rounded-md p-2 flex flex-row justify-center items-center mr-1">
                    <Text className={`${time === 'd' ? 'text-white' : 'text-gray-500'}`}>1D</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTime('w')} className="bg-[#343437] rounded-md p-2 flex flex-row justify-center items-center mr-1">
                    <Text className={`${time === 'w' ? 'text-white' : 'text-gray-500'}`}>1W</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTime('m')} className="bg-[#343437] rounded-md p-2 flex flex-row justify-center items-center mr-1">
                    <Text className={`${time === 'm' ? 'text-white' : 'text-gray-500'}`}>1M</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTime('all')} className="bg-[#343437] rounded-md p-2 flex flex-row justify-center items-center">
                    <Text className={`${time === 'all' ? 'text-white' : 'text-gray-500'}`}>ALL</Text>
                </TouchableOpacity>
            </View>
        </View>

        <View className="mt-10 min-h-44">
            <LineChartComponent
                // data={[{id: type.charAt(0).toUpperCase() + type.slice(1), data: chartData}]}
                data={chartData}
                time={time}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
            />
        </View>
    </View>
  )
}

export default LineChartWrapper