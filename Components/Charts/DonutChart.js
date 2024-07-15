import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";


        
const DonutChartComponent = ({data, isLoading, setIsLoading, maxValueItem}) => {
    const [modifiedData, setModifiedData] = useState([])

    
    useEffect(()=>{
        setModifiedData(data)
        setIsLoading(false)
    }, [data])


    if(isLoading) return null
    
    return(
        <View className="flex flex-col justify-center items-center">
            <PieChart
            showText={false}
            textColor="black"
            radius={120}
            textSize={20}
            showTextBackground
            textBackgroundRadius={26}
            data={modifiedData}
            donut
            isAnimated
            showGradient
            innerRadius={90}
            innerCircleColor={'#0d0d0c'}
            focusOnPress
            //strokeWidth={10}
            //strokeColor="#FFFFFF00"
            centerLabelComponent={() => {
                if(maxValueItem === null) return null
                return (
                  <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text
                      style={{fontSize: 30, color: 'white', fontWeight: 'bold'}}>
                      {maxValueItem.value}
                    </Text>
                    <Text style={{fontSize: 14, color: 'white'}}>{maxValueItem.text}</Text>
                  </View>
                );
              }}
            />
            <View className="mt-10 w-full px-8">
                <View className="flex flex-row flex-wrap">
                    {modifiedData.map((item, index) => {
                        console.log(item.color)
                        return (
                            <View key={index} className="w-1/2 flex flex-row justify-start items-center gap-4 mb-2">
                                <View className={`w-3 h-3 rounded-full`} style={{backgroundColor: item.color}}></View>
                                <Text className="text-white">{item.text}</Text>
                            </View>
                        )
                    })}
                </View>
            </View>
        </View>
    )
}


export default DonutChartComponent