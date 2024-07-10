import { useEffect, useState } from "react";
import { View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
        
const DonutChartComponent = ({data, isLoading, setIsLoading}) => {
    const [modifiedData, setModifiedData] = useState([])

    useEffect(()=>{
        setModifiedData(data)
        setIsLoading(false)

    }, [data])

    const pieData = [
        {value: 54, color: '#177AD5', text: '54%'},
        {value: 40, color: '#79D2DE', text: '30%'},
        {value: 20, color: '#ED6665', text: '26%'},
    ];

    if(isLoading) return null
    
    return(
        <View className="flex flex-row justify-center items-center">
            <PieChart
            showText={false}
            textColor="black"
            radius={140}
            textSize={20}
            showTextBackground
            textBackgroundRadius={26}
            data={modifiedData}
            donut
            isAnimated
            showGradient
            innerRadius={80}
            innerCircleColor={'#0d0d0c'}
            focusOnPress
            strokeWidth={10}
            strokeColor="#FFFFFF00"
            />
        </View>
    )
}


export default DonutChartComponent