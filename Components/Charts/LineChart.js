import { View, Text } from 'react-native'
import React, {useState, useEffect, forwardRef} from 'react'
import { LineChart } from "react-native-gifted-charts"
import LootieLoader from '../LootieLoader'


const LineChartComponent = forwardRef(({data, isLoading, setIsLoading}, ref) => {
    const [modifiedData, setModifiedData] = useState([])
    const [maxValue, setMaxValue] = useState(0)
    const [isAllNegative, setIsAllNegative] = useState(null)
    const [isAllZero, setIsAllZero] = useState(null)
    
    useEffect(()=>{
        if(!data) return

        setModifiedData([]);
        setMaxValue(0);
        setIsAllNegative(null);
        setIsAllZero(null);

        // console.log('mdData: ', modifiedData.length);
        // console.log('1', isLoading);
        (async () => {
            const foundedPositiveNumber = await data.some(i => Number(i.value) > 0)
            const foundedNonZero = await data.some(i => Number(i.value) != 0)
            setIsAllNegative(!foundedPositiveNumber)
            setIsAllZero(!foundedNonZero)
          })()
        
          //console.log('Main data: ', data)
    }, [data])

    useEffect(()=>{
        if(isAllNegative === null || isAllZero === null) return
        //console.log('2 ', isLoading);
        let maxValueModified = 0

        const modifiedDataArray = data.map(i => {
            if(Math.abs(Number(i.value)) > maxValueModified){
                maxValueModified = Math.abs(Number(i.value))
            }

            // if(isAllNegative && Math.abs(Number(i.value)) > maxValueModified){
            //     maxValueModified = Math.abs(Number(i.value))
            // }

            // if(!isAllNegative && Number(i.value) > maxValueModified){
            //     maxValueModified = Number(i.value)
            // }

            return {
                value: isAllNegative ? Math.abs(Number(i.value)) : Number(i.value),
                label: String(i.label)
            }
        })

        setMaxValue(maxValueModified)
        setModifiedData(modifiedDataArray)
    }, [isAllNegative, isAllZero])

    useEffect(()=>{
        //console.log('MODIFIED_DATA: ', modifiedData)
        if(!modifiedData.length) return
        //console.log('3 ', isLoading);
        //console.log('MD: ', modifiedData)
        //setTimeout(()=>{setIsLoading(false)}, 5000)
        setIsLoading(false)
        
    }, [modifiedData])


    if(isLoading){
        return (
            <View className="h-44">
                <LootieLoader />
            </View>
        )
    }

    if(isAllZero){
        return (
            <View className="h-44 flex flex-row justify-center items-center">
                <View className="flex flex-col justify-center items-center mb-10">
                    <Text className="text-white text-lg">No data yet</Text>
                    <Text className="text-gray-500 text-md">Try changing type or time</Text>
                </View>
            </View>
        )
    }
    
  return (
    <LineChart
        scrollRef={ref}
        data={modifiedData}
        thickness={3}
        hideDataPoints={false}
        hideRules
        isAnimated
        curved={false}
        areaChart
        color={ isAllNegative ? 'rgba(240, 128, 128, 0.8)' : 'rgba(140, 139, 238, 0.8)'}
        startFillColor1={ isAllNegative ? 'rgba(240, 128, 128, 0.8)' : 'rgba(140, 139, 238, 0.8)'}
        endFillColor1='rgba(240, 128, 128, 0.8)'
        startOpacity1={0.3}
        endOpacity1={0.1}
        spacing={85}
        maxValue={maxValue}
        stepValue={maxValue / 5}
        height={150}
        
        yAxisColor={'transparent'}
        yAxisTextStyle={{color: isAllNegative ? 'rgba(240, 128, 128, 0.8)' : 'white'}}
        //showYAxisIndices
        yAxisIndicesColor={'white'}
        yAxisLabelPrefix={isAllNegative ? '-' : ''}
        yAxisLabelWidth={40}

        xAxisColor={'transparent'}
        xAxisLabelTextStyle={{color: 'white'}}
        showXAxisIndices
        xAxisIndicesColor={'white'}

        focusEnabled
        showStripOnFocus
        showTextOnFocus
        showDataPointOnFocus
        focusedDataPointColor={'rgba(240, 128, 128, 0.8)'}
        onFocus={(focus) => {console.log('focus: ', focus)}} 
        showValuesAsDataPointsText
        focusedDataPointHeight={10}
        focusedDataPointWidth={10}
        delayBeforeUnFocus={5000}
      />
  )
})

export default LineChartComponent