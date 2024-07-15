import { View, Text } from 'react-native'
import React, {useState, useEffect} from 'react'
import { LineChart } from "react-native-gifted-charts"
import LootieLoader from '../LootieLoader'


const MiniLineChartComponent = ({data}) => {
    const [modifiedData, setModifiedData] = useState([])
    const [isAllNegative, setIsAllNegative] = useState(null)
    const [isAllZero, setIsAllZero] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(()=>{
        if(!data) return

        (async () => {
            const foundedPositiveNumber = await data.some(i => Number(i.value) > 0)
            const foundedNonZero = await data.some(i => Number(i.value) != 0)
            setIsAllNegative(!foundedPositiveNumber)
            setIsAllZero(!foundedNonZero)
          })()
        
    }, [data])

    useEffect(()=>{
        if(isAllNegative === null || isAllZero === null) return

        const modifiedDataArray = data.map(i => {
            return {
                value: isAllNegative ? Math.abs(Number(i.value)) : Number(i.value),
                label: String(i.label)
            }
        })

        setModifiedData(modifiedDataArray)
    }, [isAllNegative, isAllZero])

    useEffect(()=>{
        if(!modifiedData.length) return
        setIsLoading(false)
        
    }, [modifiedData])


    if(isLoading || isAllZero) return null

    
  return (
    <LineChart
        data={modifiedData}
        thickness={3}
        hideDataPoints={false}
        hideRules
        isAnimated
        curved={true}
        areaChart
        color={ isAllNegative ? 'rgba(240, 128, 128, 0.8)' : 'rgba(140, 139, 238, 0.8)'}
        startFillColor1={ isAllNegative ? 'rgba(240, 128, 128, 0.8)' : 'rgba(140, 139, 238, 0.8)'}
        endFillColor1='rgba(240, 128, 128, 0.8)'
        startOpacity1={0.3}
        endOpacity1={0.1}
        spacing={6}
        hideYAxisText
        height={80}
        xAxisColor={'transparent'}
        yAxisColor={'transparent'}
        xAxisLabelTextStyle={{display: 'none'}}

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
}

export default MiniLineChartComponent