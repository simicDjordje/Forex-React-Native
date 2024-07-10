import { useEffect, useRef, useState } from "react";
import { BarChart } from "react-native-gifted-charts";
import { View, Text, TouchableOpacity } from "react-native";
import LootieLoader from "../LootieLoader";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { err } from "react-native-svg";


// 3 states
// 1 all negative > everything is red and labels are shown
// 2 mixed > postivie numbers have color #C5C5F9 while negative have color #f08080cc and labels are hidden
// 3 all postive > colors are either #FFDBE4 or #C5C5F9 and labels are shown

const data = [
    {"label": "Jan", "monthIndex": 0, "value": -30000}, 
    {"label": "Feb", "monthIndex": 1, "value": -26000.31231}, 
    {"label": "Mar", "monthIndex": 2, "value": -3000.3232}, 
    {"label": "Apr", "monthIndex": 3, "value": -89.32312}, 
    {"label": "May", "monthIndex": 4, "value": 0}, 
    {"label": "Jun", "monthIndex": 5, "value": -89.6463576704002}, 
    {"label": "Jul", "monthIndex": 6, "value": -66.2026016527102}, 
    {"label": "Aug", "monthIndex": 7, "value": 0}, 
    {"label": "Sep", "monthIndex": 8, "value": -5000.31231}, 
    {"label": "Oct", "monthIndex": 9, "value": -200.3131}, 
    {"label": "Nov", "monthIndex": 10, "value": 0}, 
    {"label": "Dec", "monthIndex": 11, "value": -3131.111}
]

const BarChartComponent = ({data2, isLoading, setIsLoading}) => {
    const [modifiedData, setModifiedData] = useState([])
    const [maxValue, setMaxValue] = useState(0)
    const [isAllNegative, setIsAllNegative] = useState(null)
    const [isAllPositive, setIsAllPositive] = useState(null)
    const [isAllZero, setIsAllZero] = useState(null)
    const [hideYAxis, setHideYAxis] = useState(false)
    const chartRef = useRef(null)

    useEffect(()=>{
        if(!data) return
        
        setModifiedData([]);
        setMaxValue(0);
        setIsAllNegative(null);
        setIsAllPositive(null);
        setIsAllZero(null);

        
        (async () => {
            const foundedPositiveNumber = await data.some(i => Number(i.value) > 0)
            const foundedNegativeNumber = await data.some(i => Number(i.value) < 0)
            const foundedNonZero = await data.some(i => Number(i.value) != 0)
            setIsAllNegative(!foundedPositiveNumber)
            setIsAllPositive(!foundedNegativeNumber)
            setIsAllZero(!foundedNonZero)
          })()
        
          //console.log('Main data: ', data)
    }, [data])

    useEffect(()=>{
        if(isAllNegative === null || isAllZero === null || isAllPositive === null) return

        if(isAllNegative || isAllPositive) setHideYAxis(false)

        if(!isAllNegative && !isAllPositive) setHideYAxis(true)

        let maxValueModified = 0

        const modifiedDataArray = data.map((i, index) => {
            if(Math.abs(Number(i.value)) > maxValueModified){
                maxValueModified = Math.abs(Number(i.value))
            }

            let value = Number(i.value)
            let frontColor = ''
            let wasNegative = false

            if(isAllNegative){
                frontColor = '#f08080cc'
                value = Math.abs(Number(i.value))
            }

            if(isAllPositive) frontColor = index % 2 == 0 ? '#FFDBE4' : '#C5C5F9'

            if(!isAllNegative && !isAllPositive){
                if(Number(i.value) < 0){
                    frontColor = '#f08080cc'
                    wasNegative = true
                    value = Math.abs(Number(i.value))
                }

                if(Number(i.value) > 0) frontColor = '#C5C5F9'
            }

            return {
                value,
                label: String(i.label),
                frontColor: frontColor,
                wasNegative
            }
        })

        setMaxValue(maxValueModified)
        setModifiedData(modifiedDataArray)
    }, [isAllNegative, isAllZero])

    useEffect(()=>{
        if(!modifiedData.length) return
        setIsLoading(false)
        
    }, [modifiedData])

    const handleScrollToEnd = () => {
        try{
            if (chartRef.current) {
                chartRef.current.scrollToEnd()
            }
        }catch(error){
            console.log(error)
        }
    }

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
                </View>
            </View>
        )
    }

    return (
        <View>
            <View className="px-6 -mt-16">
                {hideYAxis && 
                <View className="flex flex-row justify-between bg-[#202021] p-2 rounded-md">
                    <View className="bg-[#343437] rounded-md py-2 px-4 flex flex-row justify-center items-center">
                        <View className="h-3 w-3 bg-[#C5C5F9] rounded-full"></View>
                        <Text className="text-white ml-2">positive</Text>
                    </View>

                    <View className="bg-[#343437] rounded-md py-2 px-4 flex flex-row justify-center items-center">
                        <View className="h-3 w-3 bg-[#f08080cc] rounded-full"></View>
                        <Text className="text-white ml-2">negative</Text>
                    </View>
                </View>}

                {isAllNegative && !isAllPositive && 
                <View className="flex flex-row justify-between bg-[#202021] p-2 rounded-md">
                    <View className="bg-[#343437] rounded-md py-2 px-4 flex flex-row justify-start items-center w-full">
                        <View className="h-3 w-3 bg-[#f08080cc] rounded-full"></View>
                        <Text className="text-white ml-2">all values are negative</Text>
                    </View>
                </View>}

                {!isAllNegative && isAllPositive && 
                <View className="flex flex-row justify-between bg-[#202021] p-2 rounded-md">
                    <View className="bg-[#343437] rounded-md py-2 px-4 flex flex-row justify-start items-center w-full">
                        <View className="h-3 w-3 bg-[#C5C5F9] rounded-full"></View>
                        <Text className="text-white ml-2">all values are positive</Text>
                    </View>
                </View>}
            </View>


            <View className="mt-4 px-2 flex flex-row justify-end">
                <View className="bg-[#202021] p-2 rounded-md">
                    <TouchableOpacity onPress={()=>{}} className="bg-[#343437] p-1 rounded-md">
                        <MaterialIcons name="keyboard-arrow-right" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            <View className={`${hideYAxis ? '-ml-10' : ''} mt-5`}>
            <BarChart
                //showScrollIndicator
                //scrollRef={chartRef}
                barWidth={22}
                noOfSections={3}
                barBorderRadius={4}
                data={modifiedData}
                yAxisThickness={0}
                xAxisThickness={0}
                labelTextStyle={{ color: 'white' }}
                yAxisTextStyle={{color: isAllNegative ? '#f08080cc' : 'lightgray'}}
                xAxisLabelTextStyle={{color: 'lightgray', textAlign: 'center'}}
                hideRules
                autoShiftLabels
                isAnimated
                yAxisLabelPrefix={isAllNegative ? '-' : ''}
                yAxisLabelWidth={50}
                hideYAxisText={hideYAxis}
                maxValue={(maxValue / 4) + maxValue}
                renderTooltip={(item, index) => {
                    return (
                    <View
                        style={{
                        marginBottom: 20,
                        marginLeft: -20,
                        backgroundColor: item.wasNegative ? '#f08080cc' : '#343437',
                        paddingHorizontal: 6,
                        paddingVertical: 4,
                        borderRadius: 4,
                        }}>
                        <Text className="text-white">{item.wasNegative ? parseFloat(-item.value).toFixed(2) : parseFloat(item.value).toFixed(2)}</Text>
                    </View>
                    );
                }}
            />
        </View>
    </View>
    );
};

export default BarChartComponent;
