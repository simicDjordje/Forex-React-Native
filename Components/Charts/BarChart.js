import { useEffect, useRef, useState } from "react";
import { BarChart } from "react-native-gifted-charts";
import { View, Text, TouchableOpacity } from "react-native";
import LootieLoader from "../LootieLoader";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


// 3 states
// 1 all negative > everything is red and labels are shown
// 2 mixed > postivie numbers have color #C5C5F9 while negative have color #f08080cc and labels are hidden
// 3 all postive > colors are either #FFDBE4 or #C5C5F9 and labels are shown

const data1 = [
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

const data2 = [
    {"label": "Jan", "monthIndex": 0, "value": 0}, 
    {"label": "Feb", "monthIndex": 1, "value": 0}, 
    {"label": "Mar", "monthIndex": 2, "value": 0}, 
    {"label": "Apr", "monthIndex": 3, "value": undefined}, 
    {"label": "May", "monthIndex": 4, "value": -2901.5}, 
    {"label": "Jun", "monthIndex": 5, "value": 0}, 
    {"label": "Jul", "monthIndex": 6, "value": 13.39}, 
    {"label": "Aug", "monthIndex": 7, "value": 0}, 
    {"label": "Sep", "monthIndex": 8, "value": 0}, 
    {"label": "Oct", "monthIndex": 9, "value": 0}, 
    {"label": "Nov", "monthIndex": 10, "value": 0}, 
    {"label": "Dec", "monthIndex": 11, "value": 0}
]

const BarChartComponent = ({data, isLoading, setIsLoading, isBig}) => {
    
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
            let value = isNaN(i.value) ? 0 : Number(i.value)

            if(Math.abs(Number(value)) > maxValueModified){
                maxValueModified = Math.abs(Number(value))
            }

            let frontColor = ''
            let wasNegative = false

            if(isAllNegative){
                frontColor = '#f08080cc'
                value = Math.abs(Number(value))
                wasNegative = true
            }

            if(isAllPositive) frontColor = index % 2 == 0 ? '#FFDBE4' : '#C5C5F9'

            if(!isAllNegative && !isAllPositive){
                if(Number(value) < 0){
                    frontColor = '#f08080cc'
                    wasNegative = true
                    value = Math.abs(Number(value))
                }

                if(Number(value) > 0) frontColor = '#C5C5F9'
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
    }, [isAllNegative, isAllZero, isAllPositive, data])

    useEffect(()=>{
        if(!modifiedData.length) return
        setTimeout(()=>{setIsLoading(false)}, 1000)
        //setIsLoading(false)
    }, [modifiedData])

    const handleScrollRef = () => {
        if(chartRef.current !== null){
            chartRef.current.scrollToEnd()
        }
    }

    if(isLoading){
        return (
            <View className="h-60 flex flex-col">
                <View className="px-6 -mt-16 flex flex-row justify-between items-center">
                    <View className="flex flex-row justify-between bg-[#202021] p-2 rounded-md flex-1 mr-2">
                        <View className="bg-[#343437] rounded-md py-2 px-4 flex flex-row justify-start items-center w-full">
                            <View className="h-3 w-3 bg-transparent rounded-full"></View>
                            <Text className="text-transparent ml-2">positive</Text>
                        </View>
                    </View>

                    <View className="bg-[#202021] p-2 rounded-md">
                        <TouchableOpacity onPress={() => {}} className="bg-[#343437] p-1 rounded-md">
                            <MaterialIcons name="keyboard-arrow-right" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="flex-1 flex flex-row justify-center items-center">
                    <LootieLoader />
                </View>
            </View>
        )
    }

    if(isAllZero){
        return (
            <View className="h-60 flex flex-col">
                <View className="px-6 -mt-16 flex flex-row justify-between items-center">
                    <View className="flex flex-row justify-between bg-[#202021] p-2 rounded-md flex-1 mr-2">
                        <View className="bg-[#343437] rounded-md py-2 px-4 flex flex-row justify-start items-center w-full">
                            <View className="h-3 w-3 bg-transparent rounded-full"></View>
                            <Text className="text-transparent ml-2">positive</Text>
                        </View>
                    </View>

                    <View className="bg-[#202021] p-2 rounded-md">
                        <TouchableOpacity onPress={() => {}} className="bg-[#343437] p-1 rounded-md">
                            <MaterialIcons name="keyboard-arrow-right" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="flex-1 flex flex-row justify-center items-center">
                <Text className="text-white text-lg">No data yet</Text>
                </View>
            </View>
        )
    }

    return (
        <View>
            <View className="px-6 -mt-16 flex flex-row justify-between items-center">
                {hideYAxis && 
                <View className="flex flex-row justify-between bg-[#202021] p-2 rounded-md flex-1 mr-2">
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
                <View className="flex flex-row justify-between bg-[#202021] p-2 rounded-md flex-1 mr-2">
                    <View className="bg-[#343437] rounded-md py-2 px-4 flex flex-row justify-start items-center w-full">
                        <View className="h-3 w-3 bg-[#f08080cc] rounded-full"></View>
                        <Text className="text-white ml-2">all values are negative</Text>
                    </View>
                </View>}

                {!isAllNegative && isAllPositive && 
                <View className="flex flex-row justify-between bg-[#202021] p-2 rounded-md flex-1 mr-2">
                    <View className="bg-[#343437] rounded-md py-2 px-4 flex flex-row justify-start items-center w-full">
                        <View className="h-3 w-3 bg-[#C5C5F9] rounded-full"></View>
                        <Text className="text-white ml-2">all values are positive</Text>
                    </View>
                </View>}

                
                <View className="bg-[#202021] p-2 rounded-md">
                    <TouchableOpacity onPress={handleScrollRef} className="bg-[#343437] p-1 rounded-md">
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                
            </View>


            {/* <View className="mt-4 px-2 flex flex-row justify-end">
                <View className="bg-[#202021] p-2 rounded-md">
                    <TouchableOpacity onPress={handleScrollRef} className="bg-[#343437] p-1 rounded-md">
                        <MaterialIcons name="keyboard-arrow-right" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </View> */}

            <View className={`${hideYAxis ? '-ml-10' : ''} mt-5`}>
            <BarChart
                barWidth={isBig ? 30 : 22}
                scrollRef={chartRef}
                noOfSections={3}
                barBorderRadius={4}
                data={modifiedData}
                yAxisThickness={0}
                xAxisThickness={0}
                labelTextStyle={{ color: 'white' }}
                yAxisTextStyle={{color: isAllNegative !== null && isAllNegative ? '#f08080cc' : 'lightgray'}}
                xAxisLabelTextStyle={{color: 'lightgray', textAlign: 'center'}}
                hideRules
                autoShiftLabels
                isAnimated
                yAxisLabelPrefix={isAllNegative !== null && isAllNegative ? '-' : ''}
                yAxisLabelWidth={50}
                hideYAxisText={hideYAxis}
                maxValue={maxValue ? (maxValue / 4) + maxValue : 1000}
                renderTooltip={(item, index) => {
                    return (
                    <View
                        style={{
                        marginBottom: 12,
                        marginLeft: -5,
                        backgroundColor: item.wasNegative ? '#f08080cc' : '#343437',
                        paddingHorizontal: 1,
                        paddingVertical: 1,
                        borderRadius: 4,
                        // borderColor: item.wasNegative ? '#343437' : '#202021',
                        // borderWidth: 5,
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
